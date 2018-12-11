(function () {
  "use strict"
}())

import rp from "request-promise-native"
import UrlHelper from "./url"

export default class {

  constructor(uri, auth) {

    this.uri = uri;
    this.urlHelper = new UrlHelper(uri)
    this.auth = auth;
  }

  _parseRepository(name) {
    return name.split("/")
  }

  async getPullRequest(repository, pullRequest) {

    let prArgs = [...this._parseRepository(repository), pullRequest]

    let request = {
      uri: `${this.urlHelper.pullRequest(...prArgs)}`,
      auth: { ...this.auth },
      json: true
    }

    let response = await rp.get(request)
      .then(async (body) => {
        let out = { pullRequest: body, activities: null }
        console.log(request)
        return await rp.get({ ...request, ...{ uri: `${this.urlHelper.pullRequest(...prArgs)}/activities` }})
          .then(async (body) => {
            out.activities = body
            return out
          })
          .catch(async (err) => {
            err.message = `Could not retrieve activities of pull request #${pullRequest} -- ${err.message}`
            throw err
          })
      }).catch(async (err) => {
        err.message = `Could not retrieve pull request #${pullRequest} -- ${err.message}`
        throw err
      })
    
    return response
  }

}
