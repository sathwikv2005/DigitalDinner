import style from '../../css/home.module.css'

export default function MenuNav({ categories, active, onClick }) {
	return (
		<div className={style.categories}>
			<div
				key="All"
				id="All"
				className={`${style.category} ${active === 'All' ? style.active : ''}`}
				onClick={onClick}
			>
				All
			</div>
			{categories.map((category) => {
				return (
					<div
						key={category}
						id={category}
						className={`${style.category} ${active === category ? style.active : ''}`}
						onClick={onClick}
					>
						{category}
					</div>
				)
			})}
		</div>
	)
}
