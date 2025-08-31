"use client";

import Image from "next/image";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  description: string;
  thumbnailUrl?: string;
  price: number;
  currency: string;
  durationMinutes?: number;
  onEnroll?: () => void;
}

export function CourseCard({
  title,
  description,
  thumbnailUrl,
  price,
  currency,
  durationMinutes,
  onEnroll,
}: CourseCardProps) {
  const formatPrice = (price: number, currency: string) => {
    const amount = price / 100; // Convert cents to main currency unit
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {thumbnailUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </CardTitle>
          </div>
          <Badge variant="secondary" className="ml-2">
            {formatPrice(price, currency)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {durationMinutes && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDuration(durationMinutes)}</span>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <Button
              onClick={onEnroll}
              className="w-full bg-[#09382f] hover:bg-[#0a4a3a] text-white">
              Enroll Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}