import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';

interface CircularSliderProps {
  radius?: number;
  value: number; // 0 to 1439
  onChange: (value: number) => void;
  color?: string;
  trackColor?: string;
}

export function CircularSlider({ 
  radius = 140, 
  value, 
  onChange, 
  color = '#605588', 
  trackColor = '#e0e0e0' 
}: CircularSliderProps) {
  const strokeWidth = 24;
  const center = radius;

  const handleTouch = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    const x = locationX - center;
    const y = locationY - center;
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    const minutes = (angle / (2 * Math.PI)) * 1440;
    onChange(Math.min(Math.max(Math.round(minutes), 0), 1439));
  };

  const angle = (value / 1440) * 2 * Math.PI - Math.PI / 2;
  const handleX = center + (radius - strokeWidth / 2) * Math.cos(angle);
  const handleY = center + (radius - strokeWidth / 2) * Math.sin(angle);

  const hours = Math.floor(value / 60);
  const mins = value % 60;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const displayMins = mins.toString().padStart(2, '0');

  return (
    <View 
      style={{ width: radius * 2, height: radius * 2, alignSelf: 'center', marginVertical: 24 }}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleTouch}
      onResponderMove={handleTouch}
    >
      <Svg width={radius * 2} height={radius * 2}>
        <Circle cx={center} cy={center} r={radius - strokeWidth / 2} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
        
        {/* Draw tick marks */}
        {[0, 6, 12, 18].map(h => {
          const a = (h / 24) * 2 * Math.PI - Math.PI / 2;
          const x1 = center + (radius - strokeWidth) * Math.cos(a);
          const y1 = center + (radius - strokeWidth) * Math.sin(a);
          const x2 = center + (radius) * Math.cos(a);
          const y2 = center + (radius) * Math.sin(a);
          return <Line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth="2" />;
        })}

        <Circle cx={handleX} cy={handleY} r={strokeWidth / 2 + 6} fill={color} />
        <Circle cx={handleX} cy={handleY} r={strokeWidth / 2 - 2} fill="#fff" />
        
        <SvgText x={center} y={center - 10} fontSize="42" fontWeight="bold" fill={color} textAnchor="middle" alignmentBaseline="middle">
          {`${displayHours}:${displayMins}`}
        </SvgText>
        <SvgText x={center} y={center + 24} fontSize="18" fontWeight="bold" fill="#666" textAnchor="middle" alignmentBaseline="middle">
          {ampm}
        </SvgText>
      </Svg>
    </View>
  );
}
