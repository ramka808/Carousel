const carosuel = document.querySelector('.carousel')
const firstImg = carosuel.querySelectorAll('img')[0]
const arrowIcons = document.querySelectorAll('.wrapper i')

let isDragStart = false,
	isDragging = false,
	prevPageX,
	prevScrollLeft,
	positionDiff

const showHidenIcons = () => {
	let scrollWidth = carosuel.scrollWidth - carosuel.clientWidth
	arrowIcons[0].style.display = carosuel.scrollLeft == 0 ? 'none' : 'block'
	arrowIcons[1].style.display =
		carosuel.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrowIcons.forEach((icon) => {
	icon.addEventListener('click', () => {
		let firstImgWidth = firstImg.clientWidth + 14
		carosuel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
		showHidenIcons()
		setTimeout(() => showHidenIcons(), 60)
	})
})

const autoSlide = () => {
	if (carosuel.scrollLeft == carosuel.scrollWidth - carosuel.clientWidth) return
	positionDiff = Math.abs(positionDiff)
	let firstImgWidth = firstImg.clientWidth + 14
	let valDifference = firstImgWidth - positionDiff

	if (carosuel.scrollLeft > prevScrollLeft) {
		return (carosuel.scrollLeft +=
			positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff)
	}
	carosuel.scrollLeft -=
		positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
}

const dragStart = (e) => {
	isDragStart = true
	prevPageX = e.pageX || e.touches[0].pageX
	prevScrollLeft = carosuel.scrollLeft
}

const dragging = (e) => {
	if (!isDragStart) return
	e.preventDefault()
	isDragging = true
	carosuel.classList.add('dragging')
	positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
	carosuel.scrollLeft = prevScrollLeft - positionDiff
	showHidenIcons()
}

const dragStop = () => {
	isDragStart = false
	carosuel.classList.remove('dragging')
	if (!isDragging) return
	isDragging = false

	autoSlide()
}

carosuel.addEventListener('mousedown', dragStart)
carosuel.addEventListener('touchstart', dragStart)

carosuel.addEventListener('mousemove', dragging)
carosuel.addEventListener('touchmove', dragging)

carosuel.addEventListener('mouseup', dragStop)
carosuel.addEventListener('mouseleave', dragStop)
carosuel.addEventListener('touchend', dragStop)
