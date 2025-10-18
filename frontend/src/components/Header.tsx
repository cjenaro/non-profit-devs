import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { Button } from './Button'
import Language from './Language'
import { Logo } from './Logo'

interface HeaderProps {
  fixed?: boolean
}

export const Header = ({ fixed }: HeaderProps) => {
  const location = useLocation()
  const isProfile = location.pathname.includes('profile')
  const [user, setUser] = useContext(UserContext)
  const { t } = useTranslation()

  const logout = () => {
    setUser(null)
  }

  const headerClasses = `bg-lavender min-h-16 px-4 flex items-center justify-between ${
    fixed
      ? 'max-[420px]:fixed max-[420px]:bottom-0 max-[420px]:w-full max-[420px]:z-10 max-[420px]:shadow-lg max-[420px]:max-w-[calc(100vw-32px)]'
      : ''
  }`

  return (
    <header className={headerClasses}>
      <Logo to="/" />

      <nav className="py-2.5">
        <Language />
        {!user ? (
          <React.Fragment>
            <Button className="mr-2.5" to="/login">
              {t('HEADER_LOGIN')}
            </Button>
            <Button contained to="/signup">
              {t('HEADER_SIGNUP')}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button
              to={!isProfile ? '/profile' : '/projects'}
              className="mr-2.5"
            >
              {!isProfile ? t('HEADER_PROFILE') : t('HEADER_PROJECTS')}
            </Button>
            <Button contained onClick={logout}>
              {t('HEADER_SIGN_OUT')}
            </Button>
          </React.Fragment>
        )}
      </nav>
    </header>
  )
}
