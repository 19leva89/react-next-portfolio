import gsap from 'gsap'
import { useEffect } from 'react'

export const Preloader = ({ isLoading, children }) => {
	useEffect(() => {
		if (!isLoading) {
			const svg = document.getElementById('preloaderSvg')
			const svgText = document.querySelector('.hero-section .intro-text svg text')
			const tl = gsap.timeline({
				onComplete: startStrokeAnimation,
			})
			const curve = 'M0 502S175 272 500 272s500 230 500 230V0H0Z'
			const flat = 'M0 2S175 1 500 1s500 1 500 1V0H0Z'

			tl.to('.preloader-heading .load-text , .preloader-heading , .preloader-heading::before , .cont', {
				delay: 1.5,
				y: -100,
				opacity: 0,
				duration: 0.5,
			})
				.to(svg, {
					duration: 0.5,
					attr: { d: curve },
					ease: 'power2.easeIn',
				})
				.to(svg, {
					duration: 0.5,
					attr: { d: flat },
					ease: 'power2.easeOut',
				})
				.to('.preloader', {
					y: -1500,
					duration: 0.7,
					ease: 'power2.easeInOut',
				})
				.to('.preloader', {
					opacity: 0,
					duration: 0.3,
					onComplete: () => {
						document.body.classList.remove('preloader-active')
					},
				})

			function startStrokeAnimation() {
				if (svgText) {
					svgText.classList.add('animate-stroke')
				}
			}
		}
	}, [isLoading])

	useEffect(() => {
		if (!isLoading) {
			const tl = gsap.timeline()

			tl.from('.main-content', {
				opacity: 0,
				y: 50,
				duration: 0.5,
				ease: 'power2.out',
			})
		}
	}, [isLoading])

	return isLoading ? (
		<div className="preloader">
			<svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
				<path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
			</svg>

			<div className="preloader-heading">
				<div className="load-text">
					<span>S</span>
					<span>O</span>
					<span>B</span>
					<span>O</span>
					<span>L</span>
					<span>E</span>
					<span>V</span>
				</div>
			</div>
		</div>
	) : (
		<div className="main-content">{children}</div>
	)
}
