import axios from 'axios'

class Service {
  constructor() {
    let service = axios.create({
      baseURL: 'https://api.pokemontcg.io/v1/',
      withCredentials: false,
    })

    this.service = service
  }

  handleSuccess(response) {
    return Promise.resolve(response)
  }

  handleError = (error) => {
    return Promise.reject(error)
  }

  get(path, params = {}) {
    return this.service
      .get(path, params)
      .then((response) => this.handleSuccess(response))
      .catch((response) => this.handleError(response))
  }

  patch(path, payload) {
    return this.service
      .request({
        method: 'PATCH',
        url: path,
        responseType: 'json',
        data: payload,
      })
      .then((response) => this.handleSuccess(response))
      .catch((response) => this.handleError(response))
  }

  post(path, payload) {
    return this.service
      .request(
        {
          method: 'POST',
          url: path,
          responseType: 'json',
          data: payload,
        },
        { withCredentials: false }
      )
      .then((response) => this.handleSuccess(response))
      .catch((response) => this.handleError(response))
  }

  delete(path, payload) {
    return this.service
      .request(
        {
          method: 'DELETE',
          url: path,
          responseType: 'json',
          data: payload,
        },
        { withCredentials: false }
      )
      .then((response) => this.handleSuccess(response))
      .catch((response) => this.handleError(response))
  }
}

export default new Service()
