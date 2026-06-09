"use client";

import { useEffect, useRef, useState } from "react";

interface TransparentPortraitProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentPortrait({ src, alt, className }: TransparentPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = img.width;
      const h = img.height;
      canvas.width = w;
      canvas.height = h;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      // Sample background color near the top edge
      const bgIndex = (5 * w + 5) * 4;
      const bgR = data[bgIndex];
      const bgG = data[bgIndex + 1];
      const bgB = data[bgIndex + 2];

      const threshold = 45; // Similarity range for light-gray backdrop
      const visited = new Uint8Array(w * h);
      const queue: number[] = [];

      const isBgColor = (idx: number) => {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const dist = Math.sqrt((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2);
        return dist < threshold;
      };

      // Push border pixels
      for (let x = 0; x < w; x++) {
        const topIdx = x * 4;
        if (isBgColor(topIdx)) {
          queue.push(x, 0);
          visited[x] = 1;
        }
      }
      for (let y = 0; y < h; y++) {
        const leftIdx = (y * w) * 4;
        if (!visited[y * w] && isBgColor(leftIdx)) {
          queue.push(0, y);
          visited[y * w] = 1;
        }
        const rightIdx = (y * w + w - 1) * 4;
        if (!visited[y * w + w - 1] && isBgColor(rightIdx)) {
          queue.push(w - 1, y);
          visited[y * w + w - 1] = 1;
        }
      }

      // BFS to find all connected background pixels
      let head = 0;
      const dx = [0, 0, 1, -1];
      const dy = [1, -1, 0, 0];

      while (head < queue.length) {
        const cx = queue[head++];
        const cy = queue[head++];

        const cIdx = (cy * w + cx) * 4;
        data[cIdx + 3] = 0; // Make transparent

        for (let i = 0; i < 4; i++) {
          const nx = cx + dx[i];
          const ny = cy + dy[i];
          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const nPos = ny * w + nx;
            if (visited[nPos] === 0) {
              const nIdx = nPos * 4;
              if (isBgColor(nIdx)) {
                visited[nPos] = 1;
                queue.push(nx, ny);
              }
            }
          }
        }
      }

      // Smooth edges
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const pos = y * w + x;
          if (visited[pos] === 0) {
            const n1 = y * w + (x - 1);
            const n2 = y * w + (x + 1);
            const n3 = (y - 1) * w + x;
            const n4 = (y + 1) * w + x;
            if (visited[n1] || visited[n2] || visited[n3] || visited[n4]) {
              data[pos * 4 + 3] = 180; // Soft transition edge
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setLoaded(true);
    };
  }, [src]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain object-bottom transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        aria-label={alt}
      />
    </div>
  );
}
