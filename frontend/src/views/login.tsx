import type React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Title } from '../components/Title'
import { useUserContext } from '../context/UserContext'
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

  const [user, setUser] = useUserContext()
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

        <form onSubmit={handleFormSubmit} className="mt-16 mb-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('LOGIN_EMAIL')}:</Label>
            <Input name="email" id="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('LOGIN_PASSWORD')}:</Label>
            <Input name="password" id="password" type="password" required />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? t('LOGIN_SUBMIT') : t('LOGIN_SUBMIT')}
          </Button>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  )
}
