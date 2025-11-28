import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Title } from '../components/Title'
import { Button } from '../components/ui/button'
import { Spinner } from '../components/ui/spinner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { useUserContext } from '../context/UserContext'
import { GET_PROJECT_QUERY, useAddUserToProject, useGetProject, useRemoveUserFromProject, useUpdateProject } from '../hooks/use-projects'
import { ProjectStatus } from '../generated/graphql'

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
  const [join, { loading: joinLoading }] = useAddUserToProject()
  const [leave, { loading: leaveLoading }] = useRemoveUserFromProject()
  const [updateProject, { loading: updateLoading }] = useUpdateProject()
  const project = projectData?.project

  const isUserInProject = user && project?.users.some((projectUser) => projectUser.id === user.id)

  const handleJoinProject = async () => {
    if (!user) return navigate('/login')
    if (!project) return

    const addUserInput = { id: project.id, userId: user.id }

    await join({ variables: { input: addUserInput } })

    fetchProject()
  }

  const handleLeaveProject = async () => {
    if (!user) return navigate('/login')
    if (!project) return

    const removeUserInput = { id: project.id, userId: user.id }

    await leave({ variables: { input: removeUserInput } })

    fetchProject()
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!project) return

    const updateInput = { id: project.id, status: newStatus }

    await updateProject({
      variables: { input: updateInput },
      update: (cache, { data }) => {
        if (data?.updateProject?.project) {
          cache.writeQuery({
            query: GET_PROJECT_QUERY,
            variables: { id: project.id },
            data: { project: data.updateProject.project },
          })
        }
      },
    })
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
        <Title color="var(--primary)" borderColor="var(--background)">
          {project.name}.
        </Title>
        <p>{project.description}</p>
        {isUserInProject && (
          <div className="mb-4">
            <label htmlFor='status' className="block text-sm font-medium mb-2">Project Status:</label>
            <Select
              name="status"
              value={project.status}
              onValueChange={handleStatusChange}
              disabled={updateLoading}
            >
              <SelectTrigger className="w-[200px] capitalize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ProjectStatus).map((status) => (
                  <SelectItem key={status} value={status} className='capitalize'>
                    {status.toLowerCase().replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
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
          {project.users.map((user) => (
            <li
              key={user.id}
              className="mb-2 py-2 tracking-wider font-bold border-b-2 border-gray-300"
            >
              {user.name}
            </li>
          ))}
        </ul>
        <Button
          onClick={isUserInProject ? handleLeaveProject : handleJoinProject}
          disabled={joinLoading || leaveLoading}
          className="w-full"
        >
          {(joinLoading || leaveLoading) && <Spinner className="mr-2 h-4 w-4" />}
          {isUserInProject ? t('LEAVE_THIS_PROJECT') : t('JOIN_THIS_PROJECT')}
        </Button>
      </div>
    </section>
  )
}
