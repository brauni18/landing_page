import { ProjectPageTemplate } from '../components/ProjectPageTemplate';

export function HomeCloud() {
	return (
		<ProjectPageTemplate
			projectName="HomeCloud"
			projectType="Software Project"
			techStack={['React', 'TypeScript', 'GSAP', 'Node.js', 'MongoDB']}
		/>
	);
}
