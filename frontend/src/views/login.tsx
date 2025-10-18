import type React from 'react'
import { useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { ErrorMessage } from '../components/ErrorMessage'
import { Input } from '../components/Input'
import { Title } from '../components/Title'
import { UserContext } from '../context/UserContext'
import { useLogin } from '../hooks/use-devs'

export function Login() {
  const navigate = useNavigate()
  const [login, { loading, error }] = useLogin({
    onCompleted(data: any) {
      if (data.login.token) {
        localStorage.setItem('authToken', data.login.token.token)
        setUser({ ...data.login.token, ...data.login.user })
      }
    },
  })

  const [user, setUser] = useContext(UserContext)
  const { t } = useTranslation()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login({
      variables: {
        input: {
          email: (e.target as any).email.value,
          password: (e.target as any).password.value,
        },
      },
    })
  }

  useEffect(() => {
    if (user && user.token) {
      navigate('/projects')
    }
  }, [user])

  return (
    <section className="pt-[50px] pb-[100px] min-h-[calc(100vh-278px)] md:pb-[50px] md:min-h-[calc(100vh-228px)]">
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {t('LOGIN')}
        </Title>

        <form onSubmit={handleFormSubmit} className="mt-16 mb-4">
          <Input
            className="mb-4"
            label={`${t('LOGIN_EMAIL')}:`}
            name="email"
            id="email"
          />
          <Input
            className="mb-4"
            label={`${t('LOGIN_PASSWORD')}:`}
            name="password"
            type="password"
            id="password"
          />
          <Button loading={loading}>{t('LOGIN_SUBMIT')}</Button>
        </form>
        <ErrorMessage error={error} />
      </div>
    </section>
  )
}
