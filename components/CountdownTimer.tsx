"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Calendar } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isAnniversary, setIsAnniversary] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        setIsAnniversary(true);
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isAnniversary) {
    return (
      <Card className="p-8 text-center bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200">
        <div className="space-y-4">
          <div className="text-6xl animate-bounce">🎉</div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            纪念日快乐！
          </h2>
          <p className="text-gray-600 text-lg">
            今天是我们的特殊日子 ❤️
          </p>
          <div className="flex justify-center space-x-2">
            <Heart className="text-pink-500 animate-pulse" size={24} />
            <Heart className="text-red-500 animate-pulse" size={24} />
            <Heart className="text-pink-500 animate-pulse" size={24} />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Calendar className="mx-auto text-pink-500 mb-4" size={32} />
        <h2 className="text-2xl font-bold text-gray-800">距离纪念日还有</h2>
        <p className="text-gray-600">每一天都在期待与你的未来</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <div className="text-3xl font-bold text-pink-600">{timeLeft.days}</div>
          <div className="text-sm text-gray-600">天</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-3xl font-bold text-purple-600">{timeLeft.hours}</div>
          <div className="text-sm text-gray-600">小时</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
          <div className="text-3xl font-bold text-rose-600">{timeLeft.minutes}</div>
          <div className="text-sm text-gray-600">分钟</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
          <div className="text-3xl font-bold text-indigo-600">{timeLeft.seconds}</div>
          <div className="text-sm text-gray-600">秒</div>
        </Card>
      </div>

      <Card className="p-6 text-center bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
        <div className="space-y-2">
          <div className="text-4xl">💝</div>
          <h3 className="text-lg font-semibold text-gray-800">
            爱的倒计时
          </h3>
          <p className="text-sm text-gray-600">
            时间见证着我们的爱情
          </p>
        </div>
      </Card>
    </div>
  );
}
