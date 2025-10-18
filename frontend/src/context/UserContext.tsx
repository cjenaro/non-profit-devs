import type React from 'react'
import { createContext, type ReactNode, useState } from 'react'

interface User {
  id: string
  email: string
  token: string
  // Add other user properties as needed
}

type UserContextType = [User | null, (user: User | null) => void]

export const UserContext = createContext<UserContextType | undefined>(undefined)

const LocalStateProvider = UserContext.Provider

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <LocalStateProvider value={[user, setUser]}>{children}</LocalStateProvider>
  )
}
