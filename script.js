const carosuel = document.querySelector('.carousel')

let isDragStart = false,
	prevPageX,
	prevScrollLeft

const dragStart = (e) => {
	isDragStart = true
	prevPageX = e.pageX
	prevScrollLeft = carosuel.scrollLeft
}

const dragging = (e) => {
	if (!isDragStart) return
	e.preventDefault()
	let positionDiff = e.pageX - prevPageX
	carosuel.scrollLeft = prevScrollLeft - positionDiff
}

const dragStop = () => {
	isDragStart = false
}

carosuel.addEventListener('mousedown', dragStart)
carosuel.addEventListener('mousemove', dragging)
carosuel.addEventListener('mouseup', dragStop)
