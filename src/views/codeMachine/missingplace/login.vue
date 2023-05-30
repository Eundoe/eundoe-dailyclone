<template>
	<div id="loginwrap">
		<h1>loginpage</h1>
		<form>
			<fieldset>
				<legend>
					<v-text-field
						v-for="(i, idx) of loginform"
						:rules="rules"
						:key="idx"
						:label="i.content"
						hide-details="auto"
						:class="i.cname"
					></v-text-field>
					<v-btn color="orange" @click="login()">로그인</v-btn>
				</legend>
			</fieldset>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			rules: [value => !!value || '공란입니다.', value => (value && value.length >= 1) || 'Min 1 characters'],
			loginform: [
				{ cname: 'member_id', ctype: 'text', content: '아이디' },
				{ cname: 'member_password', ctype: 'password', content: '패스워드' },
			],
			loginset: {
				member_id: '',
				member_password: '',
			},
		}
	},
	methods: {
		login() {
			for (let i of this.loginform) {
				let value = document.querySelector('div.' + i.cname + ' input').value
				if (value === '') {
					return false
				} else {
					this.loginset[i.cname] = value
				}
			}

			this.$store
				.dispatch('login', { identifier: this.loginset.member_id, password: this.loginset.member_password })
				.then(response => {
					console.log(response)
					localStorage.setItem('token', response.data.login.jwt)
				})
				.catch(error => {
					// Handle error.
					console.log('An error occurred:', error.response)
				})
		},
	},
}
</script>
<style lang="scss" scoped>
div#loginwrap {
	width: 100%;
	padding: 10px 25px;
}

div#loginwrap > h1 {
	line-height: 1.4em;
	margin-bottom: 25px;
}

div#loginwrap > form {
	margin-bottom: 24px;
}

fieldset {
	border: none;
}

fieldset > legend {
	width: 60%;
	margin: 0 auto;
	padding: 25px;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
	text-align: center;
}

.lbtnactive {
	color: #fff;
	background-color: orangered;
}

fieldset > legend > div {
	margin-bottom: 20px;
}
</style>
