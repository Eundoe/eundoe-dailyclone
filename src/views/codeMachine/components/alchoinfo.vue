<template>
	<div class="productcont">
		<div class="taste-note">
			<h2>Tasting Note</h2>
			<dl v-for="(i, idx) in nowUsee.taste" :key="idx">
				<dt>{{ i.title }}</dt>
				<dd>{{ i.value.join(', ') }}</dd>
			</dl>
		</div>
		<div class="alchol-info">
			<h2>Information</h2>
			<dl v-for="(k, kdx) in nowUsee.info" :key="kdx">
				<dt>{{ k.title }}</dt>
				<dd>
					{{ whatKindV(k) }}
				</dd>
			</dl>
		</div>
	</div>
</template>
<script>
export default {
	name: 'alcholInfo',
	computed: {
		nowUsee() {
			return this.$store.state.purchadata
		},
	},
	data() {
		return {}
	},
	methods: {
		whatKindV(x) {
			let result2 = typeof x.value === 'boolean' ? (x.value ? '있음' : '없음') : x.value
			let result = x.title === '도수' || x.title === '용량' ? (x.title === '도수' ? '%' : 'ml') : ''
			return result2 + result
		},
	},
}
</script>
<style lang="scss" scoped>
.productcont {
	position: relative;
}
.productcont > div {
	width: 100%;
	padding: 5px 12px;
	margin: 10px 0;
}

.productcont > div > h2 {
	text-align: start;
	padding: 5px;
	margin-bottom: 15px;
	border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.productcont > div > dl {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
}

.productcont > div > dl > dt {
	width: 20%;
	max-width: 35%;
	padding: 2px 0;
	margin: 0 20px 0 0;
	font-size: 18px;
	font-weight: 600;
}

.productcont > div > dl > dd {
	width: 65%;
	text-align: start;
}

.alchol-info > dl > dt {
	border-right: 2px solid rgba(0, 0, 0, 0.2);
}
</style>
