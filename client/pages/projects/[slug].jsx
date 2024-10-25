import Head from 'next/head'
import { useRouter } from 'next/router'

import { useFetchData } from '@/hooks/use-fetch-data'

const ProjectSlug = () => {
	const router = useRouter()

	const { slug } = router.query
	const { allData, loading } = useFetchData(`/api/projects?slug=${slug}`)

	const projectCategory = allData[0]?.projectCategory
		.map((category) => category.replace(/-/g, ' '))
		.join(', ')

	return (
		<>
			<Head>
				<title>{slug ? slug.replace(/-/g, ' ') : 'Loading...'}</title>
			</Head>

			<div className="project-slug">
				<div className="project-slug-img">
					<div className="container">
						<div className="pro-slug-img">
							<img src={allData[0]?.images[0]} alt={allData[0]?.title} />
						</div>

						<div className="project-slug-info">
							<div className="left-main-pro-info">
								<h1>{projectCategory}</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ProjectSlug
