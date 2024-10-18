import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { RiArrowRightDoubleFill } from 'react-icons/ri'

import { Project, DashboardHeader } from '@/components'

export default function EditProject() {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/projects?id=${id}`)

				setProductInfo(res.data)
			} catch (error) {
				console.error('Data boot error:', error)
			}
		}

		fetchProduct()
	}, [id])

	return (
		<>
			<Head>
				<title>Update Project</title>
			</Head>

			<div className="content-page">
				<DashboardHeader
					title="Edit"
					subtitle={productInfo?.title}
					icon={RiArrowRightDoubleFill}
					breadcrumb="edit project"
				/>

				<div className="mt-3">{productInfo && <Project {...productInfo} />}</div>
			</div>
		</>
	)
}