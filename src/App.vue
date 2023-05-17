<template>
	<v-app>
		<nHeader />
		<router-view></router-view>
		<nFooter />
		<v-dialog
			style="z-index: 1000 !important;"
			v-model="loading"
			fullscreen
			overlay-color="transparent"
			transition="dialog-center-transition"
			content-class="mainloadingBar"
		>
			<!-- style="background-color: rgba(255, 255, 255, 0.5);" -->
			<v-container fluid fill-height>
				<v-layout justify-center align-center>
					<v-progress-circular indeterminate :size="100" :width="5" color="grey lighten-1"> </v-progress-circular>
				</v-layout>
			</v-container>
		</v-dialog>
	</v-app>
</template>

<script>
import { nHeader } from './views/codeMachine/index'
import { nFooter } from './views/codeMachine/index'

export default {
	components: {
		nHeader,
		nFooter,
	},
	name: 'App',
	// Watch를 이용한 구문 사용해보는것도 좋음(다만)
	data() {
		return {
			loading: this.$store.state.loadnow,
		}
	},
	computed: {
		loadnow() {
			return this.$store.state.loadnow
		},
	},
	watch: {
		loadnow(val) {
			this.loading = val
		},
	},
	created() {
		this.$appbus.$on('loading::show', () => {
			this.loading = true
		})
		this.$appbus.$on('loading::hide', () => {
			this.loading = false
		})
	},
	mounted() {},
}
</script>
<style lang="scss">
@import './public/css/global.scss';

.v-application--wrap {
	width: 100% !important;
	margin: 0 auto;
	flex: none !important;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	padding: 34px 0 95px;
}

@media screen and (min-width: 649px) {
	.v-application--wrap {
		width: 648px !important;
	}
}
</style>
