<template>
	<div id="admin_contact">
		<h1>Admin Show Contact</h1>
		<v-container>
			<v-data-table
				hide-default-footer
				:headers="headers"
				:items="test"
				:items-per-page="itemsPerPage"
				:page.sync="page"
				@page-count="pageCount = $event"
				class="elevation-1"
			></v-data-table>
			<div class="text-center pt-2">
				<v-pagination v-model="page" :length="pageCount"></v-pagination>
			</div>
		</v-container>
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
			page: 1,
			pageCount: 0,
			itemsPerPage: 3,
			test: [],
			headers: [
				{
					text: 'IDNO',
					align: 'center',
					value: 'id',
				},
				{ text: 'Title', value: 'contact_title' },
				{ text: 'Email', value: 'contact_email' },
				{ text: 'Name', value: 'contact_name' },
			],
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
