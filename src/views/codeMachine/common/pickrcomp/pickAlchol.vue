<template>
	<div>
		<v-carousel height="308px" hide-delimiters :show-arrows="false" cycle v-model="currentIdx">
			<p class="showpage">{{ currentIdxom + 1 }} / {{ items.length }}</p>
			<v-carousel-item
				contain
				top
				v-for="(i, idx) in items"
				:key="idx"
				:src="i.src"
				@click="$router.push('event').catch(() => {}), movingcatebar(2)"
			></v-carousel-item>
		</v-carousel>

		<smallList v-for="(i, idx) in dummies" :key="idx" :dummy="i.dummy" :basedata="i" />
	</div>
</template>

<script>
import { smallList } from '@/views/codeMachine/index'
export default {
	created() {},
	components: {
		smallList,
	},
	computed: {
		currentIdxom() {
			return this.items[this.currentIdx].id
		},
	},

	data() {
		return {
			currentIdx: 0,
			items: [
				{
					id: 0,
					src: './image/event/event_whiskey.png',
				},
				{
					id: 1,
					src: './image/event/event_wine.png',
				},
				{
					id: 2,
					src: './image/event/event_spirits.png',
				},
			],
			dummies: [
				{
					title: '첫구매 인기상품!',
					ticon: '',
					slogun: '절찬리 판매중!',
					dummy: this.$store.state.alcholdata.slice().sort((a, b) => {
						return a.selling > b.selling ? -1 : 1
					}),
				},
				{
					title: '최신 입고 상품!',
					ticon: '',
					slogun: '매일매일 새로운 술을!',
					dummy: this.$store.state.alcholdata.slice().sort((a, b) => {
						return Number(a.rdate.replace(/-/g, '')) > Number(b.rdate.replace(/-/g, '')) ? -1 : 1
					}),
				},
			],
		}
	},
	methods: {
		movingcatebar(x) {
			localStorage.setItem('barv', JSON.stringify(x))
			let width = document.querySelector('li.subcategory').offsetWidth + 6
			document.querySelector('span.bar').style.left = x * width + 'px'
		},
	},
}
</script>
<style lang="scss" scoped>
p.showpage {
	background-color: rgba(0, 0, 0, 0.3);
	position: absolute;
	right: 30px;
	top: 10px;
	font-size: 14px;
	padding: 3px 15px;
	color: #fff;
	z-index: 2;
	border-radius: 10px;
}
</style>
