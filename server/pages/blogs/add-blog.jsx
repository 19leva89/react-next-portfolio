import { RiBloggerLine } from 'react-icons/ri'

import { Blog, DashboardHeader } from '@/components'

export default function AddBlog() {
	return (
		<div className="add-blogs-page">
			<DashboardHeader title="Add" subtitle="Blog" icon={RiBloggerLine} breadcrumb="Addblog" />

			<div className="blogs-add">
				<Blog />
			</div>
		</div>
	)
}
