import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod/mini'
import { Title } from '../components/Title'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { useUserContext } from '../context/UserContext'
import { useLogin } from '../hooks/use-devs'

const loginSchema = z.object({
  email: z.string().check(z.minLength(1, 'Email is required')).check(z.email('Please enter a valid email address')),
  password: z.string().check(z.minLength(1, 'Password is required')),
})

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {
  const navigate = useNavigate()
  const [, setUser] = useUserContext()
  const { t } = useTranslation()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [login, { loading, error }] = useLogin({
    onCompleted(data) {
      if (data.login?.token) {
        localStorage.setItem('authToken', data.login.token.token)
        setUser({
          email: data.login.user?.email ?? "",
          id: data.login.user?.id ?? "",
          name: data.login.user?.name ?? "",
          skills: data.login.user?.skills ?? [],
          projects: data.login.user?.projects ?? [],
          token: data.login.token.token,
        })
        navigate('/projects')
      }
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    await login({
      variables: {
        input: data,
      },
    })
  }

  return (
    <section className="pt-[50px] pb-[100px] min-h-[calc(100vh-278px)] md:pb-[50px] md:min-h-[calc(100vh-228px)]">
      <div className="container">
        <Title color="var(--background)" borderColor="var(--primary)">
          {t('LOGIN')}
        </Title>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-16 mb-4 space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('LOGIN_EMAIL')}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('LOGIN_PASSWORD')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : t('LOGIN_SUBMIT')}
            </Button>
          </form>
        </Form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  )
}
