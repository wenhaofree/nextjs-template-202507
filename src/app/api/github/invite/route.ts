/**
 * GitHub Repository Invitation API Route / GitHub 仓库邀请 API 路由
 *
 * @description Handles GitHub repository collaboration invitations for activated orders.
 * Sends invitation to users to access the private repository.
 * @description 处理已激活订单的 GitHub 仓库协作邀请。向用户发送访问私有仓库的邀请。
 *
 * @routes
 * - POST /api/github/invite - Send GitHub repository invitation
 *
 * @路由
 * - POST /api/github/invite - 发送 GitHub 仓库邀请
 *
 * @access Private - Requires user authentication and valid order
 * @access 私有 - 需要用户认证和有效订单
 *
 * @author ShipSaaS.CO
 * @version 1.0.0
 * @since 2024-01-01
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

/**
 * GitHub invitation request interface
 * GitHub 邀请请求接口
 */
interface GitHubInviteRequest {
  /** Order number / 订单号 */
  orderNo: string;
  /** GitHub username / GitHub 用户名 */
  githubUsername: string;
}

/**
 * GitHub invitation response interface
 * GitHub 邀请响应接口
 */
interface GitHubInviteResponse {
  /** Success status / 成功状态 */
  success: boolean;
  /** Response message / 响应消息 */
  message: string;
  /** GitHub invitation URL / GitHub 邀请链接 */
  invitationUrl?: string;
}

/**
 * Error response interface
 * 错误响应接口
 */
interface ErrorResponse {
  /** Error message / 错误消息 */
  error: string;
}

/**
 * POST /api/github/invite - Send GitHub repository invitation
 * POST /api/github/invite - 发送 GitHub 仓库邀请
 *
 * @description Sends a GitHub repository collaboration invitation to the specified user
 * for an activated order. Validates order ownership and activation status.
 * @description 为已激活的订单向指定用户发送 GitHub 仓库协作邀请。
 * 验证订单所有权和激活状态。
 *
 * @authentication Required - User must be logged in and own the order
 * @authentication 必需 - 用户必须已登录且拥有该订单
 *
 * @requestBody GitHubInviteRequest - GitHub invitation data
 * @requestBody GitHubInviteRequest - GitHub 邀请数据
 *
 * @responses
 * - 200: GitHubInviteResponse - Invitation sent successfully
 * - 200: GitHubInviteResponse - 邀请发送成功
 * - 400: ErrorResponse - Invalid request or order not eligible
 * - 400: ErrorResponse - 无效请求或订单不符合条件
 * - 401: ErrorResponse - User not authenticated
 * - 401: ErrorResponse - 用户未认证
 * - 403: ErrorResponse - User not authorized
 * - 403: ErrorResponse - 用户无权限
 * - 404: ErrorResponse - Order not found
 * - 404: ErrorResponse - 订单未找到
 * - 500: ErrorResponse - Internal server error
 * - 500: ErrorResponse - 内部服务器错误
 */
