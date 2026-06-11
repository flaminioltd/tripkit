import React from 'react';
import Svg, { Circle, Rect, Path, G } from 'react-native-svg';

interface PlugIconProps {
  type: string;
  size?: number;
  color?: string;
}

export function PlugIcon({ type, size = 80, color = '#2C3E50' }: PlugIconProps) {
  const SvgBase = ({ children }: { children: React.ReactNode }) => (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="48" fill="#F8F9FA" stroke="#E9ECEF" strokeWidth="2" />
      <Circle cx="50" cy="50" r="38" fill="#FFFFFF" stroke="#DEE2E6" strokeWidth="1" />
      <G fill={color}>{children}</G>
    </Svg>
  );

  switch (type) {
    case 'A':
      return (
        <SvgBase>
          <Rect x="32" y="38" width="6" height="24" rx="1.5" />
          <Rect x="62" y="38" width="6" height="24" rx="1.5" />
        </SvgBase>
      );
    case 'B':
      return (
        <SvgBase>
          <Rect x="32" y="30" width="6" height="24" rx="1.5" />
          <Rect x="62" y="30" width="6" height="24" rx="1.5" />
          <Circle cx="50" cy="70" r="6" />
        </SvgBase>
      );
    case 'C':
      return (
        <SvgBase>
          <Circle cx="32" cy="50" r="7" />
          <Circle cx="68" cy="50" r="7" />
        </SvgBase>
      );
    case 'D':
    case 'M':
      return (
        <SvgBase>
          <Circle cx="50" cy="28" r="9" />
          <Circle cx="30" cy="65" r="7" />
          <Circle cx="70" cy="65" r="7" />
        </SvgBase>
      );
    case 'E':
      return (
        <SvgBase>
          <Circle cx="32" cy="55" r="7" />
          <Circle cx="68" cy="55" r="7" />
          <Circle cx="50" cy="25" r="7" fill="#ADB5BD" stroke="#868E96" strokeWidth="2" />
        </SvgBase>
      );
    case 'F':
      return (
        <SvgBase>
          <Circle cx="32" cy="50" r="7" />
          <Circle cx="68" cy="50" r="7" />
          <Rect x="40" y="12" width="20" height="6" rx="3" fill="#ADB5BD" />
          <Rect x="40" y="82" width="20" height="6" rx="3" fill="#ADB5BD" />
        </SvgBase>
      );
    case 'G':
      return (
        <SvgBase>
          <Rect x="43" y="20" width="14" height="24" rx="2" />
          <Rect x="18" y="55" width="24" height="14" rx="2" />
          <Rect x="58" y="55" width="24" height="14" rx="2" />
        </SvgBase>
      );
    case 'I':
      return (
        <SvgBase>
          <G transform="translate(32, 40) rotate(30)">
            <Rect x="-4" y="-14" width="8" height="28" rx="2" />
          </G>
          <G transform="translate(68, 40) rotate(-30)">
            <Rect x="-4" y="-14" width="8" height="28" rx="2" />
          </G>
          <Rect x="46" y="64" width="8" height="18" rx="2" />
        </SvgBase>
      );
    case 'J':
    case 'N':
    case 'O':
      return (
        <SvgBase>
          <Circle cx="32" cy="55" r="6" />
          <Circle cx="68" cy="55" r="6" />
          <Circle cx="50" cy="35" r="6" />
        </SvgBase>
      );
    case 'K':
      return (
        <SvgBase>
          <Circle cx="32" cy="45" r="7" />
          <Circle cx="68" cy="45" r="7" />
          <Path d="M43 65 a 7 7 0 0 0 14 0 H 43 Z" />
        </SvgBase>
      );
    case 'L':
      return (
        <SvgBase>
          <Circle cx="28" cy="50" r="6" />
          <Circle cx="50" cy="50" r="6" />
          <Circle cx="72" cy="50" r="6" />
        </SvgBase>
      );
    default:
      return (
        <SvgBase>
          <Circle cx="50" cy="50" r="4" />
        </SvgBase>
      );
  }
}
