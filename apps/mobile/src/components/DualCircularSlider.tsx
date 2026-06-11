import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Text as SvgText, G } from 'react-native-svg';

interface DualCircularSliderProps {
  radius?: number;
  hours: number; // 0 to 23
  minutes: number; // 0 to 59
  onHoursChange: (h: number) => void;
  onMinutesChange: (m: number) => void;
  color?: string;
  trackColor?: string;
  is24h: boolean;
}

export function DualCircularSlider({ 
  radius = 150, 
  hours,
  minutes,
  onHoursChange, 
  onMinutesChange,
  color = '#605588', 
  trackColor = '#e0e0e0',
  is24h
}: DualCircularSliderProps) {
  const strokeWidth = 24;
  const center = radius;
  const innerRadius = radius - 50; // Inner circle for minutes

  const handleTouch = (e: any, isHours: boolean) => {
    const { locationX, locationY } = e.nativeEvent;
    const x = locationX - center;
    const y = locationY - center;
    let angle = Math.atan2(y, x) + Math.PI / 2;
    if (angle < 0) angle += 2 * Math.PI;
    
    if (isHours) {
      // 0 to 23
      const h = Math.round((angle / (2 * Math.PI)) * 24);
      onHoursChange(h === 24 ? 0 : h);
    } else {
      // 0 to 59
      const m = Math.round((angle / (2 * Math.PI)) * 60);
      onMinutesChange(m === 60 ? 0 : m);
    }
  };

  // Ensure touch logic goes to the correct track
  const handleGlobalTouch = (e: any) => {
    const { locationX, locationY } = e.nativeEvent;
    const dist = Math.sqrt(Math.pow(locationX - center, 2) + Math.pow(locationY - center, 2));
    
    // Threshold between outer and inner circle
    const threshold = innerRadius + (radius - innerRadius) / 2;
    
    if (dist > threshold) {
      handleTouch(e, true);
    } else {
      handleTouch(e, false);
    }
  };

  const hourAngle = (hours / 24) * 2 * Math.PI - Math.PI / 2;
  const hHandleX = center + (radius - strokeWidth / 2) * Math.cos(hourAngle);
  const hHandleY = center + (radius - strokeWidth / 2) * Math.sin(hourAngle);

  const minAngle = (minutes / 60) * 2 * Math.PI - Math.PI / 2;
  const mHandleX = center + (innerRadius - strokeWidth / 2) * Math.cos(minAngle);
  const mHandleY = center + (innerRadius - strokeWidth / 2) * Math.sin(minAngle);

  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = is24h ? hours.toString().padStart(2, '0') : (hours % 12 === 0 ? 12 : hours % 12);
  const displayMins = minutes.toString().padStart(2, '0');

  return (
    <View 
      style={{ width: radius * 2, height: radius * 2, alignSelf: 'center', marginVertical: 24 }}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handleGlobalTouch}
      onResponderMove={handleGlobalTouch}
    >
      <Svg width={radius * 2} height={radius * 2}>
        {/* Outer track (Hours) */}
        <Circle cx={center} cy={center} r={radius - strokeWidth / 2} stroke={trackColor} strokeWidth={strokeWidth} fill="none" />
        {/* Inner track (Minutes) */}
        <Circle cx={center} cy={center} r={innerRadius - strokeWidth / 2} stroke={trackColor} strokeWidth={strokeWidth} fill="none" opacity={0.5} />
        
        {/* Hour tick marks */}
        {[0, 6, 12, 18].map(h => {
          const a = (h / 24) * 2 * Math.PI - Math.PI / 2;
          const x1 = center + (radius - strokeWidth + 4) * Math.cos(a);
          const y1 = center + (radius - strokeWidth + 4) * Math.sin(a);
          const x2 = center + (radius - 4) * Math.cos(a);
          const y2 = center + (radius - 4) * Math.sin(a);
          return <Line key={`h${h}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth="2" />;
        })}

        {/* Minute tick marks */}
        {[0, 15, 30, 45].map(m => {
          const a = (m / 60) * 2 * Math.PI - Math.PI / 2;
          const x1 = center + (innerRadius - strokeWidth + 4) * Math.cos(a);
          const y1 = center + (innerRadius - strokeWidth + 4) * Math.sin(a);
          const x2 = center + (innerRadius - 4) * Math.cos(a);
          const y2 = center + (innerRadius - 4) * Math.sin(a);
          return <Line key={`m${m}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#999" strokeWidth="2" />;
        })}

        {/* Hour Handle */}
        <Circle cx={hHandleX} cy={hHandleY} r={strokeWidth / 2 + 6} fill={color} />
        <Circle cx={hHandleX} cy={hHandleY} r={strokeWidth / 2 - 2} fill="#fff" />
        <SvgText x={hHandleX} y={hHandleY + 4} fontSize="12" fontWeight="bold" fill={color} textAnchor="middle">H</SvgText>

        {/* Minute Handle */}
        <Circle cx={mHandleX} cy={mHandleY} r={strokeWidth / 2 + 4} fill={color} opacity={0.8} />
        <Circle cx={mHandleX} cy={mHandleY} r={strokeWidth / 2 - 2} fill="#fff" />
        <SvgText x={mHandleX} y={mHandleY + 4} fontSize="12" fontWeight="bold" fill={color} textAnchor="middle">M</SvgText>
        
        {/* Center Text */}
        <SvgText x={center} y={center - 10} fontSize="42" fontWeight="bold" fill={color} textAnchor="middle" alignmentBaseline="middle">
          {`${displayHours}:${displayMins}`}
        </SvgText>
        {!is24h && (
          <SvgText x={center} y={center + 24} fontSize="18" fontWeight="bold" fill="#666" textAnchor="middle" alignmentBaseline="middle">
            {ampm}
          </SvgText>
        )}
      </Svg>
    </View>
  );
}
