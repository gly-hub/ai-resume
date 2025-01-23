import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface LogoProps extends BoxProps {
  variant?: 'icon' | 'full'
  color?: string
}

export function Logo({ variant = 'full', color = '#2B6CB0', ...props }: LogoProps) {
  return (
    <Box as="svg" 
      viewBox="0 0 200 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* 图形部分：简化的 R + 文档折角 */}
      <g transform={variant === 'icon' ? 'translate(70, 0)' : 'translate(0, 0)'}>
        {/* 文档底部 */}
        <path
          d="M40 10L50 20V45C50 47.7614 47.7614 50 45 50H15C12.2386 50 10 47.7614 10 45V15C10 12.2386 12.2386 10 15 10H40Z"
          fill={color}
          opacity="0.9"
        />
        {/* 文档折角 */}
        <path
          d="M40 10L50 20H45C42.2386 20 40 17.7614 40 15V10Z"
          fill={color}
          opacity="0.7"
        />
        {/* R 字母 */}
        <path
          d="M22 20H28C31.3137 20 34 22.6863 34 26C34 29.3137 31.3137 32 28 32H22V40H26V32L32 40H38L30 30.5C33.0376 29.2089 35 26.2767 35 23C35 19.134 31.866 16 28 16H18V40H22V20Z"
          fill="white"
        />
      </g>

      {/* 文字部分 */}
      {variant === 'full' && (
        <g transform="translate(70, 35)">
          <text
            fill={color}
            fontSize="24"
            fontFamily="system-ui, -apple-system"
            fontWeight="600"
          >
            Resume
          </text>
        </g>
      )}
    </Box>
  )
} 