// Google One Tap 类型定义
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: any) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            context?: string;
            ux_mode?: 'popup' | 'redirect';
            login_uri?: string;
            native_callback?: (response: any) => void;
            intermediate_iframe_close_callback?: () => void;
            itp_support?: boolean;
          }) => void;
          prompt: (callback?: (notification: any) => void) => void;
          cancel: () => void;
          renderButton: (parent: HTMLElement, options: any) => void;
        };
      };
    };
  }

  // Google One Tap 通知接口
  interface GoogleOneTapNotification {
    isNotDisplayed(): boolean;
    isSkippedMoment(): boolean;
    isDismissedMoment(): boolean;
    getNotDisplayedReason(): string;
    getSkippedReason(): string;
    getDismissedReason(): string;
  }

  // Google One Tap 凭据响应接口
  interface GoogleCredentialResponse {
    credential: string;
    select_by: string;
  }
}

export {};
