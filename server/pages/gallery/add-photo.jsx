import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Photo, DashboardHeader, LoginLayout } from '@/components'

export default function AddPhoto() {
	return (
		<LoginLayout>
			<div className="add-contents-page">
				<DashboardHeader title="Add" subtitle="Photo" icon={RiArrowRightDoubleFill} breadcrumb="add photo" />

				<div className="contents-add">
					<Photo />
				</div>
			</div>
		</LoginLayout>
	)
}
