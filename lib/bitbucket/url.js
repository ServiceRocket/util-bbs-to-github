(function () {
  "use strict"
}())

class BitbucketUrlHelper {

  constructor(base) {
    this.base = base
  }

  project = (p) => `${this.base}/rest/api/1.0/projects/${p}`
  repository = (p, r) => `${this.project(p)}/repos/${r}`
  pullRequest = (p, r, q) => `${this.repository(p, r)}/pull-requests/${q}`

}

export default BitbucketUrlHelper
