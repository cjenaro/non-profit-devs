import { type ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Title } from '../components/Title'
import { useUserContext } from '../context/UserContext'
import type { Skill } from '../generated/graphql'
import { useSignup } from '../hooks/use-devs'
import { useGetSkills } from '../hooks/use-skills'

export function Signup() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [error, setError] = useState<any>(null)
  const [loginInput, setLoginInput] = useState({ email: '', password: '' })
  const [skills, setSkills] = useState<Skill[]>([])
  const [user, setUser] = useUserContext()

  const [
    signup,
    { data: signupData, loading: signupLoading, error: signupError },
  ] = useSignup()

  const {
    skills: skillsData,
    loading: skillsLoading,
    error: skillsError,
  } = useGetSkills()

  const handleSkills = (skill: any[]) => {
    setSkills(skill.map((s) => s.value as Skill))
  }

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()

    if (e.target.password.value !== e.target.confirmPassword.value) {
      setError({ message: t('PASSWORDS_DO_NOT_MATCH') })
      return
    }

    const signupInput = {
      email: e.target.email.value,
      password: e.target.password.value,
      name: e.target.name.value,
      skills: skills,
    }

    await signup({
      variables: {
        input: signupInput,
      },
    })
  }

  useEffect(() => {
    if (signupData?.signup?.user) {
      setUser({
        ...signupData.signup.user,
        token: '',
        createdAt: new Date().toISOString(),
        projects: [],
        updatedAt: new Date().toISOString(),
      })
      navigate('/login')
    }
  }, [signupData, setUser])

  useEffect(() => {
    if (user && user.token) {
      navigate('/profile')
    }
  }, [user])

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value })
  }

  return (
    <section className="pt-[50px] pb-[100px] md:pb-[50px] md:min-h-[calc(100vh-228px)]">
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {t('SIGNUP')}
        </Title>

        <form onSubmit={handleFormSubmit} className="mt-16 mb-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('SIGNUP_EMAIL')}:</Label>
            <Input
              name="email"
              id="email"
              type="email"
              value={loginInput.email}
              onChange={handleLoginInput}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t('SIGNUP_NAME')}:</Label>
            <Input name="name" id="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('SIGNUP_PASSWORD')}:</Label>
            <Input
              name="password"
              id="password"
              type="password"
              value={loginInput.password}
              onChange={handleLoginInput}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t('SIGNUP_CONFIRM_PASSWORD')}:
            </Label>
            <Input
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              required
            />
          </div>
          {!skillsLoading && skillsData && (
            <div className="space-y-2">
              <Label>{t('SIGNUP_SKILLS')}:</Label>
              <Select
                onValueChange={(value) => {
                  const selectedSkill = skillsData.find(
                    (skill) => skill.value === value
                  )
                  if (selectedSkill) {
                    handleSkills([selectedSkill])
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('SIGNUP_SKILLS')} />
                </SelectTrigger>
                <SelectContent>
                  {skillsData.map((skill) => (
                    <SelectItem key={skill.value} value={skill.value}>
                      {skill.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Button type="submit" disabled={signupLoading || skillsLoading}>
            {signupLoading || skillsLoading
              ? t('SIGNUP_SUBMIT')
              : t('SIGNUP_SUBMIT')}
          </Button>
        </form>
        {(signupError || skillsError || error) && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>
              {(signupError || skillsError || error)?.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </section>
  )
}
