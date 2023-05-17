import Vue from 'vue'
import Vuex from 'vuex'
import apollo from '../apollo/config'
import { login } from '../apollo/mutation'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		loadnow: false,
		barpos: 0,
		purchadata: {
			id: '',
			name: '',
			price: 0,
			sale: 0,
			rating: 0,
			src: '',
			rdate: '',
			selling: 0,
			altype: '',
			saleprice: 80000,
			wishList: false,
			tag: [],
		},
		alcholdata: [
			{
				id: 0,
				name: '위스키',
				price: 100000,
				sale: 20,
				rating: 3,
				src: './image/alchol/whiskey.png',
				rdate: '2021-01-02',
				selling: 5,
				altype: 'whiskey',
				saleprice: 80000,
				wishList: false,
				tag: [
					{ tname: '선물용', cname: 'tpresent' },
					{ tname: '세일중', cname: 'tsale' },
				],
				taste: [
					{ title: 'Aroma', value: ['다크초콜릿', '블랙커런트', '설탕', '체리', '솔잎'] },
					{ title: 'Taste', value: ['후추', '해초', '블랙커런트', '체리', '아몬드', '에스프레소'] },
					{ title: 'Finish', value: ['커피', '초콜릿을 입힌 체리', '스파이시한 피니시'] },
				],
				info: [
					{ title: '종류', value: '싱글몰트 위스키' },
					{ title: '용량', value: 700 },
					{ title: '도수', value: 57.1 },
					{ title: '국가', value: '스코틀랜드' },
					{ title: '케이스', value: true },
				],
			},
			{
				id: 1,
				name: '와인',
				price: 50000,
				sale: 40,
				rating: 4,
				src: './image/alchol/wine.png',
				rdate: '2019-03-21',
				selling: 10,
				altype: 'wine',
				saleprice: 30000,
				wishList: false,
				tag: [
					{ tname: '선물용', cname: 'tpresent' },
					{ tname: '세일중', cname: 'tsale' },
				],
				taste: [
					{ title: 'Aroma', value: ['신선한 과일', '바닐라', '오크', '초콜릿'] },
					{ title: 'Taste', value: ['자두', '블랙베리', '체리', '블루베리', '딸기'] },
					{ title: 'Finish', value: ['부드러운', '진한', '풀바디', '달콤한'] },
				],
				info: [
					{ title: '종류', value: '레드와인' },
					{ title: '용량', value: 750 },
					{ title: '도수', value: 14 },
					{ title: '국가', value: '이탈리아' },
					{ title: '품종', value: '프리미티보' },
				],
			},
			{
				id: 2,
				name: '스피릿',
				price: 80000,
				sale: 10,
				rating: 5,
				src: './image/alchol/spirits.png',
				rdate: '2020-04-05',
				selling: 2,
				altype: 'spirits',
				saleprice: 72000,
				wishList: true,
				tag: [
					{ tname: "MD'spick", cname: 'trecommand' },
					{ tname: '세일중', cname: 'tsale' },
				],
				taste: [
					{ title: 'Aroma', value: ['밝고 상쾌한 주니퍼향', '꽃향'] },
					{ title: 'Taste', value: ['생강', '시트러스', '향신료'] },
					{ title: 'Finish', value: ['후추같은 드라이함', '깔끔한 피니쉬'] },
				],
				info: [
					{ title: '종류', value: '진' },
					{ title: '용량', value: 700 },
					{ title: '도수', value: 46 },
					{ title: '국가', value: '영국' },
					{ title: '케이스', value: false },
				],
			},
			{
				id: 3,
				name: '전통소주',
				price: 70000,
				sale: 70,
				rating: 1,
				src: './image/alchol/soju.png',
				rdate: '2022-12-11',
				selling: 1,
				altype: 'soju',
				saleprice: 21000,
				wishList: false,
				tag: [
					{ tname: "MD'spick", cname: 'trecommand' },
					{ tname: '세일중', cname: 'tsale' },
				],
				taste: [
					{ title: 'Aroma', value: ['꽃', '은은한 쌀향'] },
					{ title: 'Taste', value: ['풍부한 바디감', '맥아'] },
					{ title: 'Finish', value: ['과일', '깔끔함'] },
				],
				info: [
					{ title: '종류', value: '증류식소주' },
					{ title: '용량', value: 500 },
					{ title: '도수', value: 53 },
					{ title: '국가', value: '한국' },
					{ title: '케이스', value: true },
				],
			},
			{
				id: 4,
				name: '고량주',
				price: 92000,
				sale: 0,
				rating: 2,
				src: './image/alchol/gaoryang.png',
				rdate: '2023-04-24',
				selling: 11,
				altype: 'goryang',
				saleprice: 92000,
				wishList: false,
				tag: [
					{ tname: '베스트셀러', cname: 'tbest' },
					{ tname: '재고임박', cname: 'tstock' },
				],
				taste: [
					{ title: 'Aroma', value: ['꽃향기', '자두', '건자두'] },
					{ title: 'Taste', value: ['달콤함', '상쾌함'] },
					{ title: 'Finish', value: ['깔끔한 마무리'] },
				],
				info: [
					{ title: '종류', value: '고량주' },
					{ title: '용량', value: 375 },
					{ title: '도수', value: 52 },
					{ title: '국가', value: '중국' },
					{ title: '케이스', value: true },
				],
			},
		],
	},

	mutations: {
		movevalue(state, payload) {
			state.barpos = payload
		},
		setPurcha(state, idx) {
			state.purchadata = state.alcholdata.filter(item => {
				return item.id === idx
			})[0]
		},
		setWishlist(state, idn) {
			state.purchadata.wishList = !state.purchadata.wishList
			for (let item of state.alcholdata) {
				item.id === idn ? (item.wishList = state.purchadata.wishList) : false
			}
		},
		setLoadNow(state) {
			state.loadnow = !state.loadnow
		},
	},
	actions: {
		whatLoadnow(cont) {
			cont.commit('setLoadNow')
			setTimeout(() => {
				cont.commit('setLoadNow')
			}, 1000)
			console.log(this.state.loadnow)
		},
		// eslint-disable-next-line no-empty-pattern
		login({}, input) {
			return new Promise((resolve, reject) => {
				apollo.clients['defaultClient']
					.query({
						query: login,
						variables: input,
					})
					.then(res => {
						resolve(res)
					})
					.catch(err => {
						reject(err)
					})
			})
		},
	},
	modules: {},
})
