export default {
	controlPremodal() {
		document.body.classList.add(window.outerWidth < 649 ? 'modal-open' : 'modal-wopen')

		setTimeout(function() {
			document.querySelector('div.prepare').style.left = '50%'
		}, 100)
	},
	controlPurmodal() {
		document.querySelector('.productbox').scrollTo(0, 0)
		document.body.classList.add(window.outerWidth < 649 ? 'modal-open' : 'modal-wopen')
		// document.querySelector('.purchase').style.display = 'block'
		document.querySelector('.purchase').style.top = '0'
	},
}
