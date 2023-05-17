<template>
	<div id="registwrap">
		<h1>회원등록</h1>
		<form>
			<fieldset>
				<legend>
					<ul id="registerbox">
						<li v-for="(i, idx) of regist" :key="idx" class="regconts">
							<label :for="i.cname">{{ i.content }}</label>
							<input :name="i.cname" :id="i.cname" :type="i.ctype" />
						</li>
					</ul>
					<!-- <v-btn elevation="2" @click="checkMemberid()">등록하기</v-btn> -->
					<button id="register" v-on:click="checkMemberid($event)">
						등록하기
					</button>
				</legend>
			</fieldset>
		</form>
	</div>
</template>
<script>
export default {
	data() {
		return {
			regist: [
				{
					cname: 'member_name',
					ctype: 'text',
					content: '이름',
					cregex: '',
				},
				{
					cname: 'member_id',
					ctype: 'text',
					content: '아이디',
					cregex: '',
				},
				{
					cname: 'member_password',
					ctype: 'password',
					content: '비밀번호',
					cregex: '',
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
		checkMemberid(e) {
			e.preventDefault()
			for (let i of this.regist) {
				if (document.querySelector('input[name=' + i.cname + ']').value === '') {
					alert('빈칸 없이 작성해주세요')
					return false
				} else {
					this.registset[i.cname] = document.querySelector('input[name=' + i.cname + ']').value
				}
			}
			console.log(this.registset)
			this.$axios
				.get('http://localhost:1337/members')
				.then(res => {
					// console.log(res)
					console.log()
					if (res.data.filter(x => x.member_id === this.registset.member_id).length > 0) {
						alert('이미 가입된 회원입니다.')
					} else {
						this.postMember()
					}
				})
				.catch(err => {
					console.log(err)
				})
		},

		postMember() {
			this.$axios({
				method: 'post',
				url: 'http://localhost:1337/members',
				data: this.registset,
			})
				.then(res => {
					console.log(res)
				})
				.then(() => {
					alert('등록이 완료되었습니다.')
					for (let j of this.regist) {
						document.querySelector('input[name=' + j.cname + ']').value === ''
						this.registset[j.cname] = ''
					}
				})
				.catch(err => {
					console.log(err)
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
