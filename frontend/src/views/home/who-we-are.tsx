import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Title } from '../../components/Title'

export default function WhoWeAre() {
  const { t } = useTranslation()

  return (
    <section className="bg-background py-10">
      <div className="container">
        <Card>
          <CardHeader>
            <Title color="var(--foreground)" borderColor="var(--primary)">
              {t('WHO_WE_ARE')}
            </Title>
          </CardHeader>
          <CardContent className="flex flex-col  gap-4">
            <p className="text-lg leading-[25px] text-center">
              {t(
                'WE_ARE_A_TEAM_OF_DEVELOPERS_AND_DESIGNERS_WORKING_FOR_FREE_FOR_NON_PROFIT_ORGANIZATIONS'
              )}
            </p>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Button className="text-xl" asChild>
              <Link to="/pitch">{t('PITCH_YOUR_NGOS_WEBSITE')}</Link>
            </Button>
            <Button className="text-xl" asChild>
              <Link to="/signup">{t('JOIN_AS_A_DEVELOPER_DESIGNER')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
