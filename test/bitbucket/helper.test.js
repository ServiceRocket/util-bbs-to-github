import test from "tape-promise/tape"
import faker from "faker"
import sinon from "sinon"

import rp from "request-promise-native"
import BitbucketHelper from "../../lib/bitbucket/helper"

let auth = { username: faker.internet.userName, password: faker.internet.password }

test("should return JSON dump by default", async (t) => {

  t.plan(2)

  sinon.stub(rp, 'get')
    .onCall(0).resolves({ id: 1, fromRef: {}, toRef: {} })
    .onCall(1).resolves({ size: 0 })
  let pull = await new BitbucketHelper("https://bitbucket.local/", {}).getPullRequest("PROJ/ect", 1)

  t.ok(pull.pullRequest != null)
  t.ok(pull.activities != null)
  rp.get.restore()
  t.end()
})

test("should fail if invalid pull-request ID is given", async (t) => {

  t.plan(2)
  sinon.stub(rp, 'Request') // to avoid some `auth` issues.
  sinon.stub(rp, 'get').throws(new Error("404 - {}"))

  try {
    await new BitbucketHelper("https://bitbucket.local/", auth).getPullRequest("PROJ/ect", 1)
  } catch (e) {
    console.log(e)
    // We have to test in a catch due to promise-related error similar to:
    // https://github.com/mochajs/mocha/issues/2797
    // Still, something isn't right when error is throw upon `get()`: the `catch()` isn't invoked.
    t.ok(e.message.match(/404/))
    t.notOk(e.message.includes("Could not retrieve activities"), "as it has stopped process the pull request further")
  }
  rp.get.restore()
  t.end()
})
