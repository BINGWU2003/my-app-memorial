"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartProps {
  id: number;
  left: number;
  delay: number;
  size: number;
  color: string;
}

export default function HeartAnimation() {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    // 创建多个爱心
    const newHearts = Array.from({ length: 12 }, (_, index) => ({
      id: index,
      left: Math.random() * 100, // 随机水平位置 (%)
      delay: Math.random() * 2000, // 随机延迟 (ms)
      size: 16 + Math.random() * 16, // 随机大小 (16-32px)
      color: ['text-red-500', 'text-pink-500', 'text-rose-500', 'text-red-400'][
        Math.floor(Math.random() * 4)
      ]
    }));

    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-up"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}ms`,
            animationDuration: '3s',
            bottom: '-50px'
          }}
        >
          <Heart
            size={heart.size}
            className={`${heart.color} fill-current animate-pulse`}
          />
        </div>
      ))}
    </div>
  );
}
