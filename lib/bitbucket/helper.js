(function () {
  "use strict"
}())

import rp from "request-promise-native"
import UrlHelper from "./url"

class BitbucketHelper {

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

    return rp(request)
      .then((body) => {
  
        let out = { pullRequest: body, activities: null }
  
        rp({ ...request, ...{ uri: `${this.urlHelper.pullRequest(...prArgs)}/activities` }})
          .then((body) => {
            out.activities = body
            console.log(JSON.stringify(out, null, 2))
          })
          .catch((err) => {
            console.log(`ERR: ${err}`)
            process.exit(1)
          })
      })
      .catch((err) => {
          console.log(`ERR: ${err}`)
          process.exit(1)
      })
  }

}

export default BitbucketHelper
