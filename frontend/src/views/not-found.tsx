import { Button } from '../components/Button'
import { useTranslation } from 'react-i18next'

export function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="h-[calc(100vh-32rem)] flex items-center justify-center flex-col">
      <div className="container">
        <h1 className="mt-0 mb-[30px] text-4xl">
          {t('OOPS_THE_PAGE_YOU_ARE_TRYING_TO_ACCESS_DOES_NOT_EXIST')}
        </h1>
        <Button to="/">&larr; {t('GO_BACK_TO_HOME')}</Button>
      </div>
    </section>
  )
}
