<template>
	<div id="eventwrap">
		<div v-for="(i, idx) in eventproduct" :key="idx" class="eventbox">
			<p class="tagbox">
				<span v-for="(j, jdx) in i.tag" class="tag" :class="j.cname" :key="jdx">{{ j.tname }}</span>
			</p>
			<img :src="'./image/event/event_' + i.altype + '.png'" @click="goPurchase(i.id)" />
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		eventproduct() {
			return this.$store.state.alcholdata.filter(function(item) {
				return item.altype === 'whiskey' || item.altype === 'wine' || item.altype === 'spirits'
			})
		},
	},
	mounted() {},
	methods: {
		goPurchase(x) {
			this.$store.dispatch('whatLoadnow')
			this.$dontdosame.controlPurmodal()
			this.$store.commit('setPurcha', x)
		},
	},
}
</script>
<style lang="scss">
#eventwrap {
	padding: 5px;
}

.eventbox {
	width: 100%;
	height: auto;
	margin: 10px 0;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}

.eventbox > img {
	display: block;
	max-width: 100%;
	cursor: pointer;
}

.tagbox {
	position: absolute;
	left: 15px;
	bottom: 20px;
}

.epurchase {
	max-width: 100px;
	max-height: 40px;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 10px;
	background-color: pink;
	position: absolute;
	left: 50%;
	top: 70%;
	margin: 0;
	margin-left: -50px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
