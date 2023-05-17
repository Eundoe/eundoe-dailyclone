<template>
	<div class="admin">
		<!-- Dashboard -->
		<nav class="subnav">
			<h2 class="hide">subnavigation</h2>
			<ul>
				<li class="subcategory" v-for="(i, idx) in maincate" :key="idx" style="cursor: pointer;">
					<span @click="movingcatebar(idx), $router.push({ name: i.to }).catch(() => {})">{{ i.title }}</span>
				</li>
			</ul>
			<p class="nowon">
				<span class="bar"></span>
			</p>
		</nav>
		<v-main class="dashboard pl-0">
			<v-container>
				<!-- Content -->
				<app-main />
			</v-container>
		</v-main>
		<prepare-page />
		<purchase-page />
	</div>
</template>
<script>
import { AppMain, preparePage, purchasePage } from '../codeMachine/index'
export default {
	metaInfo: {
		title: 'Alchol-holic',
	},

	components: {
		AppMain,
		preparePage,
		purchasePage,
	},
	created() {
		this.barnum = JSON.parse(localStorage.getItem('barv'))
	},
	data() {
		return {
			maincate: [
				{ title: '추천!', to: 'pickup' },
				{ title: '베스트', to: 'bestsell' },
				{ title: '혜택', to: 'eventon' },
				{ title: '카테고리', to: 'smallcategory' },
			],
			barnum: null,
			barwidth: null,
		}
	},
	methods: {
		movingcatebar(x) {
			localStorage.setItem('barv', JSON.stringify(x))
			let width = document.querySelector('li.subcategory').offsetWidth + 6
			document.querySelector('span.bar').style.left = x * width + 'px'
		},
	},
	mounted() {
		document.querySelector('span.bar').style.transition = 'none'
		document.querySelector('span.bar').style.left = this.barnum * (document.querySelector('li.subcategory').offsetWidth + 6) + 'px'
		setTimeout(() => {
			document.querySelector('span.bar').style.transition = 'all 0.1s linear'
		}, 200)
	},
}
</script>
<style lang="scss" scoped>
.admin {
	display: block;
	padding: 96px 0 0;
}
.dashboard {
	max-width: 100% !important;
}

.container {
	padding: 0 !important;
}
.subnav {
	margin: 0 auto;
	width: 100%;
	position: fixed;
	left: 50%;
	top: 34px;
	margin-left: -50%;
	background-color: #fff;
	z-index: 10;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
}

.subnav > ul {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-inline-start: 0px;
	max-height: 90px;
}

.subnav > ul > li {
	width: 25%;
	box-sizing: border-box;
	padding: 10px 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 3px;
}

.subnav > ul > li > span {
	line-height: 70px;
	font-size: 22px;
}

p.nowon {
	width: 100%;
	position: relative;
	margin: 0 0 5px 0;
}

p.nowon > span {
	display: block;
	width: 156px !important;
	height: 1px;
	margin: 0 3px;
	border-bottom: 2px solid black;
	transition: all 0.1s linear;
	position: absolute;
	left: 0;
	top: 0;
}

@media screen and (min-width: 649px) {
	.subnav {
		width: 648px;
		margin-left: -324px;
	}
}
</style>
