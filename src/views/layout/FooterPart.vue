<template>
	<footer>
		<div id="footerwrap">
			<p>Contact Us</p>
			<dl>
				<dt>데일리샷 제휴 혹은 이용문의</dt>
				<dd v-for="(i, idx) in contactL" :key="idx">
					<span>{{ i.title }}</span>
					<span :class="i.to ? 'point' : false" @click="i.to ? $router.push(i.to).catch(() => {}) : false, subMenu()">{{ i.link }}</span>
				</dd>
			</dl>
			<ul>
				<li v-for="(j, jdx) in comapnyinfo" :key="jdx">
					<span>{{ j.title }}</span> <span>{{ j.content }}</span>
				</li>
			</ul>
		</div>
	</footer>
</template>
<script>
export default {
	data() {
		return {
			contactL: [
				{ title: '카카오톡', link: '문의하기', to: 'contact' },
				{ title: '이메일', link: 'contact@dailyshot.co.kr' },
				{ title: '대표전화', link: '02-6931-3636' },
			],
			comapnyinfo: [
				{ title: '(주)데일리샷 대표', content: '김민욱' },
				{ title: '사업자등록번호', content: '278-86-00984' },
				{ title: '주소', content: '서울시 강남구 언주로 93길 27, 6층' },
			],
		}
	},
	methods: {
		subMenu() {
			for (let i of document.querySelectorAll('.selected')) {
				i.classList.remove('selected')
			}
		},
	},
}
</script>
<style lang="scss" scoped>
footer {
	padding: 27px;
	z-index: 10;
	box-shadow: 0 -0.5px 1px rgba(0, 0, 0, 0.2);
}
ul {
	padding: 0;
}
li {
	list-style: none;
}

.point {
	cursor: pointer;
}

#footerwrap {
	font-size: 12px;
}
#footerwrap > p {
	font-size: 20px;
	font-weight: 600;
	margin-bottom: 0px;
}
dl {
	margin-bottom: 16px;
}
dt {
	margin: 1em 0;
}
dd,
li {
	margin-bottom: 0.5em;
}

dd > span:nth-child(1),
li > span:nth-child(1) {
	padding-right: 10px;
	margin-right: 10px;
	border-right: 1.3px solid rgba(81, 81, 81, 0.4);
}

dd:nth-child(2) > span:nth-child(2) {
	text-decoration: underline;
}

li:first-child > span:nth-child(1) {
	border: none;
}
</style>
