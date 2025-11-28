import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useUserContext } from '../context/UserContext'
import Language from './Language'
import { Logo } from './Logo'

interface HeaderProps {
  fixed?: boolean
}

export const Header = ({ fixed }: HeaderProps) => {
  const location = useLocation()
  const isProfile = location.pathname.includes('profile')
  const [user, setUser] = useUserContext()
  const { t } = useTranslation()

  const logout = () => {
    setUser(null)
  }

  const headerClasses = `bg-secondary min-h-16 px-4 flex items-center justify-between ${
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
            <Button className="mr-2.5" variant="outline" asChild>
              <Link to="/login">{t('HEADER_LOGIN')}</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/signup">{t('HEADER_SIGNUP')}</Link>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button variant="outline" className="mr-2.5" asChild>
              <Link to={!isProfile ? '/profile' : '/projects'}>
                {!isProfile ? t('HEADER_PROFILE') : t('HEADER_PROJECTS')}
              </Link>
            </Button>
            <Button variant="default" onClick={logout}>
              {t('HEADER_SIGN_OUT')}
            </Button>
          </React.Fragment>
        )}
      </nav>
    </header>
  )
}
