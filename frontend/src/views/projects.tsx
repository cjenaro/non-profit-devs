import { type ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiSearch } from 'react-icons/fi'
import { Input } from '@/components/ui/input'
import ProjectItem from '../components/ProjectItem'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Spinner } from '../components/ui/spinner'
import useProjects from '../hooks/use-projects'

export function Projects() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const { data, loading, error } = useProjects()

  if (loading) return <Spinner />

  if (error)
    return (
      <Alert variant="destructive">
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const { projects } = data || {}

  return (
    <section className="pt-[50px] pb-[100px] md:min-h-[calc(100vh-228px)] md:pb-[50px]">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <FiSearch className="size-4" />
          <Input
            value={search}
            onChange={handleSearch}
            placeholder={t('FILTER_PROJECTS_BY_NAME')}
          />
        </div>
        <ul>
          {projects && projects.length > 0 ? (
            projects
              .filter((project) =>
                project.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((project) => (
                <li
                  key={project.id}
                  className="border-2 border-lavender mb-4 scale-100 transition-transform duration-100 ease-in-out hover:scale-101"
                >
                  <ProjectItem project={project} />
                </li>
              ))
          ) : (
            <h1>{t('LOOKS_LIKE_THERE_ARE_NO_PROJECTS_HERE_YET')}</h1>
          )}
        </ul>
      </div>
    </section>
  )
}
