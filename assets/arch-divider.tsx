import React from "react";
import { Svg, Path } from "react-native-svg";

interface DividerProps {
  width?: number;
  height?: number;
  color?: string;
}

export function ArchDivider({
  width = 392,
  height = 39,
  color = "#D9D9D9",
}: DividerProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 392 39" fill="none">
      <Path
        d="M392 39H0V0H0.0205078C1.53974 18.8233 88.7007 34 196 34C303.299 34 390.46 18.8233 391.979 0H392V39Z"
        fill={color}
      />
    </Svg>
  );
}
