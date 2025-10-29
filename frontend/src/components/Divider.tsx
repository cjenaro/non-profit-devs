interface DividerProps {
  color: string
  backgroundColor: string
  label: string
  className?: string
}

export function Divider({
  color,
  backgroundColor,
  label,
  className = '',
}: DividerProps) {
  return (
    <div className="w-full" style={{ backgroundColor }}>
      <p
        className={`text-center uppercase m-0 mx-auto ${className}`}
        style={{ color }}
      >
        {label}
      </p>
    </div>
  )
}
