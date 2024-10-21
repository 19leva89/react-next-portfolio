import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Spinner } from '@/components'
import { services } from '@/constants/services'

import { LuMedal } from 'react-icons/lu'
import { BiDownload } from 'react-icons/bi'
import { GoArrowUpRight } from 'react-icons/go'
import { PiGraduationCap } from 'react-icons/pi'
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
				<title>Sobolev - Personal Portfolio</title>
				<meta name="description" content="Sobolev - Personal Portfolio" />
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
			<section className="ex-study">
				<div className="container flex flex-left flex-sb">
					<div className="experience">
						<div className="experience-title flex gap-1">
							<LuMedal />
							<h2>My Experience</h2>
						</div>

						<div className="exper-cards">
							<div className="exper-card">
								<span>2020 - Present</span>
								<h3>DVTECH IT SOLUTION</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card">
								<span>2018 - 2020</span>
								<h3>BICKDRIMS LLC.</h3>
								<p>Front-end Developer (internship)</p>
							</div>

							<div className="exper-card">
								<span>2021 - 2023</span>
								<h3>VAGALLY LLC.</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card">
								<span>2021 - 2024</span>
								<h3>BLOCKDOTS, USA</h3>
								<p>Full Stack Developer</p>
							</div>
						</div>
					</div>

					<div className="education">
						<div className="experience-title flex gap-1">
							<PiGraduationCap />
							<h2>My Education</h2>
						</div>

						<div className="exper-cards">
							<div className="exper-card">
								<span>2020 - Present</span>
								<h3>DVTECH IT SOLUTION</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card">
								<span>2018 - 2020</span>
								<h3>BICKDRIMS LLC.</h3>
								<p>Front-end Developer (internship)</p>
							</div>

							<div className="exper-card">
								<span>2021 - 2023</span>
								<h3>VAGALLY LLC.</h3>
								<p>Full Stack Developer</p>
							</div>

							<div className="exper-card">
								<span>2021 - 2024</span>
								<h3>BLOCKDOTS, USA</h3>
								<p>Full Stack Developer</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* My Skills */}
			<section className="my-skills">
				<div className="container">
					<div className="my-skills-title">
						<h2>My Skills</h2>
						<p>
							We put your ideas and thus your wishes in the form of a unique web project that inspires you and
							your customers
						</p>
					</div>

					<div className="my-skills-cards">
						<div className="my-s-card">
							<div className="my-s-inner">
								<img src="/img/python.svg" alt="python" />
								<h3>92%</h3>
							</div>

							<p className="text-center">Python</p>
						</div>

						<div className="my-s-card">
							<div className="my-s-inner">
								<img src="/img/firebase.svg" alt="firebase" />
								<h3>80%</h3>
							</div>

							<p className="text-center">Firebase</p>
						</div>

						<div className="my-s-card">
							<div className="my-s-inner">
								<img src="/img/mongodb.svg" alt="mongodb" />
								<h3>98%</h3>
							</div>

							<p className="text-center">MongoDB</p>
						</div>

						<div className="my-s-card">
							<div className="my-s-inner">
								<img src="/img/redux.svg" alt="redux" />
								<h3>85%</h3>
							</div>

							<p className="text-center">Redux</p>
						</div>

						<div className="my-s-card">
							<div className="my-s-inner">
								<img src="/img/react.svg" alt="react" />
								<h3>99%</h3>
							</div>

							<p className="text-center">React</p>
						</div>

						<div className="my-s-card">
							<div className="my-s-inner">
								<img src="/img/js.svg" alt="java-script" />
								<h3>99%</h3>
							</div>

							<p className="text-center">JavaScript</p>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Blogs */}
			<section className="recent-blogs"></section>
		</>
	)
}
