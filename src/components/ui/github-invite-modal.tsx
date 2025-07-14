"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ExternalLink, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * GitHub Invite Modal Props
 * GitHub 邀请弹窗属性
 */
interface GitHubInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNo: string;
  productName: string;
  onSuccess?: (orderNo: string, githubInfo: { githubUsername: string; repositoryName: string; invitationSentAt: string }) => void;
}

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
 * GitHub Invite Modal Component
 * GitHub 邀请弹窗组件
 */
export function GitHubInviteModal({
  isOpen,
  onClose,
  orderNo,
  productName,
  onSuccess
}: GitHubInviteModalProps) {
  const t = useTranslations('dashboard.billing');
  
  const [githubUsername, setGithubUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [inviteResult, setInviteResult] = useState<GitHubInviteResponse | null>(null);

  /**
   * Handle form submission
   * 处理表单提交
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!githubUsername.trim()) {
      setError("GitHub username is required");
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
          orderNo,
          githubUsername: githubUsername.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send invitation");
      }

      setSuccess(true);
      setInviteResult(data);

      // Call success callback to update parent component
      if (onSuccess && data.repositoryName) {
        onSuccess(orderNo, {
          githubUsername: githubUsername.trim(),
          repositoryName: data.repositoryName,
          invitationSentAt: new Date().toISOString()
        });
      }

    } catch (error) {
      console.error("Error sending GitHub invitation:", error);
      setError(error instanceof Error ? error.message : "Failed to send invitation");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle modal close
   * 处理弹窗关闭
   */
  const handleClose = () => {
    if (!isLoading) {
      setGithubUsername("");
      setError("");
      setSuccess(false);
      setInviteResult(null);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub Repository Access
          </DialogTitle>
          <DialogDescription>
            Enter your GitHub username to receive an invitation to access the {productName} repository.
          </DialogDescription>
        </DialogHeader>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-username">GitHub Username</Label>
              <Input
                id="github-username"
                type="text"
                placeholder="Enter your GitHub username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                disabled={isLoading}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Make sure this is your exact GitHub username (case-sensitive)
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Order:</strong> {orderNo}<br />
                <strong>Product:</strong> {productName}
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !githubUsername.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Invitation...
                  </>
                ) : (
                  "Send GitHub Invitation"
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-400">
                  Invitation Sent Successfully!
                </p>
                <p className="text-xs text-green-600 dark:text-green-500">
                  {inviteResult?.message}
                </p>
              </div>
            </div>

            {inviteResult?.repositoryName && (
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-medium mb-1">Repository:</p>
                <p className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  shipsaasnet/{inviteResult.repositoryName}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Next steps:
              </p>
              <ol className="text-xs text-muted-foreground space-y-1 ml-4">
                <li>1. Check your GitHub notifications</li>
                <li>2. Accept the repository invitation</li>
                <li>3. You'll then have access to the private repository</li>
              </ol>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => window.open("https://github.com/notifications", "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open GitHub Notifications
              </Button>
              <Button onClick={handleClose}>
                Done
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
