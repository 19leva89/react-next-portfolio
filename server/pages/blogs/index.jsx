import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { RiArrowRightDoubleFill, RiDeleteBin6Fill } from 'react-icons/ri'

import { useFetchData } from '@/hooks/use-fetch-data'
import { DashboardHeader, DataLoading } from '@/components'

export default function Blogs() {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')

	// fetch blog data
	const { allData, loading } = useFetchData('/api/blogs')

	// handle page change
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// total number of blogs
	const totalBlogs = allData.length

	// filter all data based on search query
	const filteredBlogs =
		searchQuery.trim() === ''
			? allData
			: allData.filter((blog) => blog.title.toLowerCase().includes(searchQuery.toLowerCase()))

	// calculate index of the first blog displayed on the current page
	const indexOfFirstBlog = (currentPage - 1) * perPage
	const indexOfLastBlog = currentPage * perPage

	// get current page of blogs
	const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

	const publishedBlogs = currentBlogs.filter((blog) => blog.status === 'publish')

	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalBlogs / perPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className="content-page">
			<DashboardHeader
				title="All Published"
				subtitle="Blogs"
				icon={RiArrowRightDoubleFill}
				breadcrumb="blogs"
			/>

			<div className="contents-table">
				<div className="flex gap-2 mb-1">
					<h2>Search Blogs:</h2>
					<input
						type="text"
						placeholder="Search by title..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>

				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Image</th>
							<th>Title</th>
							<th>Edit / Delete</th>
						</tr>
					</thead>

					<tbody>
						{loading ? (
							<tr>
								<td colSpan={4}>
									<DataLoading />
								</td>
							</tr>
						) : (
							<>
								{publishedBlogs.length === 0 ? (
									<tr>
										<td colSpan={4} className="text-center">
											No Blogs Found
										</td>
									</tr>
								) : (
									publishedBlogs.map((blog, index) => (
										<tr key={blog._id}>
											<td>{indexOfFirstBlog + index + 1}</td>

											<td>
												<div className="content-image-container">
													<Image
														src={blog.images[0]}
														alt="image"
														width={200}
														height={100}
														layout="responsive"
														objectFit="cover"
													/>
												</div>
											</td>

											<td>
												<h3>{blog.title}</h3>
											</td>

											<td>
												<div className="flex gap-2 flex-center">
													<Link href={`/blogs/edit/${blog._id}`}>
														<button>
															<FaEdit />
														</button>
													</Link>

													<Link href={`/blogs/delete/${blog._id}`}>
														<button>
															<RiDeleteBin6Fill />
														</button>
													</Link>
												</div>
											</td>
										</tr>
									))
								)}
							</>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
