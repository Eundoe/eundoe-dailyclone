<template
	><div class="showwindow">
		<h3>{{ basedata.title }}</h3>
		<div class="minitag">{{ basedata.slogun }}</div>
		<p class="seemore" @click="prepareW()">더보기</p>
		<div class="gallview">
			<ul class="gallery">
				<li v-for="(i, idx) in basedata.dummy" :key="idx">
					<figure class="pdetail">
						<img :src="i.src" :alt="i.name" @click="goPurchase(i.id)" />
						<figcaption>
							<h4>{{ i.name }}</h4>
							<p class="mprice">
								<span class="msale" v-if="i.sale > 0">{{ i.sale }}%</span>
								<span class="mmprice">{{ Math.floor(i.price * (1 - i.sale / 100)).toLocaleString() }}원</span>
								<span class="moprice"
									><del v-if="i.sale > 0">원가{{ i.price.toLocaleString() }}</del></span
								>
							</p>
							<p class="datebox">{{ i.rdate }}입고!</p>
							<div>
								<p class="brating">
									<span><img v-for="j in i.rating" :key="j" :src="'./image/rate.png'" :alt="j"/></span>
									<span><img v-for="q in 5 - i.rating" :key="q" :src="'./image/norate.png'" :alt="q"/></span>
								</p>
								<p>
									<span v-for="(k, idx) in i.tag" :key="idx" class="tag" :class="k.cname">{{ k.tname }}</span>
								</p>
							</div>
						</figcaption>
					</figure>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		dummy: Array,
		basedata: Object,
	},
	methods: {
		prepareW() {
			this.$dontdosame.controlPremodal()
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
	margin-bottom: 0;
}
.showwindow {
	padding: 70px 0;
	background-color: #fff;
	position: relative;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

h3,
.minitag {
	text-indent: 15px;
}

h3 {
	font-size: 28px;
}

.minitag {
	font-size: 22px;
}

.seemore {
	position: absolute;
	right: 15px;
	top: 70px;
	cursor: pointer;
}

.gallview {
	padding: 32px 0;
	overflow-x: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.gallview::-webkit-scrollbar {
	height: 10px;
}

.gallview::-webkit-scrollbar-thumb {
	background-color: rgba(255, 34, 0, 0.8);
	border-radius: 10px;
	background-clip: padding-box;
	border: 2px solid transparent;
}

.gallview::-webkit-scrollbar-track {
	background-color: rgba(255, 154, 4, 0.4);
	border-radius: 10px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

ul.gallery {
	display: flex;
	justify-content: flex-start;
	padding: 0 10px;
}

ul.gallery > li {
	margin: 0 15px;
}

.pdetail {
	min-width: 230px;
	text-align: center;
}

.pdetail > img {
	max-width: 230px;
	max-height: 238px;
	margin-bottom: 20px;
	cursor: pointer;
}
p.price > span {
	padding-right: 10px;
}

.pdetail > figcaption {
	text-align: left;
	padding: 5px 3px;
}

figcaption > h4 {
	font-size: 22px;
}

.mprice > span {
	margin-right: 5px;
}

.msale {
	font-size: 18px;
	font-weight: 500;
	color: orangered;
}
.mmprice {
	font-size: 18px;
	font-weight: 500;
}

.moprice {
	font-size: 14px;
	color: #7d7d7d;
}
.datebox {
	font-size: 14px;
	color: #7d7d7d;
	font-weight: 500;
}
</style>
