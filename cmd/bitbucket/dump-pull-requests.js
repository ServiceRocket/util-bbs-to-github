(function () {
  "use strict";
}());

const rp = require("request-promise-native")

exports.command = "dump-pull-request <repository> <pull-request> [options]"
exports.desc = "Dump everything about the specified pull request"
exports.builder = (yargs) => {
  return yargs
    .env("BITBUCKET")
    .demandOption(["url", "username", "password"])
}
exports.handler = (argv) => {

  let [project, repository] = argv.repository.split("/")
  let url = `${argv.url}/rest/api/1.0/projects/${project}/repos/${repository}/pull-requests/${argv.pullRequest}`

  let request = {
    uri: url,
    auth: {
      username: argv.username,
      password: argv.password
    },
    json: true
  }

  rp(request)
    .then((body) => {

      let out = { pullRequest: body, activities: null }

      rp({...request, ...{ uri: `${url}/activities`}})
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
