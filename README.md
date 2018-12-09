# BB2GH: Utilities to migrate/copy from Bitbucket to Github

Still in progress.

## How?

Only the dump feature is available for now:

```bash
$ npm install
$ BITBUCKET_USERNAME=foo BITBUCKET_PASSWORD=bar BITBUCKET_URL=https://host \
  node bb2gh.js bb dump-pull-request REPO/project 1
```
