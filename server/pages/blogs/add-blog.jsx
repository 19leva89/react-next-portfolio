import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Blog, DashboardHeader } from '@/components'

export default function AddBlog() {
	return (
		<div className="add-contents-page">
			<DashboardHeader title="Add" subtitle="Blog" icon={RiArrowRightDoubleFill} breadcrumb="add blog" />

			<div className="contents-add">
				<Blog />
			</div>
		</div>
	)
}
