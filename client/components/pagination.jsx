import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

export const Pagination = ({ paginate, currentPage, totalPages }) => {
	const pageNumbers = []

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i)
	}

	return (
		<div className="content-pagination flex flex-center mt-3">
			<button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
				<FaArrowAltCircleLeft size={26} />
			</button>

			{pageNumbers
				.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length))
				.map((number) => (
					<button
						key={number}
						onClick={() => paginate(number)}
						className={`${currentPage === number ? 'active' : ''}`}
					>
						<span>{number}</span>
					</button>
				))}

			<button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
				<FaArrowAltCircleRight size={26} />
			</button>
		</div>
	)
}
