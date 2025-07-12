import { Suspense } from 'react';
import ResetPasswordForm from './ResetPasswordForm';

// 服务器组件
export default async function ResetPassword(
  props: {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ token?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  // 使用 await 获取 locale
  const { locale } = await props.params;

  // 获取token参数
  const token = searchParams?.token || '';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below to reset your account password.
          </p>
        </div>
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ResetPasswordForm token={token} locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
