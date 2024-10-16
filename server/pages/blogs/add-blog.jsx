import { RiBloggerLine } from 'react-icons/ri'

import { Blog } from '@/components'

export default function AddBlog() {
	return (
		<div className="add-blogs-page">
			<div className="title-dashboard flex flex-sb">
				<div>
					<h2>
						Add <span>Blog</span>
					</h2>

					<h3>ADMIN PANEL</h3>
				</div>

				<div className="breadcrumb">
					<RiBloggerLine /> <span>/</span> <span>Addblog</span>
				</div>
			</div>

			<div className="blogs-add">
				<Blog />
			</div>
		</div>
	)
}
