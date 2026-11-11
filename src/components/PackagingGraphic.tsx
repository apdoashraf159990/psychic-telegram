import React from "react";

interface PackagingProps {
  type: "pump_bottle" | "dropper_bottle" | "jar" | "spray_bottle" | "perfume_bottle" | "tube" | "lipstick" | "gift_box";
  productNameAr?: string;
  productNameEn?: string;
  accentColor?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const PackagingGraphic: React.FC<PackagingProps> = ({
  type,
  productNameAr = "مستحضر العناية الفاخر",
  productNameEn = "Luxury Care",
  accentColor = "#354936",
  className = "",
  size = "md",
}) => {
  const dimensions = {
    sm: { width: 140, height: 160 },
    md: { width: 220, height: 260 },
    lg: { width: 320, height: 380 },
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 240 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-xl"
      >
        <defs>
          {/* Olive luxury gradients */}
          <linearGradient id={`olive-glass-${type}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1E2F23" />
            <stop offset="35%" stopColor={accentColor} />
            <stop offset="60%" stopColor="#4A654C" />
            <stop offset="85%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#1B281E" />
          </linearGradient>

          {/* Gold metallic cap gradient */}
          <linearGradient id={`gold-cap-${type}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9C7B43" />
            <stop offset="30%" stopColor="#E5C78D" />
            <stop offset="50%" stopColor="#F7E6C4" />
            <stop offset="70%" stopColor="#D9B777" />
            <stop offset="100%" stopColor="#8A6C38" />
          </linearGradient>

          {/* Frosted cream label gradient */}
          <linearGradient id={`cream-label-${type}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F4EDE0" />
          </linearGradient>

          {/* Glass specular sheen */}
          <linearGradient id={`specular-${type}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* 1. DROPPER BOTTLE */}
        {type === "dropper_bottle" && (
          <g>
            {/* Rubber bulb */}
            <path d="M108 30 C108 20 132 20 132 30 L134 45 L106 45 Z" fill="#202A22" />
            {/* Gold collar */}
            <rect x="102" y="45" width="36" height="18" rx="2" fill={`url(#gold-cap-${type})`} />
            <line x1="102" y1="54" x2="138" y2="54" stroke="#7A6031" strokeWidth="1" />
            
            {/* Glass body */}
            <rect x="75" y="63" width="90" height="175" rx="16" fill={`url(#olive-glass-${type})`} />
            {/* Gloss reflection strip */}
            <rect x="83" y="70" width="10" height="160" rx="5" fill={`url(#specular-${type})`} />

            {/* Cream Label */}
            <rect x="82" y="105" width="76" height="95" rx="4" fill={`url(#cream-label-${type})`} stroke="#C9A96E" strokeWidth="0.8" />
            {/* Brand Logo Arabic */}
            <text x="120" y="132" fill="#203A2B" fontSize="16" fontWeight="bold" fontFamily="serif" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="145" fill="#78866B" fontSize="7" letterSpacing="2" fontFamily="sans-serif" textAnchor="middle">
              ROOH
            </text>
            <line x1="94" y1="152" x2="146" y2="152" stroke="#C9A96E" strokeWidth="0.8" />
            {/* Product Title */}
            <text x="120" y="167" fill="#30332D" fontSize="8" fontWeight="600" textAnchor="middle">
              {productNameAr.slice(0, 16)}
            </text>
            <text x="120" y="179" fill="#78866B" fontSize="6" textAnchor="middle">
              {productNameEn.slice(0, 18)}
            </text>
            <text x="120" y="192" fill="#C9A96E" fontSize="5.5" letterSpacing="1" textAnchor="middle">
              SERUM • 30 ML
            </text>
          </g>
        )}

        {/* 2. PUMP BOTTLE */}
        {type === "pump_bottle" && (
          <g>
            {/* Pump actuator */}
            <path d="M120 20 L145 20 C148 20 150 22 150 25 L145 32 L115 32 Z" fill={`url(#gold-cap-${type})`} />
            <rect x="114" y="32" width="12" height="15" fill={`url(#gold-cap-${type})`} />
            <rect x="96" y="47" width="48" height="16" rx="2" fill={`url(#gold-cap-${type})`} />
            
            {/* Bottle body */}
            <rect x="68" y="63" width="104" height="185" rx="14" fill={`url(#olive-glass-${type})`} />
            <rect x="76" y="70" width="12" height="170" rx="6" fill={`url(#specular-${type})`} />

            {/* Label */}
            <rect x="76" y="105" width="88" height="110" rx="4" fill={`url(#cream-label-${type})`} stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="132" fill="#203A2B" fontSize="18" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="146" fill="#78866B" fontSize="8" letterSpacing="3" textAnchor="middle">
              ROOH
            </text>
            <line x1="90" y1="154" x2="150" y2="154" stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="172" fill="#30332D" fontSize="9" fontWeight="600" textAnchor="middle">
              {productNameAr.slice(0, 18)}
            </text>
            <text x="120" y="186" fill="#78866B" fontSize="7" textAnchor="middle">
              {productNameEn.slice(0, 20)}
            </text>
            <text x="120" y="202" fill="#C9A96E" fontSize="6.5" letterSpacing="1" textAnchor="middle">
              PURE BOTANICAL • 250 ML
            </text>
          </g>
        )}

        {/* 3. COSMETIC JAR */}
        {type === "jar" && (
          <g>
            {/* Gold Lid */}
            <rect x="58" y="90" width="124" height="30" rx="5" fill={`url(#gold-cap-${type})`} />
            <rect x="62" y="93" width="116" height="3" fill="#FFF2D6" opacity="0.6" />
            
            {/* Jar Base */}
            <rect x="62" y="120" width="116" height="95" rx="10" fill={`url(#olive-glass-${type})`} />
            <rect x="68" y="125" width="10" height="85" rx="5" fill={`url(#specular-${type})`} />

            {/* Label */}
            <rect x="72" y="138" width="96" height="62" rx="3" fill={`url(#cream-label-${type})`} stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="158" fill="#203A2B" fontSize="15" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="169" fill="#78866B" fontSize="7" letterSpacing="2" textAnchor="middle">
              ROOH
            </text>
            <line x1="90" y1="174" x2="150" y2="174" stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="187" fill="#30332D" fontSize="8" fontWeight="600" textAnchor="middle">
              {productNameAr.slice(0, 16)}
            </text>
          </g>
        )}

        {/* 4. PERFUME BOTTLE */}
        {type === "perfume_bottle" && (
          <g>
            {/* Heavy gold faceted cap */}
            <rect x="94" y="28" width="52" height="42" rx="4" fill={`url(#gold-cap-${type})`} />
            <rect x="100" y="32" width="40" height="34" rx="2" stroke="#684D20" strokeWidth="0.8" />
            
            {/* Collar */}
            <rect x="105" y="70" width="30" height="12" fill={`url(#gold-cap-${type})`} />

            {/* Heavy glass crystal body */}
            <rect x="60" y="82" width="120" height="160" rx="12" fill={`url(#olive-glass-${type})`} />
            {/* Internal fragrance liquid glow */}
            <rect x="68" y="90" width="104" height="144" rx="8" fill="#1C3825" opacity="0.6" />
            <rect x="72" y="92" width="12" height="140" rx="6" fill={`url(#specular-${type})`} />

            {/* Metallic Gold Plaque Label */}
            <rect x="78" y="125" width="84" height="70" rx="4" fill={`url(#cream-label-${type})`} stroke="#C9A96E" strokeWidth="1.2" />
            <text x="120" y="148" fill="#203A2B" fontSize="17" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="160" fill="#78866B" fontSize="7" letterSpacing="2.5" textAnchor="middle">
              EAU DE PARFUM
            </text>
            <line x1="92" y1="166" x2="148" y2="166" stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="180" fill="#30332D" fontSize="8" fontWeight="600" textAnchor="middle">
              {productNameAr.slice(0, 16)}
            </text>
          </g>
        )}

        {/* 5. TUBE / BODY CARE */}
        {type === "tube" && (
          <g>
            {/* Tube body */}
            <path
              d="M72 50 L168 50 L154 210 L86 210 Z"
              fill={`url(#olive-glass-${type})`}
            />
            {/* Gold flip cap at base */}
            <rect x="80" y="210" width="80" height="30" rx="4" fill={`url(#gold-cap-${type})`} />
            
            {/* Label in center of tube */}
            <rect x="84" y="95" width="72" height="85" rx="4" fill={`url(#cream-label-${type})`} stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="120" fill="#203A2B" fontSize="16" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="132" fill="#78866B" fontSize="7" letterSpacing="2" textAnchor="middle">
              ROOH
            </text>
            <line x1="96" y1="139" x2="144" y2="139" stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="155" fill="#30332D" fontSize="8" fontWeight="600" textAnchor="middle">
              {productNameAr.slice(0, 15)}
            </text>
          </g>
        )}

        {/* 6. LIPSTICK */}
        {type === "lipstick" && (
          <g>
            {/* Upper case cap */}
            <rect x="94" y="45" width="52" height="95" rx="6" fill={`url(#olive-glass-${type})`} />
            {/* Gold middle ring */}
            <rect x="92" y="140" width="56" height="15" fill={`url(#gold-cap-${type})`} />
            {/* Lower base case */}
            <rect x="94" y="155" width="52" height="85" rx="6" fill={`url(#olive-glass-${type})`} />
            
            {/* Engraved Gold Logo on Cap */}
            <text x="120" y="95" fill="#E5C78D" fontSize="14" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="108" fill="#F7E6C4" fontSize="6" letterSpacing="2" textAnchor="middle">
              ROOH
            </text>
          </g>
        )}

        {/* 7. GIFT BOX / MASTER COLLECTION */}
        {type === "gift_box" && (
          <g>
            {/* Outer luxury gift box */}
            <rect x="42" y="60" width="156" height="175" rx="10" fill={`url(#olive-glass-${type})`} stroke="#C9A96E" strokeWidth="1.5" />
            {/* Golden cross ribbon */}
            <rect x="110" y="60" width="20" height="175" fill={`url(#gold-cap-${type})`} opacity="0.9" />
            <rect x="42" y="135" width="156" height="20" fill={`url(#gold-cap-${type})`} opacity="0.9" />
            
            {/* Golden luxury seal */}
            <circle cx="120" cy="145" r="28" fill={`url(#gold-cap-${type})`} stroke="#8A6C38" strokeWidth="1.5" />
            <text x="120" y="143" fill="#203A2B" fontSize="14" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="154" fill="#30332D" fontSize="5.5" letterSpacing="1" fontWeight="bold" textAnchor="middle">
              ROYAL EDITION
            </text>
          </g>
        )}

        {/* 8. SPRAY BOTTLE */}
        {type === "spray_bottle" && (
          <g>
            {/* Clear plastic cap */}
            <rect x="100" y="28" width="40" height="35" rx="4" fill="#FFFDF7" opacity="0.4" stroke="#D9B777" strokeWidth="0.8" />
            <rect x="106" y="50" width="28" height="15" fill={`url(#gold-cap-${type})`} />
            
            {/* Tall cylinder body */}
            <rect x="74" y="65" width="92" height="185" rx="12" fill={`url(#olive-glass-${type})`} />
            <rect x="80" y="70" width="8" height="170" rx="4" fill={`url(#specular-${type})`} />

            {/* Label */}
            <rect x="82" y="110" width="76" height="100" rx="4" fill={`url(#cream-label-${type})`} stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="135" fill="#203A2B" fontSize="16" fontWeight="bold" textAnchor="middle">
              رُوح
            </text>
            <text x="120" y="148" fill="#78866B" fontSize="7" letterSpacing="2" textAnchor="middle">
              ROOH
            </text>
            <line x1="94" y1="156" x2="146" y2="156" stroke="#C9A96E" strokeWidth="0.8" />
            <text x="120" y="172" fill="#30332D" fontSize="8" fontWeight="600" textAnchor="middle">
              {productNameAr.slice(0, 16)}
            </text>
            <text x="120" y="186" fill="#C9A96E" fontSize="6" letterSpacing="1" textAnchor="middle">
              BODY MIST • 150 ML
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

