"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Sparkles, Mail, X, Volume2, VolumeX } from "lucide-react";
import HeartAnimation from "@/components/HeartAnimation";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [showHearts, setShowHearts] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLetter, setShowLetter] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typewriterTimeout, setTypewriterTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // 情书内容
  const loveLetter = `亲爱的你：

时间过得真快，我们已经在一起整整一年了。这一年来，每一天都因为有你而变得格外珍贵和美好。

还记得我们第一次相遇的那个午后吗？阳光透过咖啡厅的窗户洒在你的脸上，你轻声细语地说话，那一刻我就知道，你就是我一直在等的那个人。

这一年里，我们一起看过日出日落，走过春夏秋冬。你的笑容是我每天最期待的阳光，你的拥抱是我最安心的港湾。无论是开心的时候还是难过的时候，有你在身边，一切都变得有意义。

谢谢你包容我的小脾气，理解我的小任性，陪伴我度过每一个平凡却又不平凡的日子。你让我明白了什么是真正的爱情，什么是想要共度一生的感觉。

在我们的一周年纪念日里，我想对你说：我爱你，不只是今天，不只是这一年，而是余生的每一天。愿我们的爱情像这美好的时光一样，永远甜蜜，永远温暖。

未来的路还很长，但只要有你在身边，我就有勇气走过任何风雨。让我们一起创造更多美好的回忆，一起走向属于我们的未来。

爱你的人
❤️ 永远`;

  useEffect(() => {
    // 初始化音频
    const audioElement = new Audio("https://bing-wu-doc-1318477772.cos.ap-nanjing.myqcloud.com/music/%E5%91%A8%E6%9D%B0%E4%BC%A6%20-%20%E4%BD%A0%E5%90%AC%E5%BE%97%E5%88%B0.mp3"); // 临时音频URL，你可以替换成自己的
    audioElement.loop = true;
    audioElement.volume = 0.2; // 设置音量为20%

    // 添加音频事件监听
    audioElement.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    audioElement.addEventListener('error', (e) => {
      console.log("音频加载失败:", e);
      setIsPlaying(false);
    });

    setAudio(audioElement);

    // 模拟加载过程
    const timer = setTimeout(() => {
      setIsLoading(false);
      // 加载完成后自动播放音乐
      setTimeout(() => {
        audioElement.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log("自动播放失败，可能需要用户交互:", error);
        });
      }, 500); // 延迟500ms确保页面完全加载
    }, 3000);

    return () => {
      clearTimeout(timer);
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, []);

  const openLetter = () => {
    setShowHearts(true);
    setTimeout(() => setShowHearts(false), 3000);
    setShowLetter(true);
    setDisplayedText("");
    setIsTyping(true);

    // 如果音乐没有播放，则自动播放
    if (audio && !isPlaying) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("打开情书时音乐播放失败:", error);
      });
    }

    // 开始打字机效果
    let currentIndex = 0;
    const baseSpeed = 60; // 基础打字速度

    const typeWriter = () => {
      if (currentIndex < loveLetter.length) {
        setDisplayedText(loveLetter.slice(0, currentIndex + 1));
        currentIndex++;

        // 根据字符类型调整速度，让打字效果更自然
        const currentChar = loveLetter[currentIndex - 1];
        let speed = baseSpeed;

        if (currentChar === '，' || currentChar === '。' || currentChar === '！' || currentChar === '？') {
          speed = 200; // 标点符号后稍作停顿
        } else if (currentChar === '\n') {
          speed = 300; // 换行后停顿更长
        } else if (currentChar === ' ') {
          speed = 30; // 空格快速跳过
        }

        const timeout = setTimeout(typeWriter, speed);
        setTypewriterTimeout(timeout);
      } else {
        setIsTyping(false);
      }
    };

    // 延迟500ms开始打字，让弹窗动画先完成
    setTimeout(typeWriter, 500);
  };

  const skipTyping = () => {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
    }
    setDisplayedText(loveLetter);
    setIsTyping(false);
  };

  const toggleMusic = async () => {
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("音频播放失败:", error);
    }
  };

  const closeLetter = () => {
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
    }
    setShowLetter(false);
    setDisplayedText("");
    setIsTyping(false);
    setTypewriterTimeout(null);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* 爱心动画 */}
      {showHearts && <HeartAnimation />}

      {/* 音乐控制按钮 */}
      <div className="fixed bottom-32 right-6 z-40 group">
        <Button
          onClick={toggleMusic}
          className={`rounded-full p-3 shadow-lg transition-all duration-300 ${isPlaying
            ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white'
            : 'bg-white/80 backdrop-blur-md hover:bg-white text-gray-600 border border-pink-200'
            }`}
          size="sm"
        >
          {isPlaying ? (
            <Volume2 size={18} className="animate-pulse" />
          ) : (
            <VolumeX size={18} />
          )}
        </Button>

        {/* 音乐提示 */}
        <div className="absolute right-0 bottom-12 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {isPlaying ? '点击暂停音乐' : '点击播放背景音乐'}
        </div>
      </div>

      {/* 情书弹窗 */}
      {showLetter && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-2xl border border-amber-200 max-w-md w-full max-h-[80vh] overflow-hidden animate-in zoom-in-95 fade-in-0 duration-500">
            {/* 信封头部 */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 border-b border-amber-200 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="text-amber-600" size={24} />
                  <h3 className="text-lg font-semibold text-amber-800">给你的情书</h3>
                </div>
                <div className="flex items-center space-x-2">
                  {isTyping && (
                    <Button
                      onClick={skipTyping}
                      variant="ghost"
                      size="sm"
                      className="hover:bg-amber-200 text-amber-600 text-xs"
                    >
                      跳过
                    </Button>
                  )}
                  <Button
                    onClick={closeLetter}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-amber-200 text-amber-600"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
              <div className="absolute top-2 right-16 text-amber-400">
                <Sparkles size={16} />
              </div>
            </div>

            {/* 信纸内容 */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
              <div className="space-y-4">
                <div className="text-right text-sm text-amber-600 mb-4">
                  📅 我们的一周年纪念日
                </div>

                <div className="whitespace-pre-line text-gray-800 leading-relaxed font-medium text-sm min-h-[200px]">
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-amber-600 ml-1 animate-pulse"></span>
                  )}
                </div>

                <div className="flex justify-center items-center space-x-2 pt-4">
                  <Heart size={14} className="text-red-500 fill-red-500" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-red-300 to-pink-300 rounded-full"></div>
                  <Heart size={16} className="text-pink-500 fill-pink-500" />
                  <div className="w-12 h-0.5 bg-gradient-to-r from-pink-300 to-red-300 rounded-full"></div>
                  <Heart size={14} className="text-red-500 fill-red-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 主内容区域 */}
      <main className="pt-8 pb-8 px-4 smooth-scroll">
        <div className="max-w-md mx-auto space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-4">
            <div className="relative">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                我们的一周年
              </h1>
              <Sparkles className="absolute -top-2 -right-2 text-pink-400 w-6 h-6 animate-pulse" />
            </div>
            <p className="text-gray-600 text-lg">
              365天的甜蜜时光 ❤️
            </p>
          </div>

          <Card className="p-6 text-center bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <div className="space-y-4">
              <div className="text-6xl animate-pulse">💕</div>
              <h2 className="text-2xl font-semibold text-gray-800">
                爱你每一天
              </h2>
              <p className="text-gray-600">
                从相遇到相爱，每一个瞬间都值得珍藏
              </p>
              <Button
                onClick={openLetter}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                打开情书
              </Button>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 text-center bg-pink-50 border-pink-200">
              <Calendar className="mx-auto mb-2 text-pink-500" size={24} />
              <div className="text-2xl font-bold text-pink-600">365</div>
              <div className="text-sm text-gray-600">相爱天数</div>
            </Card>
            <Card className="p-4 text-center bg-purple-50 border-purple-200">
              <Heart className="mx-auto mb-2 text-purple-500" size={24} />
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">爱你程度</div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
