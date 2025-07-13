/**
 * GitHub Invite Demo Page / GitHub 邀请演示页面
 *
 * @description Demonstrates the GitHub repository invitation functionality.
 * Shows how to send invitations to users for accessing private repositories.
 * @description 演示 GitHub 仓库邀请功能。展示如何向用户发送访问私有仓库的邀请。
 *
 * @author ShipSaaS.CO
 * @version 1.0.0
 * @since 2024-01-01
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Loader2, CheckCircle, AlertCircle, Github, Settings } from "lucide-react";

/**
 * GitHub invitation response interface
 * GitHub 邀请响应接口
 */
interface GitHubInviteResponse {
  success: boolean;
  message: string;
  invitationUrl?: string;
  repositoryName?: string;
}

/**
 * Permission check response interface
 * 权限检查响应接口
 */
interface PermissionCheckResponse {
  tokenConfigured: boolean;
  user?: any;
  repositoryAccess?: any;
  scopes?: string[];
  rateLimit?: any;
  error?: string;
}

/**
 * GitHub Invite Demo Component
 * GitHub 邀请演示组件
 */
export default function GitHubInviteDemo() {
  const [githubUsername, setGithubUsername] = useState("");
  const [orderNo, setOrderNo] = useState("");
  const [productName, setProductName] = useState("Basic Plan");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [inviteResult, setInviteResult] = useState<GitHubInviteResponse | null>(null);
  
  const [isCheckingPermissions, setIsCheckingPermissions] = useState(false);
  const [permissionResult, setPermissionResult] = useState<PermissionCheckResponse | null>(null);

  /**
   * Handle GitHub invitation submission
   * 处理 GitHub 邀请提交
   */
  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubUsername.trim() || !orderNo.trim()) {
      setError("GitHub username and order number are required");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);
    setInviteResult(null);

    try {
      const response = await fetch("/api/github/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNo: orderNo.trim(),
          githubUsername: githubUsername.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send invitation");
      }

      setSuccess(true);
      setInviteResult(data);

    } catch (error) {
      console.error("Error sending GitHub invitation:", error);
      setError(error instanceof Error ? error.message : "Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle permission check
   * 处理权限检查
   */
  const handlePermissionCheck = async () => {
    setIsCheckingPermissions(true);
    setPermissionResult(null);

    try {
      const response = await fetch("/api/github/check-permissions");
      const data = await response.json();
      setPermissionResult(data);
    } catch (error) {
      console.error("Error checking permissions:", error);
      setPermissionResult({
        tokenConfigured: false,
        error: "Failed to check permissions"
      });
    } finally {
      setIsCheckingPermissions(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">GitHub Invite Demo</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This demo page allows you to test the GitHub repository invitation functionality. 
            Send invitations to users for accessing private repositories.
          </p>
        </div>

        {/* Permission Check Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              GitHub Token Configuration
            </CardTitle>
            <CardDescription>
              Check if the GitHub API token is properly configured and has the necessary permissions.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handlePermissionCheck}
              disabled={isCheckingPermissions}
              variant="outline"
            >
              {isCheckingPermissions ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Check Permissions
                </>
              )}
            </Button>

            {permissionResult && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {permissionResult.tokenConfigured ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    Token {permissionResult.tokenConfigured ? "Configured" : "Not Configured"}
                  </span>
                </div>

                {permissionResult.user && (
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium">GitHub User: {permissionResult.user.login}</p>
                    {permissionResult.scopes && (
                      <p className="text-xs text-muted-foreground">
                        Scopes: {permissionResult.scopes.join(", ")}
                      </p>
                    )}
                  </div>
                )}

                {permissionResult.error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-400">{permissionResult.error}</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator />

        {/* GitHub Invite Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="w-5 h-5" />
              Send GitHub Invitation
            </CardTitle>
            <CardDescription>
              Enter the details below to send a GitHub repository invitation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="github-username">GitHub Username</Label>
                  <Input
                    id="github-username"
                    type="text"
                    placeholder="Enter GitHub username"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order-no">Order Number</Label>
                  <Input
                    id="order-no"
                    type="text"
                    placeholder="Enter order number"
                    value={orderNo}
                    onChange={(e) => setOrderNo(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <select
                  id="product-name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="Basic Plan">Basic Plan</option>
                  <option value="Standard Plan">Standard Plan</option>
                  <option value="Premium Plan">Premium Plan</option>
                </select>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading || !githubUsername.trim() || !orderNo.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4 mr-2" />
                    Send GitHub Invitation
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Success Result */}
        {success && inviteResult && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
                Invitation Sent Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-green-600 dark:text-green-500">
                {inviteResult.message}
              </p>

              {inviteResult.repositoryName && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm font-medium mb-1">Repository:</p>
                  <p className="text-sm font-mono text-blue-600 dark:text-blue-400">
                    ShipSaaSCo/{inviteResult.repositoryName}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => window.open("https://github.com/notifications", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open GitHub Notifications
                </Button>
                
                {inviteResult.repositoryName && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(`https://github.com/ShipSaaSCo/${inviteResult.repositoryName}`, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Repository
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>1. First, check if the GitHub token is properly configured using the "Check Permissions" button.</p>
            <p>2. Enter a valid GitHub username and order number.</p>
            <p>3. Select the appropriate product plan (this determines which repository to invite to).</p>
            <p>4. Click "Send GitHub Invitation" to send the invitation.</p>
            <p>5. If successful, the user will receive an invitation to the corresponding GitHub repository.</p>
            <p>6. The user can check their GitHub notifications to accept the invitation.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
