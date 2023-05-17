<template>
	<div>
		<nav class="scatewindow">
			<h2 class="hide">sub-subnav</h2>
			<ul class="scattagbar">
				<li
					:class="idx === 0 ? 'selected' : false"
					v-for="(i, idx) in filtiyps"
					:key="idx"
					primary
					@click="filtquery(i.filtquery, idx)"
					class="noon"
				>
					<span>{{ i.title }}</span>
				</li>
			</ul>
		</nav>
		<Itembox :productList="this.filtsample" />
	</div>
</template>
<script>
import Itembox from '@/views/codeMachine/components/itembox.vue'
export default {
	components: {
		Itembox,
	},
	computed: {},
	data() {
		return {
			filtsample: this.$store.state.alcholdata.slice(),
			filtiyps: [
				{ title: '전체', filtquery: '', filtup: true },
				{
					title: '와인',
					filtquery: 'wine',
					filtup: true,
				},
				{
					title: '위스키',
					filtquery: 'whiskey',
					filtup: true,
				},
				{
					title: '고량주',
					filtquery: 'goryang',
					filtup: true,
				},
				{
					title: '스피릿',
					filtquery: 'spirits',
					filtup: true,
				},
				{
					title: '전통소주',
					filtquery: 'soju',
					filtup: true,
				},
			],
		}
	},
	methods: {
		filtquery(x, y) {
			let btn = document.querySelectorAll('.noon')
			for (let i of btn) {
				i.classList.remove('selected')
			}
			btn[y].classList.add('selected')
			if (x === '') {
				return (this.filtsample = this.$store.state.alcholdata)
			} else {
				return (this.filtsample = this.$store.state.alcholdata.filter(function(i) {
					return i.altype === x
				}))
			}
		},
		goPurchase(x) {
			this.$store.dispatch('whatLoadnow')

			this.$dontdosame.controlPurmodal()
			this.$store.commit('setPurcha', x)
		},
	},
}
</script>
<style lang="scss" scoped>
p {
	margin: 0;
}
.scatewindow {
	width: 100%;
}
.scattagbar {
	width: auto;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 15px 5px;
}
.scattagbar li {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 20px;
	margin: 0 10px;
	border-radius: 20px;
	background-color: #fff;
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
	transition: (color, background-color) 0.1s linear;
	cursor: pointer;
}

li.selected {
	background-color: orangered;
	color: #fff;
}
</style>
