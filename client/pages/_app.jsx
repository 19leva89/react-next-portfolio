import '@/styles/globals.css'
import { Header } from '@/components'

export default function App({ Component, pageProps }) {
	return (
		<>
			<Header />

			<main id="site-wrapper">
				<Component {...pageProps} />
			</main>
		</>
	)
}
