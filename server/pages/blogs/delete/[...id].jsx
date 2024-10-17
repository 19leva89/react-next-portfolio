import axios from 'axios'
import Head from 'next/head'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { TbTrashX } from 'react-icons/tb'
import { useState, useEffect } from 'react'
import { RiBloggerLine } from 'react-icons/ri'

export default function DeleteProduct() {
	const router = useRouter()

	const { id } = router.query

	const [productInfo, setProductInfo] = useState(null)

	const goBack = () => {
		router.push('/blogs')
	}

	const deleteProduct = async () => {
		try {
			await axios.delete(`/api/blogs?id=${id}`)

			toast.success('Blog deleted successfully')

			goBack()
		} catch (error) {
			console.error('Ошибка при удалении:', error)
		}
	}

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
				<title>Delete Blog</title>
			</Head>

			<div className="blog-page">
				<div className="title-dashboard flex flex-sb">
					<div>
						<h2>
							Delete <span>{productInfo?.title}</span>
						</h2>
						<h3>ADMIN PANEL</h3>
					</div>

					<div className="breadcrumb">
						<RiBloggerLine /> <span>/</span> <span>Delete Blog</span>
					</div>
				</div>

				<div className="delete-sec flex flex-center wh_100">
					<div className="delete-card">
						<TbTrashX size={60} color="red" />

						<p className="cookie-heading">Are you sure?</p>

						<p className="cookie-description">
							If you delete this website content, it will be permanent delete your content
						</p>

						<div className="button-container">
							<button onClick={deleteProduct} className="accept-button">
								Delete
							</button>

							<button onClick={goBack} className="decline-button">
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
