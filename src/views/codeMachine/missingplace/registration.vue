<template>
	<div id="registwrap">
		<h1>회원등록</h1>
		<v-container>
			<v-flex class="ma-5">
				<v-text-field
					v-for="(item, idx) in regist"
					:key="idx"
					v-model="registset[item.cname]"
					:label="item.content"
					:error="item.error"
					:error-messages="item.erMessage"
					color="orange darken-2"
					@blur="checkblorreg(item.cname)"
					:type="item.ctype === 'password' ? 'password' : 'text'"
				>
				</v-text-field>
			</v-flex>
			<v-row justify="center">
				<v-btn v-text="'등록하기'" :ripple="false" style="color: black;" large class="pa-5" color="orange" @click="checkMemberid"></v-btn>
			</v-row>
		</v-container>
	</div>
</template>
<script>
export default {
	data() {
		return {
			realvalid: false,
			regist: [
				{
					cname: 'member_name',
					ctype: 'text',
					content: '이름',
					cregex: '',
					error: false,
					erMessage: '',
				},
				{
					cname: 'member_id',
					ctype: 'text',
					content: '아이디',
					cregex: '',
					error: false,
					erMessage: '',
				},
				{
					cname: 'member_password',
					ctype: 'password',
					content: '비밀번호',
					cregex: '',
					error: false,
					erMessage: '',
				},
			],
			registset: {
				member_name: '',
				member_id: '',
				member_password: '',
			},
		}
	},
	methods: {
		checkblorreg(x) {
			let regex = {
				member_name: /[a-zA-z가-힣]{1,}/,
				member_id: /^[a-z]+[a-z0-9]{5,19}$/g,
				member_password: /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
			}
			console.log(regex)
			if (this.registset[x].length < 1) {
				for (let i of this.regist) {
					if (i.cname === x) {
						i.erMessage = '빈칸이네요?'
						i.error = true
					}
				}
				return (this.realvalid = false)
			} else {
				if (!regex[x].test(this.registset[x])) {
					for (let j of this.regist) {
						if (j.cname === x) {
							j.erMessage = '제대로 입력해주세요 '
							j.error = true
						}
					}
					return (this.realvalid = false)
				} else {
					for (let k of this.regist) {
						if (k.cname === x) {
							k.erMessage = ''
							k.error = false
						}
					}
					console.log('톹ㅇ과이!')
					return (this.realvalid = true)
				}
			}
		},

		checkMemberid() {
			for (let i of Object.keys(this.registset)) {
				this.checkblorreg(i)
			}
			console.log(this.realvalid)
			if (this.realvalid) {
				this.$axios
					.get('http://localhost:1337/members')
					.then(res => {
						if (res.data.filter(x => x.member_id === this.registset.member_id).length > 0) {
							alert('이미 가입된 회원입니다.')
							return false
						} else {
							this.postMember()
						}
					})
					.catch(err => {
						console.log(err)
						alert('현재 아이디 확인이 안됩니다.')
						return false
					})
			}
		},

		postMember() {
			this.$axios({
				method: 'post',
				url: 'http://localhost:1337/members',
				data: this.registset,
				onUploadProgress: this.$store.commit('setLoadNow'),
			})
				.then(res => {
					console.log(res)
					this.$store.commit('setLoadNow')
				})
				.then(() => {
					alert('등록이 완료되었습니다.')
					for (let i of Object.keys(this.regist)) {
						this.registset[i.cname] = ''
					}
				})
				.catch(err => {
					this.$store.commit('setLoadNow')
					console.log(err)
					alert(
						'현재 서비스 점검중입니다. 잠시 후 다시 시도해주세요. \n지속적인 서비스 장애가 발생시 하기로 연락부탁드립니다. \n고객센터 : 0000-1111',
					)
				})
		},
	},
}
</script>
<style lang="scss" scoped>
fieldset {
	border: none;
	margin: 0;
	padding: 0;
}

ul {
	padding: 0;
}

div#registwrap {
	padding: 25px;
}

div#registwrap > h1 {
	text-align: center;
	font-weight: 700;
	margin-bottom: 20px;
}

div#registwrap > form,
div#registwrap fieldset,
div#registwrap legend {
	width: 100%;
}

div#registwrap legend {
	padding: 5px;
	background-color: rgba(247, 247, 247, 0.8);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

ul#registerbox {
	width: 100%;
	margin-bottom: 20px;
}

ul#registerbox > li {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 5px 0;
	padding: 5px 0;
	font-size: 20px;
}

ul#registerbox > li > label {
	max-width: 30%;
	width: 30%;
	text-align: center;
	margin-right: 5px;
}

ul#registerbox > li > input {
	max-width: 60%;
	width: 60%;
	border: 2px solid orange;
	border-radius: 5px;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	line-height: 1.5em;
	text-indent: 5px;
}

button#register {
	background-color: orange;
	padding: 5px 15px;
	font-size: 22px;
	border-radius: 11px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	display: block;
	margin: 0 auto 15px;
}

button#register:active {
	background-color: orangered;
	color: #fff;
}
</style>
