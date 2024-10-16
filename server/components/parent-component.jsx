import { Header, Aside } from '@/components'

export const ParentComponent = (props) => {
	return (
		<div>
			<Header handleAsideOpen={props.appAsideOpen} />

			<Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen} />
		</div>
	)
}
