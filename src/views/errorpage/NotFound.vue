<template>
	<div class="not-found-container">
		<div class="text-center">
			<h1 class="not-found-status">404</h1>
			<h2 class="not-found-message">Not Found</h2>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.not-found-container {
	align-items: center;
	background: #fff;
	display: flex;
	justify-content: center;
	min-height: calc(100vh - 130.1px);
	width: 100%;
}

.not-found-status {
	font-size: 10rem;
	font-weight: 400;
	line-height: 1;
	margin: 0;
}

.not-found-message {
	font-size: 3.25rem;
	font-weight: 300;
	line-height: 1;
	margin: 0;
}
</style>

<script>
export default {
	name: 'not-found',
	metaInfo: {
		title: '404 Not Found',
	},
}
</script>
