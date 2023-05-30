<template>
	<div class="modalbase purchase">
		<div class="backbanner">
			<span @click="closeModalx()"
				><v-icon>{{ backicon }}</v-icon></span
			>
			<span><v-icon @click="prepareW()">mdi-export-variant</v-icon></span>
		</div>
		<div class="botanner">
			<ul>
				<li v-for="(i, idx) in btmbanner" :key="idx" @click="i.cname !== 'wish_list' ? prepareW() : false">
					<span :class="i.cname" v-if="i.icon !== ''"
						><v-icon :class="nowUsee.wishList ? 'checked' : false" @click="wishListAdd(i.cname)">{{ i.icon }}</v-icon></span
					>
					<span :class="i.cname" v-else>{{ i.title }}</span>
				</li>
			</ul>
		</div>
		<div class="productbox">
			<figure class="productcont">
				<img :src="nowUsee.src" :alt="nowUsee.name" />
				<figcaption>
					<p v-if="nowUsee.tag.length >= 1" id="producttag">
						<span v-for="(k, kdx) in nowUsee.tag" :key="kdx" :class="k.cname" class="tag">{{ k.tname }}</span>
					</p>
					<h3>{{ nowUsee.name }}</h3>
					<div class="puprice">
						<p class="pusale" v-if="nowUsee.sale > 0">{{ nowUsee.sale }}%</p>
						<p class="pureal">
							<span>{{ Math.floor(nowUsee.price * (1 - nowUsee.sale / 100)).toLocaleString() }}원</span>
							<del v-if="nowUsee.sale > 0">{{ nowUsee.price.toLocaleString() }}원</del>
						</p>
					</div>
					<div class="others">
						<p class="brating">
							<span><img v-for="j in nowUsee.rating" :key="j" :src="'./image/rate.png'" :alt="j"/></span>
							<span><img v-for="q in 5 - nowUsee.rating" :key="q" :src="'./image/norate.png'" :alt="q"/></span>
						</p>
					</div>
				</figcaption>
			</figure>
			<alchoinfo />
		</div>
		<div id="workitnow">
			<div class="wishalert">
				<v-icon>{{ nowUsee.wishList ? this.alert.addicon : this.alert.delicon }}</v-icon>
				<span>{{ nowUsee.wishList ? this.alert.addcont : this.alert.delcont }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import alchoinfo from '../components/alchoinfo.vue'
export default {
	name: 'purchase-page',
	computed: {
		nowUsee() {
			return this.$store.state.purchadata
		},
	},
	components: {
		alchoinfo,
	},
	data() {
		return {
			backicon: 'mdi-chevron-left',
			btmbanner: [
				{ title: '위시리스트', icon: 'mdi-heart', cname: 'wish_list' },
				{ title: '선물하기', icon: 'mdi-gift-outline', cname: 'gift_list' },
				{ title: '내 주변에서 픽업하기', icon: '', cname: 'purchase_list' },
			],
			alert: {
				addicon: 'mdi-heart-plus-outline',
				delicon: 'mdi-heart-minus-outline',
				addcont: '내 술킷리스트에 추가되었습니다.',
				delcont: '내 술킷리스트에서 제거 되었습니다.',
			},
			wishcheck: this.$store.state.purchadata.wishList,
		}
	},
	methods: {
		closeModalx() {
			document.body.classList.remove(window.outerWidth < 649 ? 'modal-open' : 'modal-wopen')
			document.querySelector('div.purchase').style.top = `100%`
		},
		wishListAdd(Cname) {
			if (Cname === 'wish_list') {
				this.$store.commit('setWishlist', this.nowUsee.id)
				this.fadedmessage()
			}
		},
		prepareW() {
			this.$dontdosame.controlPremodal()
		},
		fadedmessage() {
			let fadeoper = document.querySelector('#workitnow')
			let fadein = setTimeout(() => {
				fadeoper.classList.remove('faded')
			}, 1200)
			fadeoper.classList.add('faded')
			fadein
		},
	},
}
</script>
<style lang="scss" scoped>
p {
	margin-bottom: 0;
}
.purchase {
	z-index: 150;
	left: 50%;
	top: 100%;
	margin-left: -50%;
	padding: 70px 0;
}

.backbanner {
	justify-content: space-between;
	padding: 0 10px;
	background-color: #fff;
}
.backbanner > span {
	display: flex;
	align-items: center;
	justify-content: center;
}

.backbanner > span > i {
	font-size: 35px;
	cursor: pointer;
}

.botanner {
	width: 100%;
	padding: 10px 0;
	min-height: 60px;
	max-height: 70px;
	display: flex;
	align-items: center;
	position: absolute;
	left: 0;
	bottom: 0;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
	z-index: 210;
}

.botanner > ul {
	width: 592px;
	margin: 0 auto;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

.botanner > ul > li {
	margin: 0 5px;
	width: 55px;
	height: 55px;
	cursor: pointer;
}

.botanner > ul > li:last-child {
	width: calc(90% - 55px);
}

.botanner > ul > li > span {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.wish_list > .checked {
	color: orangered !important;
}

.gift_list > button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	color: orange !important;
	border: 2px solid orange;
	border-radius: 8px;
}

.purchase_list {
	color: #fff;
	background-color: orange;
	border-radius: 8px;
	font-size: 20px;
	font-weight: 600;
}

.productbox {
	padding: 5px;
	width: 100%;
}

.productbox::-webkit-scrollbar {
	width: 5px;
}

.productbox::-webkit-scrollbar-thumb {
	background-color: rgba(255, 68, 0, 0.623);
	border-radius: 1px;
	background-clip: 1px;
	border: 1px solid transparent;
}

.productbox::-webkit-scrollbar-track {
	background-color: #fff;
	border-radius: 2px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.productcont {
	width: 100%;
	padding: 5px;
	text-align: center;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	margin: 5px 0;
}

.productbox figure > img {
	max-width: 100%;
	max-height: 500px;
	margin-bottom: 28px;
	padding: 5px;
}

.productbox figure > figcaption {
	width: 80%;
	margin: 0 auto;
	text-align: start;
}

.tag {
	border-radius: 0;
	font-size: 18px;
}
.productbox figure > figcaption > p {
	margin-bottom: 20px;
}

.productbox h3 {
	font-size: 28px;
	margin-bottom: 10px;
}

.puprice {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 5px;
}
.puprice > p {
	margin-right: 10px;
}

.pusale {
	font-size: 28px;
	font-weight: 500;
	color: orangered;
}

.pureal {
	display: flex;
	align-items: center;
	font-size: 28px;
	font-weight: 500;
}

.pureal > del {
	margin-left: 10px;
	font-size: 24px;
	color: rgb(124, 124, 124);
}

p.brating > span > img {
	max-width: 23px;
}

.wishalert {
	position: absolute;
	left: 50%;
	top: 50%;
	margin-left: -45%;
	margin-top: -25%;
	width: 90%;
	background-color: rgba(0, 0, 0, 0.7);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 8px;
}

#workitnow {
	width: 100%;
	left: 0;
	top: 0;
	height: 100vh;
	position: absolute;
	z-index: -100;
	transition: all 300ms linear;
	opacity: 0;
}

.wishalert > i {
	font-size: 25px;
	color: #fff;
	line-height: 2em;
	margin-right: 10px;
}

.wishalert > span {
	color: #fff;
	font-size: 20px;
	line-height: 2em;
}

.faded {
	opacity: 1 !important;
	z-index: 1000 !important;
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
