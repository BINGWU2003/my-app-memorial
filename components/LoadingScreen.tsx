"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center z-50">
      <div className="text-center space-y-6">
        {/* 爱心动画 */}
        <div className="relative">
          <Heart 
            size={48} 
            className="text-pink-500 fill-pink-500 animate-pulse mx-auto" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* 标题 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            我们的一周年
          </h1>
          <p className="text-gray-600">
            正在加载美好回忆...
          </p>
        </div>

        {/* 进度条 */}
        <div className="w-64 mx-auto space-y-2">
          <div className="w-full bg-pink-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">{progress}%</p>
        </div>

        {/* 装饰元素 */}
        <div className="flex justify-center space-x-4 text-pink-300">
          <div className="animate-bounce delay-0">💕</div>
          <div className="animate-bounce delay-150">💖</div>
          <div className="animate-bounce delay-300">💕</div>
        </div>
      </div>
    </div>
  );
}
