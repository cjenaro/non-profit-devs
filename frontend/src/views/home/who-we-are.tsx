import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Title } from "../../components/Title";
import { useTranslation } from "react-i18next";

export default function WhoWeAre() {
	const { t } = useTranslation();

	return (
		<section className="bg-lavender text-ember py-10">
			<div className="container">
				<Title color="var(--lavender)" borderColor="var(--ember)">
					{t("WHO_WE_ARE")}
				</Title>
				<p className="text-lg leading-[25px] text-center my-6.25">
					{t(
						"WE_ARE_A_TEAM_OF_DEVELOPERS_AND_DESIGNERS_WORKING_FOR_FREE_FOR_NON_PROFIT_ORGANIZATIONS",
					)}
				</p>
				<div className="flex flex-col md:flex-row">
					<Button className="text-xl" asChild>
						<Link to="/pitch">{t("PITCH_YOUR_NGOS_WEBSITE")}</Link>
					</Button>
					<Button className="text-xl" asChild>
						<Link to="/signup">{t("JOIN_AS_A_DEVELOPER_DESIGNER")}</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
