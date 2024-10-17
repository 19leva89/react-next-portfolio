import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { RiBloggerLine } from 'react-icons/ri'

import { Blog } from '@/components'

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
				console.error('Ошибка при загрузке данных:', error)
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
				<div className="title-dashboard flex flex-sb">
					<div>
						<h2>
							Edit <span>{productInfo?.title}</span>
						</h2>
						<h3>ADMIN PANEL</h3>
					</div>

					<div className="breadcrumb">
						<RiBloggerLine /> <span>/</span> <span>Edit Blog</span>
					</div>
				</div>

				<div className="mt-3">{productInfo && <Blog {...productInfo} />}</div>
			</div>
		</>
	)
}
