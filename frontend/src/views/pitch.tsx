import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod/mini";
import { Title } from "../components/Title";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useCreateProject } from "../hooks/use-projects";

const pitchSchema = z.object({
	name: z
		.string()
		.check(z.minLength(1, "NGO name is required")),
	contactEmail: z
		.string()
		.check(z.email("Please enter a valid email address")),
	description: z
		.string()
		.check(z.minLength(1, "Description is required"))
		.check(z.minLength(10, "Description must be at least 10 characters")),
});

type PitchFormData = z.infer<typeof pitchSchema>;

export function Pitch() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [createProject, { loading, error }] = useCreateProject();

	const form = useForm<PitchFormData>({
		resolver: zodResolver(pitchSchema),
		defaultValues: {
			name: "",
			contactEmail: "",
			description: "",
		},
	});

	const handleSubmit = async (data: PitchFormData) => {
		const newProjectInput = {
			input: {
				name: data.name,
				description: data.description,
				contactEmail: data.contactEmail,
				status: "PENDING_REVIEW",
			},
		};

		const result = await createProject({
			variables: newProjectInput,
		});

		if (result.data?.createProject?.project?.id) {
			navigate(`/projects/${result.data.createProject.project.id}`);
		}
	};

	return (
		<section className="pt-[50px] pb-[100px] md:pb-[50px]">
			<div className="container">
				<Title color="var(--primary)" borderColor="var(--background)">
					{t("NEW_PROJECT")}
				</Title>
				<p>
					{t(
						"WE_ARE_GLAD_YOU_VE_DECIDED_TO_PITCH_YOUR_PROJECT_TO_US_PLEASE_FILL_IN_THE_FORM_BELOW",
					)}
				</p>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="mt-16 mb-4 space-y-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("THE_NAME_OF_YOUR_NGO")}:</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="contactEmail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("CONTACT_EMAIL")}:</FormLabel>
									<FormControl>
										<Input {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t("BRIEF_DESCRIPTION_OF_WEBSITE")}:</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className="min-h-[120px] resize-none"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={loading}
							className="mt-10 w-full"
							variant="outline"
						>
							{t("SUBMIT_PITCH")}
						</Button>
					</form>
				</Form>
				{error && (
					<Alert variant="destructive" className="mt-4">
						<AlertDescription>{error.message}</AlertDescription>
					</Alert>
				)}
			</div>
		</section>
	);
}
