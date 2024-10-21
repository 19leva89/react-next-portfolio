import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Spinner } from '@/components'
import { services } from '@/constants/services'

import { BiDownload } from 'react-icons/bi'
import { GoArrowUpRight } from 'react-icons/go'
import { GrLinkedinOption } from 'react-icons/gr'
import { FaGithub, FaTwitter } from 'react-icons/fa6'
import { LiaBasketballBallSolid } from 'react-icons/lia'

export default function Home() {
	const [activeId, setActiveId] = useState(1)
	const [loading, setLoading] = useState(true)
	const [allData, setAllData] = useState([])
	const [allWork, setAllWork] = useState([])
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [filtredProjects, setFiltredProjects] = useState([])

	const handleHover = (id) => {
		setActiveId(id)
	}

	const handleMouseOut = () => {
		setActiveId(1)
	}

	const handleCategoryChange = (category) => {
		setSelectedCategory(category)
	}

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				const [projectsResponse, blogsResponse] = await Promise.all([fetch('/api/projects')])

				const projectData = await projectsResponse.json()
				// const blogData = await blogsResponse.json()

				setAllData(projectData)
				// setAllWork(blogData)
			} catch (error) {
				console.error('[PAGES_HOME] Data fetch error:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchAllData()
	}, [])

	useEffect(() => {
		// filter projects based on selected category
		if (selectedCategory === 'all') {
			setFiltredProjects(allData.filter((project) => project.status === 'publish'))
		} else {
			setFiltredProjects(
				allData.filter(
					(project) => project.status === 'publish' && project.projectCategory[0] === selectedCategory,
				),
			)
		}
	}, [selectedCategory, allData])

	return (
		<>
			<Head>
				<title>sobolev - Personal Portfolio</title>
				<meta name="description" content="sobolev - Personal Portfolio" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" type="image/png" href="/favicon.png" />
			</Head>

			{/* hero section */}
			<section className="hero">
				<div className="intro-text">
					<svg viewBox="0 0 1320 300">
						<text x="50%" y="50%" textAnchor="middle" className="animate-stroke">
							HI
						</text>
					</svg>
				</div>

				<div className="container">
					<div className="flex w-100">
						{/* left side section */}
						<div className="hero-info-left">
							<span className="hero-sb-title">I'm Dmitry</span>

							<h1 className="hero-title">Full Stack Developer</h1>

							<div className="hero_img_box hero-img-box">
								<img src="/img/me.png" alt="coder" />
							</div>

							<div className="lead">
								I break down complex user experience problems to create integrity focused solutions that
								connect billions of people
							</div>

							<div className="hero-btn-box">
								<Link href="/" download={'/assets/cv.pdf'} className="download-cv">
									Download CV <BiDownload />
								</Link>

								<ul className="hero-social">
									<li>
										<Link href="#" target="_blank">
											<FaTwitter />
										</Link>
									</li>

									<li>
										<Link href="#" target="_blank">
											<LiaBasketballBallSolid />
										</Link>
									</li>

									<li>
										<Link href="https://www.linkedin.com/in/lev-dmitry" target="_blank">
											<GrLinkedinOption />
										</Link>
									</li>

									<li>
										<Link href="https://github.com/19leva89" target="_blank">
											<FaGithub />
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* right side image section */}
						<div className="hero-image-right">
							<div className="hero_img_box">
								<img src="/img/me.png" alt="coder" />
							</div>
						</div>
					</div>

					<div className="funfect-area flex flex-sb">
						<div className="funfect-item">
							<h3>1+</h3>

							<h4>
								Year of <br /> Experience
							</h4>
						</div>

						<div className="funfect-item">
							<h3>18+</h3>

							<h4>
								Projects <br /> Completed
							</h4>
						</div>

						<div className="funfect-item">
							<h3>5</h3>

							<h4>
								OpenSource <br /> Library
							</h4>
						</div>

						<div className="funfect-item">
							<h3>12+</h3>

							<h4>
								Happy <br /> Customers
							</h4>
						</div>
					</div>
				</div>
			</section>

			{/* Services */}
			<section className="services">
				<div className="container">
					<div className="services-title">
						<h2>My Quality Services</h2>

						<p>
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className="services-menu">
						{services.map((service) => (
							<div
								key={service.id}
								className={`services-item ${activeId === service.id ? 's-active' : ''}`}
								onMouseOver={() => handleHover(service.id)}
								onMouseOut={handleMouseOut}
							>
								<div className="left-s-box">
									<span>0{service.id}</span>

									<h3>{service.title}</h3>
								</div>

								<div className="right-s-box">
									<p>{service.description}</p>
								</div>

								<GoArrowUpRight />
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Projects */}
			<section className="projects">
				<div className="container">
					<div className="projects-title">
						<h2>My Recent Works</h2>

						<p>
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className="projects-button">
						<button
							className={selectedCategory === 'all' ? 'active' : ''}
							onClick={() => setSelectedCategory('all')}
						>
							All
						</button>

						<button
							className={selectedCategory === 'website-development' ? 'active' : ''}
							onClick={() => setSelectedCategory('website-development')}
						>
							Website
						</button>

						<button
							className={selectedCategory === 'app-development' ? 'active' : ''}
							onClick={() => setSelectedCategory('app-development')}
						>
							Apps
						</button>

						<button
							className={selectedCategory === 'design-system' ? 'active' : ''}
							onClick={() => setSelectedCategory('design-system')}
						>
							Design
						</button>

						<button
							className={selectedCategory === 'website-migration' ? 'active' : ''}
							onClick={() => setSelectedCategory('website-migration')}
						>
							Migration
						</button>

						<button
							className={selectedCategory === 'e-commerce-site' ? 'active' : ''}
							onClick={() => setSelectedCategory('e-commerce-site')}
						>
							E-commerce
						</button>

						<button
							className={selectedCategory === 'performance-evaluation' ? 'active' : ''}
							onClick={() => setSelectedCategory('performance-evaluation')}
						>
							Performance
						</button>
					</div>

					<div className="projects-card">
						{loading ? (
							<div className="flex flex-center wh_50">
								<Spinner />
							</div>
						) : (
							<>
								{filtredProjects.length === 0 ? (
									<h1 className="flex flex-center w-100 mt-3">No projects found</h1>
								) : (
									filtredProjects.slice(0, 4).map((project) => (
										<Link key={project._id} href="#" className="pro-card">
											<div className="pro-img-box">
												<img src={project.images[0]} alt={project.title} />
											</div>

											<div className="pro-content-box">
												<h2>{project.title}</h2>

												<GoArrowUpRight />
											</div>
										</Link>
									))
								)}
							</>
						)}
					</div>
				</div>
			</section>

			{/* Experience study */}
			<section className="exstudy"></section>

			{/* My Skills */}
			<section className="myskills"></section>

			{/* Recent Blogs */}
			<section className="recentblogs"></section>
		</>
	)
}
