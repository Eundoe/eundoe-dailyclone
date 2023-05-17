import gql from 'graphql-tag'

export const upload = gql`
	mutation upload($file: Upload!) {
		upload(file: $file) {
			id
			width
			url
		}
	}
`
export const login = gql`
	mutation register {
		login(input: { identifier: "test11@test.com", password: "test1234" }) {
			jwt
		}
	}
`
