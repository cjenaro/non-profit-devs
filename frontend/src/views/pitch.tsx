import type React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Title } from '../components/Title'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Spinner } from '../components/ui/spinner'
import { useCreateProject } from '../hooks/use-projects'

export function Pitch() {
  const navigate = useNavigate()
  const [createProject, { loading, error }] = useCreateProject()

  const { t } = useTranslation()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const target = e.currentTarget

    const nameInput = target.elements.namedItem('name') as HTMLInputElement
    const descriptionInput = target.elements.namedItem(
      'description'
    ) as HTMLInputElement
    const contactEmailInput = target.elements.namedItem(
      'contactEmail'
    ) as HTMLInputElement

    const newProjectInput = {
      input: {
        name: nameInput.value,
        description: descriptionInput.value,
        contactEmail: contactEmailInput.value,
        status: 'PENDING_REVIEW',
      },
    }

    const result = await createProject({
      variables: newProjectInput,
    })

    if (result.data?.createProject?.project?.slug) {
      navigate(`/projects/${result.data.createProject.project.slug}`)
    }
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
        <form onSubmit={handleSubmit} className="mt-16 mb-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ongName" className="text-foreground">
              {t('THE_NAME_OF_YOUR_NGO')}:
            </Label>
            <Input name="ongName" id="ongName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-foreground">
              {t('CONTACT_EMAIL')}:
            </Label>
            <Input
              name="contactEmail"
              id="contactEmail"
              type="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              {t('BRIEF_DESCRIPTION_OF_WEBSITE')}:
            </Label>
            <textarea
              className="w-full p-3 border border-input bg-background text-foreground rounded-md resize-none min-h-[120px]"
              name="description"
              id="description"
              cols={30}
              rows={10}
              required
            ></textarea>
          </div>
          <Button type="submit" disabled={loading}>
            {loading && <Spinner className="mr-2 h-4 w-4" />}
            {t('SUBMIT_PITCH')}
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
