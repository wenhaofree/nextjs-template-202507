"use client";

import { useEffect } from 'react';

export const useSmoothScroll = () => {
  // 平滑滚动到指定元素
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // 处理 URL 锚点
  const handleHashNavigation = () => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1); // 移除 # 符号
      // 延迟滚动，确保页面完全加载
      setTimeout(() => {
        scrollToElement(elementId);
      }, 100);
    }
  };

  // 监听 hashchange 事件
  useEffect(() => {
    // 页面加载时处理锚点
    handleHashNavigation();

    // 监听 hash 变化
    const handleHashChange = () => {
      handleHashNavigation();
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return {
    scrollToElement,
    handleHashNavigation,
  };
};
