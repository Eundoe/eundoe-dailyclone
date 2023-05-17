<template>
	<div class="itembox">
		<p>총 {{ productList.length }}상품</p>
		<figure v-for="(i, idx) in productList" :key="idx">
			<img :src="i.src" :alt="i.name" @click="goPurchase(i.id)" />
			<figcaption>
				<h3>{{ i.name }}</h3>
				<div class="scprice">
					<p class="scsale" v-if="i.sale > 0">{{ i.sale }}%</p>
					<p class="screal">
						<span>{{ Math.floor(i.price * (1 - i.sale / 100)).toLocaleString() }}원</span>
						<del v-if="i.sale > 0">원가{{ i.price.toLocaleString() }}원</del>
					</p>
				</div>
				<div class="others">
					<p class="scrating">
						<span><img v-for="j in i.rating" :key="j" :src="'./image/rate.png'" :alt="j"/></span>
						<span><img v-for="q in 5 - i.rating" :key="q" :src="'./image/norate.png'" :alt="q"/></span>
					</p>
					<p v-if="i.tag.length >= 1" id="producttag">
						<span v-for="(k, kdx) in i.tag" :key="kdx" :class="k.cname" class="tag">{{ k.tname }}</span>
					</p>
				</div>
			</figcaption>
		</figure>
	</div>
</template>
<script>
export default {
	name: 'Itembox',
	props: {
		productList: Array,
	},
	data() {
		return {}
	},
	methods: {
		goPurchase(x) {
			this.$store.dispatch('whatLoadnow')
			this.$dontdosame.controlPurmodal()
			this.$store.commit('setPurcha', x)
		},
		// goPurchase() {
		// 	this.$store.state.loadnow = true
		// },
	},
}
</script>
<style lang="scss" scoped>
p {
	margin-bottom: 0;
}
.itembox {
	padding: 30px 10px;
	background-color: #fff;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
}

.itembox > p {
	width: 100%;
}

.itembox figure {
	max-width: 50%;
	width: 50%;
	padding: 5px;
	margin: 10px 0;
	box-sizing: border-box;
	text-align: center;
}

.itembox figure > img {
	margin-bottom: 10px;
	padding: 3px;
	cursor: pointer;
}

.itembox figcaption {
	text-align: left;
	padding: 5px 10px;
}

.itembox figcaption > h3 {
	font-size: 24px;
}

.scsale {
	font-size: 22px;
	font-weight: 500;
	color: orangered;
}

.screal > span {
	font-size: 22px;
	margin-right: 5px;
}

.screal > del {
	font-size: 18px;
	color: #7f7f7f;
}
.scprice {
	margin-bottom: 5px;
}

p.scrating {
	margin-bottom: 15px;
	display: flex;
	align-items: center;
}

p.scrating > span > img {
	max-width: 18px;
}
</style>
