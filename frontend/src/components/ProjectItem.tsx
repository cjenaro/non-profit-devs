import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface User {
  id: string;
  gravatar?: string;
  name: string;
}

interface Project {
  id: string;
  name: string;
  createdAt: string;
  status: string;
  users?: User[];
}

export default function ProjectItem({ project }: { project: Project }) {
  const { t } = useTranslation();
  if (!project) return null;

  return (
    <Link
      to={`/projects/${project.id}`}
      state={{ ...project }}
      className="no-underline flex items-center justify-between p-4 text-lavender"
    >
      <div>
        <h2 className="m-0 text-3xl">
          {project.name}
        </h2>
        <div className="flex items-center mt-1 mb-2 flex-wrap">
          <p className="text-sm opacity-70 mt-0 mb-0 uppercase">
            <span className="tracking-wider">
              {t('PROJECT_ITEM_CREATED')}:
            </span>{' '}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
          <p className="text-sm opacity-70 mt-0 mb-0 capitalize md:ml-2.5">
            <span className="tracking-wider uppercase">
              {t('PROJECT_ITEM_STATUS')}:
            </span>{' '}
            {project.status
              .split('_')
              .map((word: string) => word.toLowerCase())
              .join(' ')}
          </p>
        </div>
        <ul className="flex">
          {project.users &&
            project.users.map((user: User) => (
              <li
                key={user.id}
                className="mr-1.25"
              >
                <div className="w-6 h-6 flex items-center justify-center bg-lavender text-ember rounded-full font-bold">
                  {user.gravatar ? (
                    <img
                      src={user.gravatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    user.name
                      .split(' ')
                      .map((word: string) => word[0])
                      .join('')
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
      <p className="m-0 text-3xl">
        &rarr;
      </p>
    </Link>
  );
}
