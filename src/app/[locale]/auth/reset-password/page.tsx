import { Suspense } from 'react';
import Link from 'next/link';
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
        <div className="flex justify-start mb-4">
          <Link href="/">
            <button className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              Home
            </button>
          </Link>
        </div>
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
