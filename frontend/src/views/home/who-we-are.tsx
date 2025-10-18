import { Button } from '../../components/Button'
import { useTranslation } from 'react-i18next'
import { Title } from '../../components/Title'

export default function WhoWeAre() {
  const { t } = useTranslation()

  return (
    <section className="bg-lavender text-ember py-10">
      <div className="container">
        <Title color="var(--lavender)" borderColor="var(--ember)">
          {t('WHO_WE_ARE')}
        </Title>
        <p className="text-lg leading-[25px] text-center my-6.25">
          {t(
            'WE_ARE_A_TEAM_OF_DEVELOPERS_AND_DESIGNERS_WORKING_FOR_FREE_FOR_NON_PROFIT_ORGANIZATIONS'
          )}
        </p>
        <div className="flex flex-col md:flex-row">
          <Button
            to="/pitch"
            className="text-xl block mx-auto my-4 max-w-full md:max-w-[45%] bg-transparent"
          >
            {t('PITCH_YOUR_NGOS_WEBSITE')}
          </Button>
          <Button
            to="/signup"
            className="text-xl block mx-auto my-4 max-w-full md:max-w-[45%] bg-transparent"
          >
            {t('JOIN_AS_A_DEVELOPER_DESIGNER')}
          </Button>
        </div>
      </div>
    </section>
  )
}
