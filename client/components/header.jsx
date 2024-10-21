import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { LuSunMoon } from 'react-icons/lu'
import { IoMoonSharp } from 'react-icons/io5'
import { HiMiniBars3BottomRight } from 'react-icons/hi2'

export const Header = () => {
	const router = useRouter()
	const [mobile, setMobile] = useState(false)
	const [clicked, setClicked] = useState(false)
	const [darkMode, setDarkMode] = useState(false)
	const [activeLink, setActiveLink] = useState('/')

	const handleLinkClick = (link) => {
		setActiveLink((preActive) => (preActive === link ? null : link))
		setClicked(false)
	}

	const handleMobileOpen = () => {
		setMobile(!mobile)
	}

	const handleMobileClose = () => {
		setMobile(false)
	}

	const toggleDarkMode = () => {
		setDarkMode(!darkMode)
	}

	useEffect(() => {
		const isDarkMode = localStorage.getItem('darkMode')

		if (isDarkMode === 'true') {
			setDarkMode(true)
		}
	}, [])

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark')
			localStorage.setItem('darkMode', true)
		} else {
			document.body.classList.remove('dark')
			localStorage.setItem('darkMode', false)
		}
	}, [darkMode])

	useEffect(() => {
		setActiveLink(router.pathname)
	}, [router.pathname])

	return (
		<header>
			<nav className="container flex flex-sb">
				<div className="logo flex gap-2">
					<Link href="/">
						<img src={darkMode ? '/img/logo-white.png' : '/img/logo-dark.png'} alt="logo" />
					</Link>

					<h2>d.sobolev.dev@gmail.com</h2>
				</div>

				<div className="navlist flex gap-2">
					<ul className="flex gap-2">
						<li>
							<Link
								href="/"
								className={activeLink === '/' ? 'active' : ''}
								onClick={() => handleLinkClick('/')}
							>
								Home
							</Link>
						</li>

						<li>
							<Link
								href="/projects"
								className={activeLink === '/projects' ? 'active' : ''}
								onClick={() => handleLinkClick('/projects')}
							>
								Projects
							</Link>
						</li>

						<li>
							<Link
								href="/services"
								className={activeLink === '/services' ? 'active' : ''}
								onClick={() => handleLinkClick('/services')}
							>
								Services
							</Link>
						</li>

						<li>
							<Link
								href="/blogs"
								className={activeLink === '/blogs' ? 'active' : ''}
								onClick={() => handleLinkClick('/blogs')}
							>
								Blogs
							</Link>
						</li>

						<li>
							<Link
								href="/shops"
								className={activeLink === '/shops' ? 'active' : ''}
								onClick={() => handleLinkClick('/shops')}
							>
								Shop
							</Link>
						</li>

						<li>
							<Link
								href="/contacts"
								className={activeLink === '/contacts' ? 'active' : ''}
								onClick={() => handleLinkClick('/contacts')}
							>
								Contacts
							</Link>
						</li>
					</ul>

					<div className="dark-mode-toggle" onClick={toggleDarkMode}>
						{darkMode ? <IoMoonSharp /> : <LuSunMoon />}
					</div>

					<button>
						<Link href="/contacts">Hire Me!</Link>
					</button>

					<div className="mobile-toggle-svg" onClick={handleMobileOpen}>
						<HiMiniBars3BottomRight />
					</div>
				</div>

				<div className={mobile ? 'mobile-navlist active' : 'mobile-navlist'}>
					<span className={mobile ? 'active' : ''} onClick={handleMobileClose}></span>

					<div className="mobile-logo">
						<img src="/img/white.png" alt="logo" />

						<h2>Sobolev</h2>
					</div>

					<ul className="flex flex-col flex-left gap-1 mt-3" onClick={handleMobileClose}>
						<li>
							<Link
								href="/"
								className={activeLink === '/' ? 'active' : ''}
								onClick={() => handleLinkClick('/')}
							>
								Home
							</Link>
						</li>

						<li>
							<Link
								href="/projects"
								className={activeLink === '/projects' ? 'active' : ''}
								onClick={() => handleLinkClick('/projects')}
							>
								Projects
							</Link>
						</li>

						<li>
							<Link
								href="/services"
								className={activeLink === '/services' ? 'active' : ''}
								onClick={() => handleLinkClick('/services')}
							>
								Services
							</Link>
						</li>

						<li>
							<Link
								href="/blogs"
								className={activeLink === '/blogs' ? 'active' : ''}
								onClick={() => handleLinkClick('/blogs')}
							>
								Blogs
							</Link>
						</li>

						<li>
							<Link
								href="/shops"
								className={activeLink === '/shops' ? 'active' : ''}
								onClick={() => handleLinkClick('/shops')}
							>
								Shop
							</Link>
						</li>

						<li>
							<Link
								href="/contacts"
								className={activeLink === '/contacts' ? 'active' : ''}
								onClick={() => handleLinkClick('/contacts')}
							>
								Contacts
							</Link>
						</li>
					</ul>

					<p>Copyright &copy; 2024 | sobolev.in</p>
				</div>
			</nav>
		</header>
	)
}
