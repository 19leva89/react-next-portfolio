import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { RiArrowRightDoubleFill, RiDeleteBin6Fill } from 'react-icons/ri'

import { useFetchData } from '@/hooks/use-fetch-data'
import { DashboardHeader, DataLoading, LoginLayout, Pagination } from '@/components'

export default function Gallery() {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')

	// fetch content data
	const { allData, loading } = useFetchData('/api/photos')

	// handle page change
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// filter all data based on search query
	const filteredContent =
		searchQuery.trim() === ''
			? allData
			: allData.filter((content) => content.title.toLowerCase().includes(searchQuery.toLowerCase()))

	// total pages
	const totalPages = Math.ceil(filteredContent.length / perPage)

	// calculate index of the first content displayed on the current page
	const indexOfFirstContent = (currentPage - 1) * perPage
	const indexOfLastContent = currentPage * perPage

	// get current page of content
	const publishedContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	return (
		<LoginLayout>
			<div className="content-page">
				<DashboardHeader
					title="All Published"
					subtitle="Photos"
					icon={RiArrowRightDoubleFill}
					breadcrumb="photos"
				/>

				<div className="contents-table">
					<div className="flex gap-2 mb-1">
						<h2>Search Photos:</h2>
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
									{publishedContent.length === 0 ? (
										<tr>
											<td colSpan={4} className="text-center">
												No Photos Found
											</td>
										</tr>
									) : (
										publishedContent.map((content, index) => (
											<tr key={content._id}>
												<td>{indexOfFirstContent + index + 1}</td>

												<td>
													<div className="content-image-container">
														<Image
															src={content.images[0] || '/img/no-image.png'}
															alt="image"
															width={200}
															height={100}
															layout="responsive"
															objectFit="cover"
															priority={false}
														/>
													</div>
												</td>

												<td>
													<h3>{content.title}</h3>
												</td>

												<td>
													<div className="flex gap-2 flex-center">
														<Link href={`/gallery/edit/${content._id}`}>
															<button>
																<FaEdit />
															</button>
														</Link>

														<Link href={`/gallery/delete/${content._id}`}>
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

					{/* for pagination */}
					{publishedContent.length > 0 && (
						<Pagination paginate={paginate} currentPage={currentPage} totalPages={totalPages} />
					)}
				</div>
			</div>
		</LoginLayout>
	)
}
