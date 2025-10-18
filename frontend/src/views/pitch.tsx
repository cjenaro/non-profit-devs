import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { ErrorMessage } from '../components/ErrorMessage'
import { Input } from '../components/Input'
import { Title } from '../components/Title'
import { useCreateProject } from '../hooks/use-projects'

export function Pitch() {
  const navigate = useNavigate()
  const [createProject, { loading, error }] = useCreateProject({
    onCompleted(data) {
      if (data.createProject?.project?.id) {
        navigate(`/projects/${data.createProject.project.id}`)
      }
    },
  })

  const { t } = useTranslation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget

    const newProjectInput = {
      name: target.name.value,
      description: target.description.value,
      contactEmail: target.contactEmail.value,
      status: 'PENDING_REVIEW',
    }

    await createProject({
      variables: {
        input: newProjectInput,
      },
    })
  }

  return (
    <section className="bg-lavender text-ember pt-12.5 pb-25 min-h-[calc(100vh-288px)] border-t-5 border-b-5 border-ember md:min-h-[calc(100vh-238px)] md:pb-12.5">
      <div className="container">
        <Title color="var(--lavender)" borderColor="var(--ember)">
          {t('NEW_PROJECT')}
        </Title>
        <p>
          {t(
            'WE_ARE_GLAD_YOU_VE_DECIDED_TO_PITCH_YOUR_PROJECT_TO_US_PLEASE_FILL_IN_THE_FORM_BELOW'
          )}
        </p>
        <form onSubmit={handleSubmit} className="mt-16 mb-4">
          <Input
            inverted
            label={`${t('THE_NAME_OF_YOUR_NGO')}:`}
            name="ongName"
            id="ongName"
          />
          <Input
            inverted
            label={`${t('CONTACT_EMAIL')}:`}
            name="contactEmail"
            id="contactEmail"
          />
          <label
            htmlFor="description"
            className="text-base uppercase w-full block relative mb-4 before:content-[''] before:w-1.25 before:h-full before:bg-ember before:absolute before:top-0 before:-left-4 before:scale-x-0 before:origin-right before:transition-transform before:duration-200 focus-within:before:scale-x-100"
          >
            {t('BRIEF_DESCRIPTION_OF_WEBSITE')}:
            <textarea
              className="px-4 py-2.5 w-[calc(100%-32px)] text-lavender font-hind-madurai mt-1 bg-ember border border-lavender"
              name="description"
              id="description"
              cols={30}
              rows={10}
            ></textarea>
          </label>
          <Button loading={loading}>{t('SUBMIT_PITCH')}</Button>
        </form>
        <ErrorMessage error={error} />
      </div>
    </section>
  )
}
