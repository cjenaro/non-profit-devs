import React from 'react'

interface TitleProps {
  color: string
  borderColor: string
  children: React.ReactNode
}

export function Title({ color, borderColor, children }: TitleProps) {
  return (
    <h3
      className="relative text-[38px] w-max z-10 mx-auto after:content-[''] after:w-full after:h-1.75 after:-bottom-1.5 after:-z-10 after:absolute after:left-0"
      style={{
        color,
        WebkitTextStroke: `1px ${borderColor}`,
      }}
    >
      <span
        className="absolute left-0 bottom-1.5 -z-10 w-full h-1.75"
        style={{
          backgroundColor: borderColor,
        }}
      ></span>
      {children}
    </h3>
  )
}

export default Title
