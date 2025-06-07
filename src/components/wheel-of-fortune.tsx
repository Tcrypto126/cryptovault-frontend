"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface WheelSegment {
  id: number;
  text: string;
  color: string;
  probability: number;
}

const segments: WheelSegment[] = [
  { id: 1, text: "$100", color: "#EE4040", probability: 0.1 },
  { id: 2, text: "$200", color: "#F0CF50", probability: 0.15 },
  { id: 3, text: "$300", color: "#815CD1", probability: 0.1 },
  { id: 4, text: "$400", color: "#3DA5E0", probability: 0.15 },
  { id: 5, text: "$500", color: "#34A24F", probability: 0.05 },
  { id: 6, text: "$600", color: "#F9AA1F", probability: 0.15 },
  { id: 7, text: "$700", color: "#FF9000", probability: 0.1 },
  { id: 8, text: "$800", color: "#4CB1CF", probability: 0.2 },
];

const WheelOfFortune = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Calculate weighted random segment
    const random = Math.random();
    let probabilitySum = 0;
    let selectedSegment = segments[0];

    for (const segment of segments) {
      probabilitySum += segment.probability;
      if (random <= probabilitySum) {
        selectedSegment = segment;
        break;
      }
    }

    // Calculate the final rotation
    const segmentAngle = 360 / segments.length;
    const segmentIndex = segments.indexOf(selectedSegment);
    const baseRotation = 360 * 5; // Minimum 5 full rotations
    const targetRotation = baseRotation + (360 - segmentAngle * segmentIndex);

    // Set the final rotation with some randomness
    const finalRotation = targetRotation + Math.random() * segmentAngle;

    setRotation(finalRotation);

    // Set winner after animation
    setTimeout(() => {
      setIsSpinning(false);
      setWinner(selectedSegment);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="relative w-[400px] h-[400px]">
        {/* Center Point */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full z-20 shadow-lg border-4 border-gray-800" />

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-8 z-10">
          <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600" />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className={cn(
            "w-full h-full rounded-full relative overflow-hidden transition-transform duration-[5000ms] ease-out",
            isSpinning && "cursor-not-allowed"
          )}
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        >
          {segments.map((segment, index) => {
            const rotation = (index * 360) / segments.length;
            return (
              <div
                key={segment.id}
                className="absolute top-0 left-0 w-full h-full origin-bottom-right"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1/2 h-full origin-right flex items-center justify-center transform -translate-y-1/2"
                  style={{
                    backgroundColor: segment.color,
                    transform: `rotate(${180 / segments.length}deg) skew(${
                      90 - 360 / segments.length
                    }deg)`,
                  }}
                >
                  <span
                    className="absolute text-white font-bold text-xl whitespace-nowrap transform -rotate-90 translate-x-12"
                    style={{
                      transform: `rotate(${
                        rotation + 360 / segments.length / 2
                      }deg)`,
                    }}
                  >
                    {segment.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4">
        <Button
          size="lg"
          disabled={isSpinning}
          onClick={spinWheel}
          className="text-lg px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          {isSpinning ? "Spinning..." : "SPIN!"}
        </Button>

        {winner && (
          <div className="text-2xl font-bold text-center animate-bounce">
            You won {winner.text}! 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default WheelOfFortune;
