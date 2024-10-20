import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Project, DashboardHeader, LoginLayout } from '@/components'

export default function AddProject() {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader
					title="Add"
					subtitle="Project"
					icon={RiArrowRightDoubleFill}
					breadcrumb="add project"
				/>

				<div className="contents-add">
					<Project />
				</div>
			</div>
		</LoginLayout>
	)
}
