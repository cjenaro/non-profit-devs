import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Spinner } from '../components/ui/spinner'
import { Title } from '../components/Title'
import { useUserContext } from '../context/UserContext'
import { useAddUserToProject, useGetProject } from '../hooks/use-projects'

export function Project() {
  const params = useParams()
  const navigate = useNavigate()
  const id = params.id
  const { t } = useTranslation()
  const [user] = useUserContext()
  const {
    data: projectData,
    loading: projectLoading,
    refetch: fetchProject,
  } = useGetProject(id || '')
  const [join, { loading }] = useAddUserToProject()
  const project = projectData?.project

  const handleJoinProject = async () => {
    if (!user) return navigate('/login')
    if (!project) return

    const addUserInput = { id: project.id, userId: user.id }

    await join({ variables: { input: addUserInput } })

    fetchProject()
  }

  if (projectLoading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-278px)]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  if (!project) return null

  return (
    <section className="pt-[50px] pb-[100px] min-h-[calc(100vh-278px)] md:pb-[50px] md:min-h-[calc(100vh-228px)]">
      <div className="container">
        <Title color="var(--ember)" borderColor="var(--lavender)">
          {project.name}.
        </Title>
        <p>{project.description}</p>
        {user && (
          <p>
            {t('JOIN_THE_NON_PROFIT_CHANNEL_ON_OUR_SLACK', {
              channel: `
                  #non-profit-${project.name
                    .split(' ')
                    .join('-')
                    .replace(/'/g, '')
                    .toLowerCase()}
              `,
            })}
            <a
              rel="noopener noreferrer"
              className="text-current"
              href="https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw"
              target="_blank"
            >
              slack
            </a>
          </p>
        )}
        <ul className="border-4 border-lavender p-5 mb-10">
          <li className="mb-2 py-2 tracking-wider font-bold border-b-2 border-gray-300">
            {t('VOLUNTEERS_ON_THIS_PROJECT')}:
          </li>
          {project.users.map((user: any) => (
            <li
              key={user.id}
              className="mb-2 py-2 tracking-wider font-bold border-b-2 border-gray-300"
            >
              {user.name}
            </li>
          ))}
        </ul>
        <Button
          onClick={handleJoinProject}
          disabled={loading}
          className="w-full"
        >
          {loading && <Spinner className="mr-2 h-4 w-4" />}
          {t('JOIN_THIS_PROJECT')}
        </Button>
      </div>
    </section>
  )
}
