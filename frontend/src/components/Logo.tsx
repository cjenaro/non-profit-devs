import type React from 'react'
import { Link } from 'react-router-dom'

interface LogoProps {
  to: string
}

export const Logo: React.FC<LogoProps> = ({ to }) => (
  <Link
    to={to}
    className="no-underline border border-ember max-w-[55px] px-[7px] py-[5px] block"
  >
    <span className="whitespace-nowrap font-bold text-sm text-ember uppercase tracking-[0.5px]">
      Non Profit Devs
    </span>
  </Link>
)