export async function POST(request: Request) {
  try {
    // Authenticate user session / 认证用户会话
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body / 解析请求体
    const { orderNo, githubUsername }: GitHubInviteRequest = await request.json();

    if (!orderNo || !githubUsername) {
      return NextResponse.json({ 
        error: 'Order number and GitHub username are required' 
      }, { status: 400 });
    }

    // Validate GitHub username format / 验证 GitHub 用户名格式
    const githubUsernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    if (!githubUsernameRegex.test(githubUsername)) {
      return NextResponse.json({ 
        error: 'Invalid GitHub username format' 
      }, { status: 400 });
    }

    // Find user in database / 在数据库中查找用户
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find and verify order / 查找并验证订单
    const order = await prisma.order.findFirst({
      where: {
        orderNo: orderNo,
        userUuid: user.uuid,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Check if order is activated / 检查订单是否已激活
    if (order.status !== 'activated') {
      return NextResponse.json({ 
        error: 'Order must be activated before sending GitHub invitation' 
      }, { status: 400 });
    }

    // Get GitHub API token from environment / 从环境变量获取 GitHub API token
    const githubToken = process.env.GITHUB_API_TOKEN;
    if (!githubToken) {
      console.error('GitHub API token not configured');
      return NextResponse.json({ 
        error: 'GitHub integration not configured' 
      }, { status: 500 });
    }

    // Determine repository based on product name / 根据产品名称确定仓库
    const getRepositoryName = (productName: string): string => {
      const productLower = productName.toLowerCase();

      // Check for Starter plan / 检查入门版
      if (productLower.includes('starter') || productLower.includes('基础版')) {
        return 'shipsaas-starter';
      }

      // Check for Pro plan / 检查专业版
      if (productLower.includes('pro') || productLower.includes('专业版')) {
        return 'shipsaas-standard';
      }

      // Check for Enterprise plan / 检查旗舰版
      if (productLower.includes('enterprise') || productLower.includes('旗舰版')) {
        return 'shipsaas-enterprise';
      }

      // Default to starter if no match / 默认使用入门版
      console.warn(`Unknown product name: ${productName}, defaulting to starter repository`);
      return 'shipsaas-starter';
    };

    const repositoryName = getRepositoryName(order.productName || '');
    const githubApiUrl = `https://api.github.com/repos/ShipSaaSCo/${repositoryName}/collaborators/${githubUsername}`;

    console.log(`=== GitHub Invitation Debug Info ===`);
    console.log(`Order: ${orderNo}`);
    console.log(`Product: ${order.productName}`);
    console.log(`Repository: ${repositoryName}`);
    console.log(`GitHub Username: ${githubUsername}`);
    console.log(`API URL: ${githubApiUrl}`);
    console.log(`GitHub Token configured: ${!!githubToken}`);
    console.log(`GitHub Token length: ${githubToken ? githubToken.length : 0}`);
    console.log(`Sending GitHub invitation to ${githubUsername} for repository ShipSaaSCo/${repositoryName} (Product: ${order.productName})`);

    const githubResponse = await fetch(githubApiUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'ShipSaaS-App/1.0.0',
      },
      body: JSON.stringify({
        permission: 'pull'
      }),
    });

    console.log(`GitHub API response status: ${githubResponse.status}`);

    if (!githubResponse.ok) {
      const errorData = await githubResponse.json().catch(() => ({}));
      console.error('=== GitHub API Error Details ===');
      console.error('Status:', githubResponse.status);
      console.error('Status Text:', githubResponse.statusText);
      console.error('Headers:', Object.fromEntries(githubResponse.headers.entries()));
      console.error('Error Data:', errorData);
      console.error('Request URL:', githubApiUrl);
      console.error('Request Headers:', {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${githubToken ? githubToken.substring(0, 10) + '...' : 'NOT_SET'}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'ShipSaaS-App/1.0.0',
      });

      // Handle specific error cases based on GitHub API documentation
      if (githubResponse.status === 404) {
        console.error('404 Error: This could mean:');
        console.error('1. GitHub username does not exist');
        console.error('2. Repository does not exist');
        console.error('3. Token does not have access to the repository');
        console.error('4. Organization/repository name is incorrect');

        return NextResponse.json({
          error: 'GitHub username not found or repository not accessible. Please check the username and ensure the repository exists.',
          details: {
            username: githubUsername,
            repository: `ShipSaaSCo/${repositoryName}`,
            possibleCauses: [
              'GitHub username does not exist',
              'Repository does not exist',
              'Token does not have access to the repository',
              'Organization/repository name is incorrect'
            ]
          }
        }, { status: 400 });
      }

      if (githubResponse.status === 403) {
        return NextResponse.json({
          error: 'Insufficient permissions. The GitHub token may not have admin access to the repository.'
        }, { status: 500 });
      }

      if (githubResponse.status === 422) {
        return NextResponse.json({
          error: 'Validation failed. The user may already be a collaborator or the request is invalid.'
        }, { status: 400 });
      }

      return NextResponse.json({
        error: `GitHub API error: ${githubResponse.status} ${githubResponse.statusText}`
      }, { status: 500 });
    }

    // Handle both 201 (new invitation) and 204 (existing collaborator) responses
    let githubData = null;
    if (githubResponse.status === 201) {
      githubData = await githubResponse.json();
      console.log('New invitation created:', githubData);
    } else if (githubResponse.status === 204) {
      console.log('User is already a collaborator or was successfully added');
    }
    
    // Update order with GitHub username and repository info / 更新订单的 GitHub 用户名和仓库信息
    await prisma.order.update({
      where: {
        orderNo: orderNo,
      },
      data: {
        orderDetail: JSON.stringify({
          ...JSON.parse(order.orderDetail || '{}'),
          githubUsername: githubUsername,
          repositoryName: repositoryName,
          invitationSentAt: new Date().toISOString(),
        }),
        updatedAt: new Date(),
      },
    });

    console.log(`GitHub invitation sent successfully to ${githubUsername} for order ${orderNo} (Repository: ${repositoryName})`);

    return NextResponse.json({
      success: true,
      message: 'GitHub invitation sent successfully',
      invitationUrl: `https://github.com/ShipSaaSCo/${repositoryName}/invitations`,
      repositoryName: repositoryName
    });

  } catch (error) {
    console.error('Error sending GitHub invitation:', error);
    return NextResponse.json({ 
      error: 'Failed to send GitHub invitation' 
    }, { status: 500 });
  }
}
