import '@/styles/globals.css'
import { Footer, Header } from '@/components'
import { DarkModeProvider } from '@/hooks/dark-mode-context'

export default function App({ Component, pageProps }) {
	return (
		<DarkModeProvider>
			<Header />

			<main id="site-wrapper">
				<Component {...pageProps} />
			</main>

			<Footer />
		</DarkModeProvider>
	)
}
