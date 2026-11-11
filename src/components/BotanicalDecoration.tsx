import React from "react";

interface BotanicalProps {
  className?: string;
  variant?: "branch-left" | "branch-right" | "leaves-corner" | "wreath-center" | "olive-subtle-bg";
  opacity?: number;
  blur?: number;
  visible?: boolean;
}

export const BotanicalDecoration: React.FC<BotanicalProps> = ({
  className = "",
  variant = "branch-left",
  opacity = 0.12,
  blur = 0,
  visible = true,
}) => {
  if (!visible) return null;

  const style: React.CSSProperties = {
    opacity,
    filter: blur > 0 ? `blur(${blur}px)` : undefined,
    pointerEvents: "none",
  };

  if (variant === "branch-left") {
    return (
      <div className={`absolute top-0 left-0 overflow-hidden select-none z-0 ${className}`} style={style}>
        <svg
          width="320"
          height="450"
          viewBox="0 0 320 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#354936]"
        >
          {/* Main curved branch */}
          <path
            d="M-20 0 C40 80, 70 180, 40 280 C20 340, 60 400, 100 450"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Leaves and delicate olive fruits */}
          <path
            d="M30 60 C50 40, 85 45, 95 65 C85 85, 50 80, 30 60 Z"
            fill="currentColor"
            fillOpacity="0.75"
          />
          <path
            d="M48 110 C75 95, 110 105, 115 130 C95 145, 60 135, 48 110 Z"
            fill="currentColor"
            fillOpacity="0.8"
          />
          <ellipse cx="108" cy="148" rx="7" ry="10" transform="rotate(-20 108 148)" fill="currentColor" fillOpacity="0.9" />
          
          <path
            d="M60 170 C90 160, 125 175, 130 200 C105 210, 75 195, 60 170 Z"
            fill="currentColor"
            fillOpacity="0.75"
          />
          <path
            d="M50 230 C80 225, 110 245, 105 270 C80 275, 55 255, 50 230 Z"
            fill="currentColor"
            fillOpacity="0.85"
          />
          <ellipse cx="112" cy="285" rx="6" ry="9" transform="rotate(15 112 285)" fill="currentColor" fillOpacity="0.9" />
          
          <path
            d="M35 300 C60 300, 90 325, 80 350 C55 350, 40 325, 35 300 Z"
            fill="currentColor"
            fillOpacity="0.7"
          />
        </svg>
      </div>
    );
  }

  if (variant === "branch-right") {
    return (
      <div className={`absolute top-0 right-0 overflow-hidden select-none z-0 ${className}`} style={style}>
        <svg
          width="320"
          height="450"
          viewBox="0 0 320 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#354936]"
        >
          <g transform="translate(320, 0) scale(-1, 1)">
            <path
              d="M-20 0 C40 80, 70 180, 40 280 C20 340, 60 400, 100 450"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M30 60 C50 40, 85 45, 95 65 C85 85, 50 80, 30 60 Z"
              fill="currentColor"
              fillOpacity="0.75"
            />
            <path
              d="M48 110 C75 95, 110 105, 115 130 C95 145, 60 135, 48 110 Z"
              fill="currentColor"
              fillOpacity="0.8"
            />
            <ellipse cx="108" cy="148" rx="7" ry="10" transform="rotate(-20 108 148)" fill="currentColor" fillOpacity="0.9" />
            <path
              d="M60 170 C90 160, 125 175, 130 200 C105 210, 75 195, 60 170 Z"
              fill="currentColor"
              fillOpacity="0.75"
            />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "wreath-center") {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`} style={style}>
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C9A96E]"
        >
          {/* Left arc */}
          <path
            d="M 80 150 C 35 150 15 110 15 80 C 15 45 40 15 75 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Right arc */}
          <path
            d="M 80 150 C 125 150 145 110 145 80 C 145 45 120 15 85 10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Olive leaf accents */}
          <path d="M 22 75 C 10 70 12 55 25 60 C 30 65 28 75 22 75 Z" fill="currentColor" />
          <path d="M 138 75 C 150 70 148 55 135 60 C 130 65 132 75 138 75 Z" fill="currentColor" />
          <path d="M 35 40 C 25 35 30 22 42 28 C 45 34 40 42 35 40 Z" fill="currentColor" />
          <path d="M 125 40 C 135 35 130 22 118 28 C 115 34 120 42 125 40 Z" fill="currentColor" />
        </svg>
      </div>
    );
  }

  // default subtle background organic shapes
  return (
    <div className={`fixed inset-0 pointer-events-none select-none z-0 overflow-hidden ${className}`} style={style}>
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#78866B] mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#A6B39A] mix-blend-multiply filter blur-3xl opacity-25" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#C9A96E] mix-blend-multiply filter blur-3xl opacity-20" />
    </div>
  );
};

