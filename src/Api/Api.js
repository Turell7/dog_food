class Api {
  constructor() {
    this.path = 'https://api.react-learning.ru'
    this.group = 'sm8'
    // this.token = ''
  }

  // setNewToken(newToken) {
  //   this.token = newToken
  // }

  async getAllProducts(token, search) {
    try {
      if (search === '') {
        const res = await fetch(`${this.path}/products`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        return res.json()
      }
      const res = await fetch(`${this.path}/products/search?query=${search}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async userSignUp(user) {
    try {
      const { ...prev } = user
      const body = { group: this.group, ...prev }
      const res = await fetch(`${this.path}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      if (res.status !== 200) {
        const answer = await res.json()
        console.log(answer.err.statusCode, answer.message)
        return answer
      }
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async userSignIn(user) {
    try {
      const res = await fetch(`${this.path}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      if (res.status !== 200) {
        const answer = await res.json()
        console.log(answer.err.statusCode, answer.message)
        return answer
      }
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }

  async getInfoAboutMe(token) {
    try {
      const res = await fetch(`${this.path}/v2/sm8/users/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    } catch (Error) {
      throw new Error(Error)
    }
  }
}

const api = new Api()

export {
  api,
}
