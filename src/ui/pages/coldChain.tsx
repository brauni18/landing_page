import { ProjectPageTemplate } from '../components/ProjectPageTemplate';

export function ColdChain() {
	return (
		<ProjectPageTemplate
			projectName="ColdChain"
			projectType="Software + IoT"
			techStack={['TypeScript', 'React', 'Python', 'Raspberry Pi', 'AWS']}
			githubUrl="https://github.com/brauni18/cold-chain.git"
		/>
	);
}
