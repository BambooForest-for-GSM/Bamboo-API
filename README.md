# bamboo-server

GSM 대나무숲 서버

## 시작하기

- install package

```sh
$ yarn
```

- write .env (refer .env.example)

```env
PORT=
MONGO_URL=
DISCORD_WEBHOOK=
DISCORD_TEST_WEBHOOK=
DISCORD_MANAGEMENT_WEBHOOK=
ADMIN_PASSWORD=
JWT_SECRET=
```

- start

```sh
$ yarn start
```

## API명세서

헤더에 `Auth`가 들어갈 경우 관리자 세션이 필요합니다.
하지만 `continue`가 `true`일 경우, 관리자 세션이 없어도 됩니다.

관리자 세션은 `Authorization header`에 넣어주시면 됩니다.

### /post

#### GET / (Auth, continue : true)

조건에 부합하는 게시물 리스트를 가져옵니다.

- request

```uri
baselink/post?count=20&cursor=60b8407473d81a1b4cc591a5&status=PENDING
```

`count`는 한번에 몇개를 가져올지를 나타냅니다.  
`cursor`은 현재 어디에 위치했고, 어디 이후부터 게시물을 가져올지에 대해 나타냅니다.  
`status`는 어떤 상태의 게시물을 가져올지를 나타냅니다.(관리자 세션이 없을 경우에 `ACCEPTED` 상태의 게시물만 가져올 수 있습니다.)

- response

```
{
    "posts": [
        {
            "id": "60afb66f5852e30588334e69",
            "number": 8,
            "title": "귀찮다",
            "content": "뭐가 문제일가아아아아",
            "tag": "test",
            "createdAt": 1622128146794,
            "status": "ACCEPTED"
        },
        {
            "id": "60adb53983bf814e4072a3bb",
            "number": 7,
            "title": "귀찮다",
            "content": "아무것도 하기 싫어요",
            "tag": "test",
            "createdAt": 1623108308077,
            "status": "ACCEPTED"
        },
        {
            "id": "60afb7360631945f14e6d7a1",
            "number": 6,
            "title": "귀찮다",
            "content": "뭐가 문제일가아아아아",
            "tag": "test",
            "createdAt": 1622128433660,
            "status": "ACCEPTED"
        },
        {
            "id": "60afb714d699b84cfcbfa573",
            "number": 5,
            "title": "귀찮다",
            "content": "뭐가 문제일가아아아아",
            "tag": "test",
            "createdAt": 1622128293684,
            "status": "ACCEPTED"
        },
        {
            "id": "60ae06c4fdc4990b50c89fda",
            "number": 4,
            "title": "귀찮다",
            "content": "아무것도 하기 싫어요",
            "tag": "test",
            "createdAt": 1623107733965,
            "status": "ACCEPTED"
        }
    ],
    "cursor": 4,
    "hasNext": false
}
```

`posts`는 가져온 `posts` 게시물들의 리스트입니다.
`cursor`은 가져온 `posts` 게시물들 중, 가장 작은 `number`를 가진 `posts`의 `number`를 나타냅니다.
`hasNext`는 다음에 더 게시물을 가져올 수 있는지에 대한 답변입니다.

### /auth

#### POST /

관리자 비번을 인증하고, 성공시 관리자 세션을 제공해주는 jwt토큰을 제공합니다.

- request

```json
{
  "password": ".env ADMIN_PASSWORD"
}
```

- response

```json
{
  "token": "some jwt token"
}
```
