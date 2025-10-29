import React, { type ReactNode } from 'react'
import { Darr } from './Darr'

export default function Steps({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  return (
    <div className="border border-lavender space-y-2 p-4">
      {React.Children.map(children, (child, i) => (
        <React.Fragment key={`${id}-child-${i}`}>
          {child}
          <Darr className="mx-auto last:hidden" />
        </React.Fragment>
      ))}
    </div>
  )
}
