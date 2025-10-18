import type React from 'react'
import { createContext, useContext, type ReactNode, useState } from 'react'
import type { User } from '../generated/graphql'

interface UserWithToken extends User {
  token: string
}

type UserContextType = [
  UserWithToken | null,
  (user: UserWithToken | null) => void,
]

export const UserContext = createContext<UserContextType | undefined>(undefined)

const LocalStateProvider = UserContext.Provider

interface UserProviderProps {
  children: ReactNode
}

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserWithToken | null>(null)

  return (
    <LocalStateProvider value={[user, setUser]}>{children}</LocalStateProvider>
  )
}
