<template>
	<div>
		<nav class="barwindow">
			<h2 class="hide">sub-subnav</h2>
			<ul class="besttagbar">
				<li v-for="(i, idx) in filtiyps" :key="idx" primary @click="sortquery(i.sortquery, idx)" :class="i.checked ? 'selected' : false">
					<span>{{ i.title }}</span>
					<v-icon v-if="idx > 0">{{ i.sortup ? 'mdi-sort-descending' : 'mdi-sort-ascending' }}</v-icon>
				</li>
			</ul>
		</nav>
		<Itembox :productList="this.sample" />
	</div>
</template>
<script>
import Itembox from '@/views/codeMachine/components/itembox.vue'
export default {
	computed: {},
	components: {
		Itembox,
	},
	data() {
		return {
			sample: this.$store.state.alcholdata.slice(),
			filtiyps: [
				{ title: '전체', sortquery: 'id', sortup: true, checked: false },
				{
					title: '베스트셀러',
					sortquery: 'selling',
					sortup: true,
					checked: false,
				},
				{
					title: '평가순',
					sortquery: 'rating',
					sortup: true,
					checked: false,
				},
				{
					title: '최신순',
					sortquery: 'rdate',
					sortup: true,
					checked: false,
				},
				{
					title: '할인순',
					sortquery: 'sale',
					sortup: true,
					checked: false,
				},
				{
					title: '가격순',
					sortquery: 'saleprice',
					sortup: true,
					checked: false,
				},
				// {
				// 	title: '더미2',
				// 	sortquery: '',
				// 	sortup: true,
				// },
				// {
				// 	title: '더미3',
				// 	sortquery: '',
				// 	sortup: true,
				// },
			],
		}
	},
	mounted() {
		this.filtiyps[0].checked = true
	},
	methods: {
		sortquery(x, y) {
			for (let i of this.filtiyps) {
				i.checked = false
			}
			this.filtiyps[y].checked = true

			if (x === 'id') {
				for (let allsort of this.filtiyps) {
					allsort.sortup = true
				}
				return this.sample.sort(function(a, b) {
					return a[x] < b[x] ? -1 : 1
				})
			} else {
				if (this.filtiyps[y].sortup) {
					for (let it of this.filtiyps) {
						it.sortup = true
					}
					this.filtiyps[y].sortup = false
					if (x === 'rdate') {
						return this.sample.sort(function(a, b) {
							return Number(a[x].replace(/-/g, '')) > Number(b[x].replace(/-/g, '')) ? -1 : 1
						})
					} else {
						return this.sample.sort(function(a, b) {
							return a[x] > b[x] ? -1 : 1
						})
					}
				} else {
					for (let it of this.filtiyps) {
						it.sortup = true
					}
					this.filtiyps[y].sortup = true
					if (x === 'rdate') {
						return this.sample.sort(function(a, b) {
							return Number(a[x].replace(/-/g, '')) < Number(b[x].replace(/-/g, '')) ? -1 : 1
						})
					} else {
						return this.sample.sort(function(a, b) {
							return a[x] < b[x] ? -1 : 1
						})
					}
				}
			}
		},
	},
}
</script>
<style lang="scss" scoped>
p {
	margin: 0;
}
.barwindow {
	width: 100%;
	overflow-x: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.barwindow::-webkit-scrollbar {
	height: 4px;
}

.barwindow::-webkit-scrollbar-thumb {
	background-color: orangered;
	height: 2px;
	border-radius: 2px;
}

.barwindow::-webkit-scrollbar-track {
	background-color: rgb(255, 227, 101);
}

.besttagbar {
	width: 132%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 15px 5px;
}
.besttagbar li {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 20px;
	margin: 0 10px;
	border-radius: 20px;
	background-color: #fff;
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
	cursor: pointer;
}
li.selected {
	background-color: orangered;
	color: #fff;
}

.besttagbar li > i {
	margin-left: 10px;
	color: inherit !important;
}
</style>
