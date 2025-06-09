import React, { useEffect, useRef } from "react";
import { Fireworks } from "fireworks-js";

const Firework = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const options = {
      rocketsPoint: { min: 50, max: 50 },
      hue: { min: 0, max: 360 },
      delay: { min: 15, max: 30 },
      speed: 2,
      acceleration: 1.05,
      friction: 0.98,
      gravity: 1.5,
      particles: 50,
      trace: 3,
      explosion: 5,
      autoresize: true,
      brightness: { min: 50, max: 80 },
      decay: { min: 0.015, max: 0.03 },
      mouse: { click: false, move: false, max: 1 },
      boundaries: {
        x: 50,
        y: 50,
      },
      sound: {
        enabled: false,
        files: [],
        volume: { min: 1, max: 2 },
      },
    };

    const fireworks = new Fireworks(containerRef.current, options);
    fireworks.start();

    return () => {
      fireworks.stop();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div ref={containerRef} className="firewall w-full h-full" />;
    </div>
  );
};

export default Firework;
