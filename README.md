# BB2GH: Utilities to migrate/copy from Bitbucket to Github

Still in progress.

## How?

Only the dump feature is available for now:

```bash
$ npm install
$ BITBUCKET_USERNAME=foo BITBUCKET_PASSWORD=bar BITBUCKET_URL=https://host \
  npm run --silent bb -- dump-pull-request HIRE/quiz-mmoradian 1
```
