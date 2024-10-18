import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Shop, DashboardHeader } from '@/components'

export default function AddProduct() {
	return (
		<div className="add-contents-page">
			<DashboardHeader
				title="Add"
				subtitle="Product"
				icon={RiArrowRightDoubleFill}
				breadcrumb="add product"
			/>

			<div className="contents-add">
				<Shop />
			</div>
		</div>
	)
}
