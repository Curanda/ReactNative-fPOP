import Svg, { Path, G } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

interface SvgRefreshProps extends SvgProps {
  stroke?: string;
  strokeWidth?: number;
}

export default function SvgRefresh({
  width = 24,
  height = 24,
  stroke = '#F1C177',
  strokeWidth = 2,
  ...props
}: SvgRefreshProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <G>
        <Path
          d="M3 3V8M3 8H8M3 8L6 5.29168C7.59227 3.86656 9.69494 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.71683 21 4.13247 18.008 3.22302 14"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
