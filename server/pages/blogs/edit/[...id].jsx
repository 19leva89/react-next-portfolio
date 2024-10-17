import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { RiBloggerLine } from 'react-icons/ri'

import { Blog, DashboardHeader } from '@/components'

export default function EditProduct() {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState(null)

	useEffect(() => {
		if (!id) {
			return
		}

		const fetchProduct = async () => {
			try {
				const res = await axios.get(`/api/blogs?id=${id}`)

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
				<title>Update Blog</title>
			</Head>

			<div className="blog-page">
				<DashboardHeader
					title="Edit"
					subtitle={productInfo?.title}
					icon={RiBloggerLine}
					breadcrumb="Edit Blog"
				/>

				<div className="mt-3">{productInfo && <Blog {...productInfo} />}</div>
			</div>
		</>
	)
}
