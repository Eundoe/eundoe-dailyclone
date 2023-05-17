<template
	><header>
		<div id="headwrap">
			<h1 class="hide">This is Header</h1>
			<div @click="$router.push('notfound').catch(() => {}), subMenu()" class="mylocate">
				<span>Now i'm here</span><v-icon>mdi-chevron-right</v-icon>
			</div>
			<div class="hicons">
				<span @click="$router.push('notfound').catch(() => {}), subMenu()"><v-icon>mdi-magnify</v-icon></span>
				<span @click="$router.push('notfound').catch(() => {}), subMenu()"><v-icon>mdi-shopping</v-icon></span>
			</div>
		</div>
		<nav id="mainnav">
			<ul>
				<li
					v-for="(i, idx) in mNav"
					:key="idx"
					v-ripple="{ class: `orange--text` }"
					@click="$router.push({ name: i.to }).catch(() => {}), selectmenU(idx)"
					:class="idx === 0 ? 'selected' : false"
					class="noncheck"
				>
					<span
						><v-icon>{{ i.icon }}</v-icon></span
					>
					<span>{{ i.title }}</span>
				</li>
			</ul>
		</nav>
	</header>
</template>
<script>
export default {
	data() {
		return {
			mNav: [
				{ title: '술픽업', to: 'pickup', icon: 'mdi-shopping-outline' },
				{ title: '술픽업NOW', to: 'notfound', icon: 'mdi-store' },
				{ title: '택배배송', to: 'notfound', icon: 'mdi-truck-delivery' },
				{ title: '마이페이지', to: 'notfound', icon: 'mdi-account-outline' },
			],
		}
	},
	methods: {
		prepareW() {
			document.querySelector('.prepare').styel.left = '50%'
		},
		selectmenU(x) {
			let allli = document.querySelectorAll('li.noncheck')
			for (let i of allli) {
				i.classList.remove('selected')
			}
			allli[x].classList.add('selected')
			localStorage.setItem('barv', JSON.stringify(x))
		},
		subMenu() {
			for (let i of document.querySelectorAll('.selected')) {
				i.classList.remove('selected')
			}
		},
	},
}
</script>
<style scoped>
header {
	width: 100%;
	position: fixed;
	left: 50%;
	margin-left: -50%;
	top: 0;
	z-index: 44;
	background-color: #f6ae42;
}

#headwrap {
	padding: 5px;
	margin: 0 auto;
	width: 592px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	max-height: 48px;
}

#headwrap > div > span {
	cursor: pointer;
}

.hicons {
	display: flex;
	justify-content: center;
	align-items: center;
}

.hicons > span:nth-child(2) {
	margin-left: 10px;
}

.mylocate {
	display: flex;
	align-items: center;
}

#mainnav {
	width: 100%;
	position: fixed;
	left: 50%;
	margin-left: -50%;
	bottom: 0;
	max-height: 95px;
	box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.2);
	background-color: #fff;
}
#mainnav > ul {
	padding: 0;
	margin: 0 auto;
	width: 592px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	min-height: 95px;
}

#mainnav > ul > li {
	flex-wrap: wrap;
	width: 25%;
	max-width: 25%;
	padding: 10px 20px;
	max-height: 95px;
	list-style: none;
	color: #3f3d3d;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #7e7e7e;
	font-weight: 500;
	cursor: pointer;
}

#mainnav > ul > li > span:first-child {
	margin-bottom: 5px;
}

#mainnav > ul > li > span {
	width: 95%;
}

#mainnav > ul > li > span > i {
	font-size: 40px;
	color: inherit !important;
}

.selected {
	color: red !important;
}

@media screen and (min-width: 649px) {
	header {
		width: 648px;
		margin-left: -324px;
	}
	#mainnav {
		width: 648px;
		margin-left: -324px;
	}
}
</style>
