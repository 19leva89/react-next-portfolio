import Aos from 'aos'
import { useEffect, useState } from 'react'

import { DarkModeProvider } from '@/hooks/use-dark-mode'
import { Footer, Header, Preloader } from '@/components'

import 'aos/dist/aos.css'
import '@/styles/globals.css'

const App = ({ Component, pageProps }) => {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const handleComplete = () => {
			setIsLoading(false)
		}

		setTimeout(() => handleComplete(), 3000)

		return () => clearTimeout(handleComplete)
	}, [])

	// aos animation
	useEffect(() => {
		Aos.init({
			// Global settings:
			disable: false,
			startEvent: 'DOMContentLoaded',
			initClassName: 'aos-init',
			animatedClassName: 'aos-animate',
			useClassNames: false,
			disableMutationObserver: false,
			debounceDelay: 50,
			throttleDelay: 99,

			// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
			offset: 100,
			delay: 0,
			duration: 900,
			easing: 'ease',
			once: false,
			mirror: false,
			anchorPlacement: 'top-bottom',
		})
	}, [])

	return (
		<Preloader isLoading={isLoading}>
			<DarkModeProvider>
				<Header />

				{!isLoading && (
					<main id="site-wrapper">
						<Component {...pageProps} />
					</main>
				)}

				<Footer />
			</DarkModeProvider>
		</Preloader>
	)
}

export default App
