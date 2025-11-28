import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
 import { z } from 'zod'
import { SkillsSelector } from '../components/SkillsSelector'
import { Title } from '../components/Title'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { useUserContext } from '../context/UserContext'
import { useSignup } from '../hooks/use-devs'

export function Signup() {
  const navigate = useNavigate()
  const [, setUser] = useUserContext()
  const { t } = useTranslation()

  const signupSchema = z
    .object({
      email: z
        .string()
        .check(z.minLength(1, t('Email is required')))
        .check(z.email(t('Please enter a valid email address'))),
      name: z.string().check(z.minLength(1, t('Name is required'))),
      password: z.string().check(z.minLength(1, t('Password is required'))),
      confirmPassword: z
        .string()
        .check(z.minLength(1, t('Confirm password is required'))),
       skills: z.array(z.string()),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('PASSWORDS_DO_NOT_MATCH'),
      path: ['confirmPassword'],
    })

  type SignupFormData = z.infer<typeof signupSchema>

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  })

  const [signup, { loading, error }] = useSignup({
    onCompleted(data) {
      if (data.signup?.user) {
         setUser({
           ...data.signup.user,
           token: '',
           projects: [],
         })
        navigate('/login')
      }
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    await signup({
      variables: {
        input: {
          email: data.email,
          password: data.password,
          name: data.name,
           skills: data.skills as any,
        },
      },
    })
  }

  return (
    <section className="pt-[50px] pb-[100px] min-h-[calc(100vh-278px)] md:pb-[50px] md:min-h-[calc(100vh-228px)]">
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {t('SIGNUP')}
        </Title>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-16 mb-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('SIGNUP_EMAIL')}</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('SIGNUP_NAME')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>{t('SIGNUP_PASSWORD')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('SIGNUP_CONFIRM_PASSWORD')}</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('SIGNUP_SKILLS')}</FormLabel>
                  <FormControl>
                     <SkillsSelector
                       value={field.value as any || []}
                       onChange={field.onChange}
                     />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : t('SIGNUP_SUBMIT')}
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
