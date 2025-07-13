/**
 * GitHub Token Permissions Check API Route / GitHub Token 权限检查 API 路由
 *
 * @description Checks GitHub token permissions and repository access for debugging purposes.
 * @description 检查 GitHub token 权限和仓库访问权限，用于调试目的。
 *
 * @routes
 * - GET /api/github/check-permissions - Check GitHub token permissions
 *
 * @路由
 * - GET /api/github/check-permissions - 检查 GitHub token 权限
 *
 * @access Private - Requires user authentication (admin only in production)
 * @access 私有 - 需要用户认证（生产环境仅限管理员）
 *
 * @author ShipSaaS.CO
 * @version 1.0.0
 * @since 2024-01-01
 */

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

/**
 * Permission check response interface
 * 权限检查响应接口
 */
interface PermissionCheckResponse {
  /** Token status / Token 状态 */
  tokenConfigured: boolean;
  /** User info / 用户信息 */
  user?: any;
  /** Repository access / 仓库访问权限 */
  repositoryAccess?: any;
  /** Token scopes / Token 权限范围 */
  scopes?: string[];
  /** Rate limit info / 速率限制信息 */
  rateLimit?: any;
  /** Error message / 错误消息 */
  error?: string;
}

/**
 * GET /api/github/check-permissions - Check GitHub token permissions
 * GET /api/github/check-permissions - 检查 GitHub token 权限
 *
 * @description Checks the configured GitHub token's permissions and access to the target repository.
 * This endpoint is useful for debugging GitHub API integration issues.
 * @description 检查配置的 GitHub token 的权限和对目标仓库的访问权限。
 * 此端点对调试 GitHub API 集成问题很有用。
 *
 * @authentication Required - User must be logged in
 * @authentication 必需 - 用户必须已登录
 *
 * @responses
 * - 200: PermissionCheckResponse - Permission check results
 * - 200: PermissionCheckResponse - 权限检查结果
 * - 401: ErrorResponse - User not authenticated
 * - 401: ErrorResponse - 用户未认证
 * - 500: ErrorResponse - Internal server error
 * - 500: ErrorResponse - 内部服务器错误
 */
export async function GET() {
  try {
    // Authenticate user session / 认证用户会话
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get GitHub API token from environment / 从环境变量获取 GitHub API token
    const githubToken = process.env.GITHUB_API_TOKEN;
    
    const result: PermissionCheckResponse = {
      tokenConfigured: !!githubToken
    };

    if (!githubToken) {
      result.error = 'GitHub API token not configured in environment variables';
      return NextResponse.json(result);
    }

    try {
      // Check authenticated user / 检查认证用户
      console.log('Checking GitHub token permissions...');
      
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'ShipSaaS-App/1.0.0',
        },
      });

      if (userResponse.ok) {
        result.user = await userResponse.json();
        
        // Get token scopes from headers
        const scopes = userResponse.headers.get('X-OAuth-Scopes');
        result.scopes = scopes ? scopes.split(', ') : [];
        
        console.log('GitHub user:', result.user.login);
        console.log('Token scopes:', result.scopes);
      } else {
        result.error = `Failed to authenticate with GitHub: ${userResponse.status} ${userResponse.statusText}`;
        return NextResponse.json(result);
      }

      // Check repository access / 检查仓库访问权限
      // Test with basic template repository
      const repoResponse = await fetch('https://api.github.com/repos/ShipSaaSCo/nextjs-template-basic', {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'ShipSaaS-App/1.0.0',
        },
      });

      if (repoResponse.ok) {
        result.repositoryAccess = await repoResponse.json();
        console.log('Repository access confirmed');
      } else {
        result.error = `Cannot access repository: ${repoResponse.status} ${repoResponse.statusText}`;
        console.error('Repository access failed:', repoResponse.status, repoResponse.statusText);
      }

      // Check rate limit / 检查速率限制
      const rateLimitResponse = await fetch('https://api.github.com/rate_limit', {
        headers: {
          'Accept': 'application/vnd.github+json',
          'Authorization': `Bearer ${githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'ShipSaaS-App/1.0.0',
        },
      });

      if (rateLimitResponse.ok) {
        result.rateLimit = await rateLimitResponse.json();
      }

    } catch (error: any) {
      console.error('Error checking GitHub permissions:', error);
      result.error = `Error checking GitHub permissions: ${error.message}`;
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in permission check:', error);
    return NextResponse.json({ 
      error: 'Failed to check GitHub permissions' 
    }, { status: 500 });
  }
}
