import React from 'react';

const height = 35;
const padding = 5
const fontSize = height - 2 * padding;
const promptWidth = height * 0.5;
const promptHeight = fontSize;

export default function Logo({ fill }) {
  return (
  <svg height={height} width="250">
    <path d={`M${padding} ${padding} l${promptWidth} ${promptHeight / 2} l${-promptWidth} ${promptHeight / 2}`} fill="none" stroke={fill} strokeWidth="1.5px"></path>
    <text x={promptWidth + padding * 2} y={fontSize + padding} fill={fill} style={{fontSize: `${fontSize}px`}}>McHone.dev</text>
  </svg>
  );
}
