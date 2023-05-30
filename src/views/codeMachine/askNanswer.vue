<template>
	<div id="contwrap">
		<h2>Contact</h2>
		<!-- <v-form ref="contform" lazy-validation> -->
		<v-row>
			<v-col cols="12" v-for="(cont, idx) in formDate" :key="idx">
				<v-text-field
					v-if="cont.type == 'input'"
					required
					v-model="submitForm[cont.name]"
					:label="cont.title"
					:error="cont.error"
					:error-messages="cont.ermessage"
					dense
					class="mt-2 mb-2 pt-2 pb-2 "
					color="orange darken-2"
					@blur="checkmessage(cont.name)"
				>
				</v-text-field>
				<v-textarea
					class=" pt-2 pb-2 black--text"
					v-if="cont.type == 'textarea'"
					no-resize
					v-model="submitForm[cont.name]"
					:label="cont.title"
					color="orange darken-2"
					counter
					:error="cont.error"
					:error-messages="cont.ermessage"
					@blur="checkmessage(cont.name)"
				>
				</v-textarea>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-btn :ripple="false" style="color: black;" large class="pa-5" color="orange" @click="confirmMessage" v-text="'보내기'"></v-btn>
		</v-row>
		<!-- </v-form> -->
	</div>
</template>

<script>
export default {
	computed: {},
	data() {
		return {
			realvalid: false,
			formDate: [
				{
					title: '이메일',
					type: 'input',
					name: 'contact_email',
					// rules: [v => !!v || '이메일은 필수 사항입니다.', v => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v) || '이메일 양식이 맞지 않습니다.'],
					error: false,
					ermessage: '',
				},
				{
					title: '이름',
					type: 'input',
					name: 'contact_name',
					// rules: [
					// 	v => !!v || '이름은 필수 사항입니다.',
					// 	v => !/[~!@#$%^&*()_+|<>?:{}.;|/'"]/.test(v) || '이름에는 특수문자를 사용할 수 없습니다.',
					// 	v => !(v && v.length >= 8) || '이름은 8글자 이상 입력할 수 없습니다.',
					// ],
					error: false,
					ermessage: '',
				},
				{
					title: '제목',
					type: 'input',
					name: 'contact_title',
					// rules: [v => !!v || '제목은 필수입니다.', v => /[a-zA-z가-힣]{1,}/.test(v) || '제목이 잘못 되었어요'],
					error: false,
					ermessage: '',
				},
				{
					title: '문의사항',
					type: 'textarea',
					name: 'contact_content',
					// rules: [v => !!v || '내용은 필수입니다.', v => /[a-zA-z가-힣]{1,}/.test(v) || '한글 또는 영어만 가능합니다.'],
					error: false,
					ermessage: '',
				},
			],
			submitForm: {
				contact_email: '',
				contact_title: '',
				contact_content: '',
				contact_name: '',
			},
		}
	},
	methods: {
		checkmessage(x) {
			let regex = {
				contact_email: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
				contact_title: /[a-zA-z가-힣]{1,}/,
				contact_content: /[a-zA-z가-힣]{1,}/,
				contact_name: /[a-zA-z가-힣]{1,}/,
			}
			if (this.submitForm[x].length < 1) {
				for (let i of this.formDate) {
					if (i.name === x) {
						i.ermessage = '필수 작성 내용입니다.'
						i.error = true
					}
				}
				return (this.realvalid = false)
			} else {
				if (!regex[x].test(this.submitForm[x])) {
					for (let k of this.formDate) {
						if (k.name === x) {
							k.ermessage = '잘못 된 포맷입니다 다시 작성해주세요'
							k.error = true
						}
					}
					return (this.realvalid = false)
				} else {
					for (let l of this.formDate) {
						if (l.name === x) {
							l.ermessage = ''
							l.error = false
						}
					}
					return (this.realvalid = true)
				}
			}
		},

		confirmMessage() {
			// const validate = this.$refs['contform'].validate()
			for (let i of Object.keys(this.submitForm)) {
				this.checkmessage(i)
			}

			if (this.realvalid) {
				this.$axios({
					method: 'post',
					url: 'http://localhost:1337/contactdata',
					data: {
						contact_email: this.submitForm.contact_email,
						contact_name: this.submitForm.contact_name,
						contact_title: this.submitForm.contact_title,
						contact_content: this.submitForm.contact_content,
					},
					onUploadProgress: this.$store.commit('setLoadNow'),
				})
					.then(res => {
						this.$store.commit('setLoadNow')
						console.log(res)
					})
					.then(() => {
						alert('등록이 완료되었습니다.')
						for (let k of this.formDate) {
							this.submitForm[k.name] = ''
						}
					})
					.catch(err => {
						this.$store.commit('setLoadNow')
						console.log(err)
						alert(
							'현재 서비스 점검중입니다. 잠시 후 다시 시도해주세요. \n지속적인 서비스 장애가 발생시 하기로 연락부탁드립니다. \n고객센터 : 0000-1111',
						)
					})
			} else {
				console.log('실패!')
			}
		},
	},
}
</script>
<style lang="scss" scoped>
fieldset {
	border: none;
}

ul {
	padding: 0;
}

input {
	border: none;
	padding: 0;
	margin: 0;
	outline-color: blue;
}

#contwrap {
	padding: 40px 28px;
}

#contwrap legend {
	width: 100%;
}

#contwrap > h2 {
	font-size: 38px;
	margin-bottom: 20px;
}

#contwrap > form {
	box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
	padding: 30px 10px;
	margin: 30px 0;
}

.v-text-field input {
	font-size: 20px;
}
.v-text-field .v-messages {
	padding: 2px 0 !important;
	font-size: 14px !important;
}
</style>
