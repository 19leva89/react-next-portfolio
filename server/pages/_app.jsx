import { useState } from 'react'

import { ParentComponent } from '@/components'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
	const [asideOpen, setAsideOpen] = useState(false)

	const asideClickOpen = () => {
		setAsideOpen(!asideOpen)
	}

	return (
		<>
			<ParentComponent appOpen={asideOpen} appAsideOpen={asideClickOpen} />

			<main>
				<div className={asideOpen ? 'container' : 'container active'}>
					<Component {...pageProps} />
				</div>
			</main>
		</>
	)
}
