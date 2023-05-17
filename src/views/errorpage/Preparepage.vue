<template>
	<div class="modalbase prepare">
		<div class="backbanner">
			<v-icon @click="closeModal()">{{ backicon }}</v-icon>
		</div>
		<div class="prepcont">
			<h1>죄송합니다</h1>
			<p>
				현재 이 기능은 개발중에 있습니다.<br />
				불편을 끼쳐드려 죄송합니다.
			</p>
		</div>
	</div>
</template>
<script>
export default {
	name: 'prepared-page',
	data() {
		return {
			backicon: 'mdi-chevron-left',
		}
	},
	methods: {
		closeModal() {
			document.body.classList.remove(window.outerWidth < 649 ? 'modal-open' : 'modal-wopen')
			document.querySelector('div.prepare').style.left = `-100%`
		},
	},
}
</script>

<style lang="scss" scoped>
.prepare {
	display: flex;
	z-index: 400;
	height: 100vh;
	left: -100%;
	top: 0;
	margin-left: -50%;
}

.backbanner {
	padding: 0 10px;
}
.backbanner > button {
	font-size: 35px;
}

@media screen and (min-width: 649px) {
	.modalbase {
		width: 648px;
		margin-left: -324px;
	}
	#mainnav {
		width: 648px;
		margin-left: -324px;
	}
}
</style>
