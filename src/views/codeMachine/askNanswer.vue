<template>
	<div id="contwrap">
		<h2>Contact</h2>
		<form action="#" method="post">
			<fieldset>
				<legend>
					<ul>
						<li v-for="(i, idx) in this.formDate" :key="idx" :class="i.name">
							<label :for="i.name">{{ i.title }}</label>
							<input
								v-if="i.type === 'input'"
								:name="i.name"
								:placeholder="i.content"
								v-model="submitForm[i.name]"
								@blur="i.check !== '' ? checkRegex(i.check, $event, idx) : false"
							/>
							<textarea
								v-if="i.type === 'textarea'"
								:name="i.name"
								:placeholder="i.content"
								v-model="submitForm[i.name]"
								type="text"
								row="5"
								cols="30"
								@blur="i.check !== '' ? checkRegex(i.check, $event, idx) : false"
							></textarea>
							<span class="warningsub" :class="i.checkresult === false ? 'openwarn' : false">잘못된 {{ i.title }} 입니다.</span>
							<span class="emptysub" :class="i.checkresult === 'empty' ? 'openwarn' : false">필수항목 입니다.</span>
						</li>
					</ul>
					<button type="submit" v-on:click="notFoundPage($event)">보내기</button>
				</legend>
			</fieldset>
		</form>
	</div>
</template>

<script>
export default {
	computed: {},
	data() {
		return {
			formDate: [
				{
					title: '이메일',
					content: 'sample@domain.com',
					type: 'input',
					name: 'contact_email',
					check: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
					checkresult: true,
				},
				{ title: '이름', content: '홍길동', type: 'input', name: 'contact_name', check: /^[가-힣]{2,4}$/, checkresult: true },
				{
					title: '제목',
					content: '제목을 적어주세요',
					type: 'input',
					name: 'contact_title',
					check: /[a-zA-z가-힣]{1,}/,
					checkresult: true,
				},
				{
					title: '문의사항',
					content: '문의사항을 적어주세요',
					type: 'textarea',
					name: 'contact_content',
					check: /[a-zA-z가-힣]{1,}/,
					checkresult: true,
				},
			],
			submitForm: {
				contact_email: '',
				contact_title: '',
				contact_content: '',
				contact_name: '',
			},
			errorcode: [],
			wrongcode: [],
		}
	},
	methods: {
		notFoundPage(e) {
			e.preventDefault()
			this.confirmMessage()
		},
		checkRegex(x, e, idx) {
			if (e.target.value.length < 1) {
				this.formDate[idx].checkresult = 'empty'
				this.errorcode.push(this.formDate[idx].title)
			} else {
				if (this.errorcode.length > 0) {
					this.errorcode = this.errorcode.filter(item => {
						return item !== this.formDate[idx].title
					})
				}

				let result = x.test(e.target.value)
				this.formDate[idx].checkresult = result
				if (!result) {
					this.wrongcode.push(this.formDate[idx].title)
				} else {
					if (this.wrongcode.length > 0) {
						this.wrongcode = this.wrongcode.filter(item => {
							return item !== this.formDate[idx].title
						})
					}
				}
			}
		},
		confirmMessage() {
			for (let j of Object.keys(this.submitForm)) {
				if (this.submitForm[j].length < 1) {
					for (let k of this.formDate) {
						if (k.name === j) {
							k.checkresult = 'empty'
							this.errorcode.push(k.title)
						}
					}
				}
			}

			if (this.wrongcode.length > 1 || this.errorcode.length > 1) {
				if (this.wrongcode.length >= 1) {
					alert(`잘못된 ${this.wrongcode.join(',')}이 있습니다. 전부 작성해주세요`)
				}

				if (this.errorcode.length >= 1) {
					alert(`비어있는 ${this.errorcode.join(',')}이 있습니다. 전부 작성해주세요`)
				}
				return false
			}

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
					console.log('등록이완료되었습니다.')
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
	padding: 10px 28px;
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
	padding: 30px 5px;
	margin: 30px 0;
}

#contwrap > form legend > ul {
	margin-bottom: 20px;
}

#contwrap > form legend > ul > li {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 10px 0;
	flex-wrap: wrap;
}

#contwrap > form legend > ul > li > label {
	max-width: 30%;
	min-width: 30%;
	font-size: 22px;
	box-sizing: border-box;
	padding: 5px 15px;
	line-height: 1.5em;
	text-align: center;
	margin-right: 10px;
	border-right: 1px solid rgba(0, 0, 0, 0.8);
}

#contwrap > form legend > ul > li > input,
textarea {
	width: 65%;
	border: 2px solid orange;
	font-size: 22px;
	line-height: 1.5em;
	padding: 5px 10px;
	border-radius: 5px;
	background-color: #fff;
}

#contwrap > form legend > ul > li > input:focus,
textarea:focus {
	outline-color: orangered;
	outline-width: 0.2px;
}

#contwrap > form legend > ul > li > input::placeholder,
textarea::placeholder {
	color: rgba(0, 0, 0, 0.4);
}

#contwrap > form legend > ul > li > textarea {
	min-height: 150px;
	resize: none;
}

#contwrap > form legend > button {
	padding: 8px 24px;
	font-size: 22px;
	background-color: orange;
	display: block;
	margin: 0 auto;
	border-radius: 25px;
}

#contwrap > form legend > button:active {
	background-color: orangered;
	color: #fff;
}

.warningsub {
	height: 0;
	font-size: 0;
	padding: 0;
	width: 100%;
	text-align: center;
	color: red;
	transition: all 0.2s linear;
	font-weight: 600;
	margin: 0;
}

.emptysub {
	height: 0;
	font-size: 0;
	padding: 0;
	margin: 0;
	width: 100%;
	text-indent: 200px;
	color: rgb(255, 81, 0);
	transition: all 0.2s linear;
	font-weight: 600;
}

span.openwarn {
	height: auto;
	margin: 5px 0;
	font-size: 14px;
	line-height: 1.5em;
}
</style>
