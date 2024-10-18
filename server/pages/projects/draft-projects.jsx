import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { RiArrowRightDoubleFill, RiDeleteBin6Fill } from 'react-icons/ri'

import { useFetchData } from '@/hooks/use-fetch-data'
import { DashboardHeader, DataLoading } from '@/components'

export default function DraftProjects() {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')

	// fetch project data
	const { allData, loading } = useFetchData('/api/projects')

	// handle page change
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	// total number of projects
	const totalProjects = allData.length

	// filter all data based on search query
	const filteredProjects =
		searchQuery.trim() === ''
			? allData
			: allData.filter((project) => project.title.toLowerCase().includes(searchQuery.toLowerCase()))

	// calculate index of the first project displayed on the current page
	const indexOfFirstProject = (currentPage - 1) * perPage
	const indexOfLastProject = currentPage * perPage

	// get current page of projects
	const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject)

	const draftedProjects = currentProjects.filter((project) => project.status === 'draft')

	const pageNumbers = []

	for (let i = 1; i <= Math.ceil(totalProjects / perPage); i++) {
		pageNumbers.push(i)
	}

	return (
		<div className="content-page">
			<DashboardHeader
				title="All Draft"
				subtitle="Projects"
				icon={RiArrowRightDoubleFill}
				breadcrumb="projects"
			/>

			<div className="contents-table">
				<div className="flex gap-2 mb-1">
					<h2>Search Projects:</h2>
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
								{draftedProjects.length === 0 ? (
									<tr>
										<td colSpan={4} className="text-center">
											No Projects Found
										</td>
									</tr>
								) : (
									draftedProjects.map((project, index) => (
										<tr key={project._id}>
											<td>{indexOfFirstProject + index + 1}</td>

											<td>
												<div className="content-image-container">
													<Image
														src={project.images[0]}
														alt="image"
														width={200}
														height={100}
														layout="responsive"
														objectFit="cover"
													/>
												</div>
											</td>

											<td>
												<h3>{project.title}</h3>
											</td>

											<td>
												<div className="flex gap-2 flex-center">
													<Link href={`/projects/edit/${project._id}`}>
														<button>
															<FaEdit />
														</button>
													</Link>

													<Link href={`/projects/delete/${project._id}`}>
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
