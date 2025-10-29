import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { ErrorMessage } from '../components/ErrorMessage'
import { Input } from '../components/Input'
import ProjectItem from '../components/ProjectItem'
import Select from '../components/Select'
import { Title } from '../components/Title'
import { useUserContext } from '../context/UserContext'
import type { Skill } from '../generated/graphql'
import { useChangePassword, useUpdateUser } from '../hooks/use-devs'
import { useGetSkills } from '../hooks/use-skills'

export function Profile() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [passwordError, setPasswordError] = useState('')
  const [user, setUser] = useUserContext()
  const [skill, setSkill] = useState<Skill[]>(user?.skills || [])

  const [updateUser, { error: updateUserError, loading: updateUserLoading }] =
    useUpdateUser()

  const [
    changePassword,
    { error: changePasswordError, loading: changePasswordLoading },
  ] = useChangePassword()

  const { skills: skillsData } = useGetSkills()

  const handleUserUpdate = async (e: any) => {
    e.preventDefault()

    if (!user) return

    const updateInput = {
      id: user.id,
      name: e.target.name.value || user.name,
      skills: skill,
      email: e.target.email.value || user.email,
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

  const handlePasswordChange = async (e: any) => {
    e.preventDefault()
    setPasswordError('')

    if (e.target.confirmPassword.value !== e.target.newPassword.value) {
      setPasswordError(t('PASSWORDS_DO_NOT_MATCH'))
      return
    }

    if (!user) return

    const updateInput = {
      id: user.id,
      currentPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    }

    await changePassword({ variables: { input: updateInput } })
  }

  const handleSkills = (skill: any[]) => {
    setSkill(skill?.map((s) => s.value as Skill))
  }

  const getSkillLabel = (value: Skill) => {
    return value
      .split('_')
      .map((word) => `${word[0]}${word.slice(1).toLowerCase()}`)
      .join(' ')
  }

  const getInitialSkills = () => {
    return user?.skills?.length
      ? user.skills.map((value: Skill) => ({
          label: getSkillLabel(value),
          value,
        }))
      : []
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <section className="pt-[50px] pb-[100px] md:pb-[50px]">
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
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
        <form onSubmit={handleUserUpdate}>
          <Input
            label={`${t('PROFILE_EMAIL')}:`}
            placeholder={user?.email}
            name="email"
            id="email"
          />
          <Input
            label={`${t('PROFILE_NAME')}:`}
            name="name"
            placeholder={user?.name}
            id="name"
            className="mt-4"
          />
          {skillsData && (
            <Select
              styles="mt-4"
              initialSelectedItems={getInitialSkills()}
              placeholder={`${t('PROFILE_SKILLS')}:`}
              label={`${t('PROFILE_SKILLS')}:`}
              onChange={handleSkills}
              options={skillsData}
            />
          )}
          <Button
            loading={updateUserLoading}
            className="mt-10 w-full border border-lavender text-lavender bg-ember"
          >
            {t('PROFILE_SUBMIT')}
          </Button>
        </form>
      </div>
      <Divider
        color="var(--ember)"
        backgroundColor="var(--lavender)"
        label={t('PROFILE_CHANGE_PASSWORD')}
        className="mt-12.5 mb-7.5"
      />
      <div className="container">
        <form onSubmit={handlePasswordChange}>
          <Input
            className="mt-4"
            type="password"
            label={`${t('PROFILE_OLD_PASSWORD')}:`}
            name="oldPassword"
            id="oldPassword"
          />
          <Input
            className="mt-4"
            type="password"
            label={`${t('PROFILE_NEW_PASSWORD')}:`}
            name="newPassword"
            id="newPassword"
          />
          <Input
            className="mt-4"
            type="password"
            label={`${t('PROFILE_CONFIRM_PASSWORD')}:`}
            name="confirmPassword"
            id="confirmPassword"
          />
          <Button
            loading={changePasswordLoading}
            className="mt-10 w-full border border-lavender text-lavender bg-ember"
          >
            {t('PROFILE_CHANGE_PASSWORD')}
          </Button>
          <ErrorMessage error={passwordError || changePasswordError} />
        </form>
      </div>
      <Divider
        color="var(--ember)"
        backgroundColor="var(--lavender)"
        label={t('YOUR_PROJECTS')}
        className="mt-12.5 mb-7.5"
      />
      <div className="container">
        <ul>
          {user?.projects && user.projects.length > 0 ? (
            user.projects.map((project: any) => (
              <li
                className="mb-[45px] min-h-[17px] border-4 border-lavender"
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
