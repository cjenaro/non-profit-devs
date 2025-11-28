import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import ProjectItem from '../components/ProjectItem'
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
} from '../components/ui/form'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'
import { useUserContext } from '../context/UserContext'
import type { Skill } from '../generated/graphql'
import { useChangePassword, useUpdateUser } from '../hooks/use-devs'

export function Profile() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [passwordError, setPasswordError] = useState('')
  const [user, setUser] = useUserContext()

  const [updateUser, { error: updateUserError, loading: updateUserLoading }] =
    useUpdateUser()

  const [
    changePassword,
    { error: changePasswordError, loading: changePasswordLoading },
  ] = useChangePassword()

  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      skills: user?.skills || [],
    },
  })

  const passwordForm = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const handleUserUpdate = async (data: {
    name: string
    email: string
    skills: Skill[]
  }) => {
    if (!user) return

    const updateInput = {
      id: user.id,
      name: data.name,
      skills: data.skills,
      email: data.email,
    }

    await updateUser({ variables: { input: updateInput } })
    if (!updateUserError && !updateUserLoading) {
      setUser({
        ...user,
        ...updateInput,
        token: user.token,
      })
    }
  }

  const handlePasswordChange = async (data: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    setPasswordError('')

    if (data.confirmPassword !== data.newPassword) {
      setPasswordError(t('PASSWORDS_DO_NOT_MATCH'))
      return
    }

    if (!user) return

    const updateInput = {
      id: user.id,
      currentPassword: data.oldPassword,
      newPassword: data.newPassword,
    }

    await changePassword({ variables: { input: updateInput } })
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <section className="pt-[50px] pb-[100px] md:pb-[50px]">
      <div className="container space-y-6">
        <Title color="var(--primary)" borderColor="var(--background)">
          {user.name}.
        </Title>

        <p>
          {t('IF_YOU_HAVE_NOT_JOINED_OUR_SLACK_WORKSPACE_YET')}{' '}
          <a
            rel="noopener noreferrer"
            className="text-current"
            href="https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw"
            target="_blank"
          >
            {t('HERE_IS_THE_LINK')}
          </a>
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUserUpdate)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('PROFILE_EMAIL')}:</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('PROFILE_NAME')}:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('PROFILE_SKILLS')}:</FormLabel>
                  <FormControl>
                    <SkillsSelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={updateUserLoading}
              className="w-full"
              variant="outline"
            >
              {t('PROFILE_SUBMIT')}
            </Button>
          </form>
        </Form>
      </div>
      <div className="container">
        <h2 className="text-2xl font-bold mt-8 mb-6">
          {t('PROFILE_CHANGE_PASSWORD')}
        </h2>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordChange)}
            className="space-y-4"
          >
            <FormField
              control={passwordForm.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('PROFILE_OLD_PASSWORD')}:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('PROFILE_NEW_PASSWORD')}:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('PROFILE_CONFIRM_PASSWORD')}:</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={changePasswordLoading}
              className="w-full"
              variant="outline"
            >
              {t('PROFILE_CHANGE_PASSWORD')}
            </Button>
            {(passwordError || changePasswordError) && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>
                  {passwordError || changePasswordError?.message}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
      </div>
      <Separator className="my-8" />
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">{t('YOUR_PROJECTS')}</h2>
        <ul className='space-y-4'>
          {user?.projects && user.projects.length > 0 ? (
            user.projects.map((project) => (
              <li
                key={project.id}
              >
                <ProjectItem project={project} />
              </li>
            ))
          ) : (
            <h1>
              {t('THIS_LOOKS_REALLY_EMPTY')}{' '}
              <Link className="text-current" to="/projects">
                {t('GO_TO_PROJECTS')} &rarr;
              </Link>
            </h1>
          )}
        </ul>
      </div>
    </section>
  )
}
