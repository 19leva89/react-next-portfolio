import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import { Spinner } from '@/components'
import { useFetchData } from '@/hooks/use-fetch-data'

// swiper
import 'swiper/css'
import 'swiper/css/pagination'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function Blogs() {
	// pagination
	const [currentPage, setCurrentPage] = useState(1)
	const [perPage] = useState(7)

	// search
	const [searchQuery, setSearchQuery] = useState('')

	// fetch content data
	const { allData, loading } = useFetchData('/api/blogs')

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
	const currentContent = filteredContent.slice(indexOfFirstContent, indexOfLastContent)

	const publishedContent = currentContent.filter((content) => content.status === 'publish')

	const sliderPublishedData = allData.filter((content) => content.status === 'publish')

	return (
		<>
			<Head>
				<title>Blogs</title>
			</Head>

			<div className="content-page">
				<section className="top-hero">
					<div className="container">
						<div className="top-title">
							<div className="top-title-cont flex">
								<h1>
									Welcome to <span>Blogs!</span>
								</h1>

								<p>
									I write about web, mobile development and modern JavaScript frameworks. The best articles,
									links and news related to web and mobile development
								</p>

								<div className="sub-email">
									<form action="" className="flex">
										<input type="text" placeholder="Search blogs here..." />

										<button>Search</button>
									</form>
								</div>
							</div>
						</div>

						<div className="featured">
							<div className="container">
								<div className="border" />

								<div className="featured-posts">
									<div className="fe-title flex">
										<h3>Featured Posts:</h3>
									</div>

									<div className="fe-posts flex">
										<Swiper
											slidesPerView={'auto'}
											freeMode={true}
											spaceBetween={30}
											className="mySwiper"
											modules={[FreeMode]}
										>
											{loading ? (
												<Spinner />
											) : (
												sliderPublishedData.slice(0, 6).map((content) => (
													<SwiperSlide key={content._id}>
														<div key={content._id} className="f-post">
															<Link href={`/blogs/${content.slug}`}>
																<img src={content.images[0] || '/img/no-image.png'} alt={content.title} />
															</Link>

															<div className="f-post-info">
																<h2>
																	<Link href={`/blogs/${content.slug}`}>{content.title}</Link>
																</h2>

																<div className="f-post-by flex flex-sb">
																	<div className="flex gap-05">
																		<img src="/img/coder-white.png" alt="coder" />
																		<p>By Sobolev</p>
																	</div>

																	<div className="tags flex flex-nowrap">
																		{content.blogCategory.map((cat) => (
																			<Link href={`blogs/category/${cat}`} className="ai">
																				<span />
																				{cat}
																			</Link>
																		))}
																	</div>
																</div>
															</div>
														</div>
													</SwiperSlide>
												))
											)}
										</Swiper>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="popular-tags-sec">
					<div className="container">
						<div className="border" />

						<div className="popular-tags-data">
							<div className="fe-title">
								<h3>Popular Tags:</h3>
							</div>

							<div className="popu-tags">
								<Link href="/blogs/category/next-js" className="p-tag">
									<img src="/img/next-js.png" alt="next js" />
								</Link>

								<Link href="/blogs/category/node-js" className="p-tag">
									<img src="/img/node-js.png" alt="node js" />
								</Link>

								<Link href="/blogs/category/react-js" className="p-tag">
									<img src="/img/react-js.gif" alt="react js" />
								</Link>

								<Link href="/blogs/category/digital-marketing" className="p-tag">
									<img src="/img/digital-marketing.png" alt="digital marketing" />
								</Link>

								<Link href="/blogs/category/flutter-dev" className="p-tag">
									<img src="/img/flutter-dev.png" alt="flutter dev" />
								</Link>

								<Link href="/blogs/category/css" className="p-tag">
									<img src="/img/css.png" alt="css" />
								</Link>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
