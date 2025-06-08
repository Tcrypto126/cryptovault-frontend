"use client";

import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface WheelSegment {
  id: number;
  text: string;
  color: string;
  probability: number;
}

const segments: WheelSegment[] = [
  { id: 1, text: "$10", color: "#3498db", probability: 0.125 },
  { id: 2, text: "$0", color: "#9b59b6", probability: 0.125 },
  { id: 3, text: "$2", color: "#95a5a6", probability: 0.125 },
  { id: 4, text: "$5", color: "#16a085", probability: 0.125 },
  { id: 5, text: "$2", color: "#f39c12", probability: 0.125 },
  { id: 6, text: "$0", color: "#c0392b", probability: 0.125 },
  { id: 7, text: "$4", color: "#27ae60", probability: 0.125 },
  { id: 8, text: "$5", color: "#e67e22", probability: 0.125 },
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a1f] text-white">
      <div className="relative w-[400px] h-[400px] mb-8">
        {/* Wheel */}
        <div
          ref={wheelRef}
          className={cn(
            "w-full h-full rounded-full relative transition-transform duration-[5000ms] cubic-bezier(0.4, 0, 0.2, 1) border-4 border-black",
            isSpinning && "cursor-not-allowed"
          )}
          style={{
            transform: `rotate(${rotation}deg)`,
            boxShadow: "0 0 0 8px black",
          }}
        >
          {segments.map((segment, index) => {
            const rotation = (index * 360) / segments.length;
            return (
              <div
                key={segment.id}
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-1/2 h-1/2 origin-bottom-right"
                  style={{
                    backgroundColor: segment.color,
                    clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  }}
                >
                  <span
                    className="absolute text-white font-bold text-2xl"
                    style={{
                      left: "20%",
                      top: "25%",
                      transform: "rotate(-45deg)",
                      textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {segment.text}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Center Point */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-black rounded-full z-20" />
        </div>

        {/* Pointer */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-8 h-8 z-30">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[30px] border-yellow-400" />
        </div>
      </div>

      {/* Controls */}
      <button
        disabled={isSpinning}
        onClick={spinWheel}
        className="bg-[#6C5CE7] text-white font-bold py-3 px-12 rounded-lg text-xl disabled:opacity-50 hover:bg-[#5A4ED1] transition-colors"
      >
        SPIN!
      </button>

      {winner && (
        <div className="mt-4 text-2xl font-bold text-center">
          You won {winner.text}! 🎉
        </div>
      )}
    </div>
  );
};

export default WheelOfFortune;
