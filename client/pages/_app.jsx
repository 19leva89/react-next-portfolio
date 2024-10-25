import '@/styles/globals.css'
import { Footer, Header } from '@/components'
import { DarkModeProvider } from '@/hooks/use-dark-mode'

const App = ({ Component, pageProps }) => {
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

export default App
