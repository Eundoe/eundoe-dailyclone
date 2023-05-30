<template>
	<div id="admin_contact">
		<h1>Admin Show Contact</h1>
		<ul>
			<li class="tablecol containter">
				<span>No_id</span>
				<span>이름</span>
				<span>제목</span>
				<span>날짜</span>
			</li>
			<li class="empty_cont " v-if="this.test.length < 1">문의사항이 없습니다.</li>
			<li v-else class="containter" v-for="(i, idx) of this.test" :key="idx">
				<span>{{ i.id }}</span>
				<span>{{ i.contact_name }}</span>
				<span>{{ i.contact_title }}</span>
				<span>{{ i.created_at.slice(0, 10) }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	created() {
		this.$axios
			.get('http://localhost:1337/contactdata')
			.then(res => {
				console.log(res)
				this.test = res.data
			})
			.catch(err => {
				console.log(err)
			})
	},
	computed: {},
	data() {
		return {
			test: [],
		}
	},
}
</script>

<style lang="scss" scoped>
div#admin_contact {
	padding: 5px 10px;
}

ul {
	padding: 10px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

li.tablecol {
	width: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	border: 1px solid rgba(0, 0, 0, 0.2);
}

li.tablecol > span:nth-child(3) {
	text-decoration: none !important;
}

.empty_cont {
	width: 100%;
	text-align: center;
	padding: 10px;
}

li.containter {
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 5px 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	margin: 3px 0;
}

li.containter > span {
	width: 25%;
	text-align: center;
}

li.containter > span:nth-child(3) {
	text-decoration: underline;
}
</style>
