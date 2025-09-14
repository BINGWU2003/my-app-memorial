"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

interface Memory {
  title: string;
  date: string;
  description: string;
  image: string;
}

interface MemoryCardProps {
  memory: Memory;
}

export default function MemoryCard({ memory }: MemoryCardProps) {
  const [liked, setLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={memory.image}
          alt={memory.title}
          fill
          className="object-cover"
        />
        
        {/* 爱心按钮 */}
        <Button
          onClick={() => setLiked(!liked)}
          className={`absolute top-3 right-3 rounded-full p-2 transition-colors ${
            liked 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white/80 hover:bg-white'
          }`}
          size="sm"
        >
          <Heart
            size={14}
            className={liked ? 'text-white fill-white' : 'text-red-500'}
          />
        </Button>

        {/* 渐变遮罩 */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* 标题 */}
        <h3 className="absolute bottom-3 left-3 text-white font-semibold text-lg">
          {memory.title}
        </h3>
      </div>

      <div className="p-4 space-y-3">
        {/* 日期 */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} className="text-pink-500" />
          <span>{formatDate(memory.date)}</span>
        </div>

        {/* 描述 */}
        <div className="space-y-2">
          <p className={`text-gray-700 text-sm leading-relaxed ${
            !showFullDescription && memory.description.length > 50 ? 'line-clamp-2' : ''
          }`}>
            {memory.description}
          </p>
          
          {memory.description.length > 50 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-pink-500 hover:text-pink-600 p-0 h-auto font-normal"
            >
              {showFullDescription ? '收起' : '展开'}
            </Button>
          )}
        </div>

        {/* 互动区域 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={14} className={liked ? 'fill-current' : ''} />
              <span>{liked ? '已喜欢' : '喜欢'}</span>
            </button>
            
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <MapPin size={14} />
              <span>美好回忆</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-400">
            {Math.floor(Math.random() * 365) + 1} 天前
          </div>
        </div>
      </div>
    </Card>
  );
}
