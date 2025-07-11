import Link from 'next/link';
import { NotFound as GhostNotFound } from "@/components/ui/ghost-404-page";

export default function LocaleNotFound() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <GhostNotFound />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          ← 返回首页
        </Link>
      </div>
    </div>
  );
}
