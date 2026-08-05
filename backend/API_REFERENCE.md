# StreamCraft Backend — API Reference

Base URL: `http://localhost:8000/api/v1`  
Content-Type (JSON): `application/json`  
Auth header: `Authorization: Bearer <accessToken>`  
Cookies: `accessToken`, `refreshToken` (httpOnly; also returned in login/refresh body)

---

## Standard Response Envelope

All success responses use:

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success message",
  "success": true
}
```

All error responses use:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [],
  "data": null
}
```

---

## Shared Object Shapes

### User (safe — no password/refreshToken)

```json
{
  "_id": "ObjectId",
  "username": "string",
  "email": "string",
  "fullName": "string",
  "avatar": "https://cloudinary/.../image",
  "coverImage": "https://cloudinary/.../image",
  "watchHistory": ["ObjectId"],
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### Owner (nested projection)

```json
{
  "_id": "ObjectId",
  "username": "string",
  "fullName": "string",
  "avatar": "string"
}
```

### Video

```json
{
  "_id": "ObjectId",
  "videoFile": "https://cloudinary/.../video",
  "thumbnail": "https://cloudinary/.../image",
  "title": "string",
  "description": "string",
  "duration": 120.5,
  "views": 0,
  "isPublished": true,
  "owner": "ObjectId | Owner",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

### Paginated list (`mongoose-aggregate-paginate`)

```json
{
  "docs": [],
  "totalDocs": 0,
  "limit": 10,
  "page": 1,
  "totalPages": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

---

## 1. Auth & Users (`/api/v1/users`)

### POST `/api/v1/users/register`
| | |
|---|---|
| **Auth** | Public |
| **Format** | `multipart/form-data` |

| Field | Location | Required |
|---|---|---|
| `fullName` | body | Yes |
| `email` | body | Yes |
| `username` | body | Yes |
| `password` | body | Yes |
| `avatar` | file | Yes |
| `coverImage` | file | No |

**Success `201` — `data`:** User object

---

### POST `/api/v1/users/login`
| | |
|---|---|
| **Auth** | Public |
| **Format** | JSON |

| Field | Required | Notes |
|---|---|---|
| `password` | Yes | |
| `email` | One of email/username | |
| `username` | One of email/username | |

**Success `200` — `data`:**

```json
{
  "user": { /* User */ },
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

Also sets `accessToken` / `refreshToken` cookies.

---

### POST `/api/v1/users/logout`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | — (no body) |

**Success `200` — `data`:** `{}`  
Clears auth cookies.

---

### POST `/api/v1/users/refresh-token`
| | |
|---|---|
| **Auth** | Public (needs refresh token) |
| **Format** | Cookie `refreshToken` **or** JSON `{ "refreshToken": "jwt" }` |

**Success `200` — `data`:**

```json
{
  "accessToken": "jwt",
  "refreshToken": "jwt"
}
```

---

### POST `/api/v1/users/change-password`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | JSON |

| Field | Required |
|---|---|
| `oldPassword` | Yes |
| `newPassword` | Yes (min 6 chars) |

**Success `200` — `data`:** `{}`

---

### GET `/api/v1/users/current-user`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | — |

**Success `200` — `data`:** User object

---

### PATCH `/api/v1/users/update-account`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | JSON |

| Field | Required |
|---|---|
| `fullName` | Yes |
| `email` | Yes |

**Success `200` — `data`:** Updated User

---

### PATCH `/api/v1/users/avatar`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | `multipart/form-data` |

| Field | Required |
|---|---|
| `avatar` (file) | Yes |

**Success `200` — `data`:** Updated User

---

### PATCH `/api/v1/users/cover-image`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | `multipart/form-data` |

| Field | Required |
|---|---|
| `coverImage` (file) | Yes |

**Success `200` — `data`:** Updated User

---

### GET `/api/v1/users/c/:username`
| | |
|---|---|
| **Auth** | Optional JWT (`isSubscribed` only accurate when logged in) |
| **Format** | URL param |

| Param | Required |
|---|---|
| `username` | Yes |

**Success `200` — `data`:**

```json
{
  "_id": "ObjectId",
  "fullName": "string",
  "username": "string",
  "avatar": "string",
  "coverImage": "string",
  "email": "string",
  "subscribersCount": 0,
  "channelsSubscribedToCount": 0,
  "isSubscribed": false
}
```

---

### GET `/api/v1/users/history`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | — |

**Success `200` — `data`:** `Video[]` (each with nested `owner`)

---

## 2. Videos (`/api/v1/videos`)

### GET `/api/v1/videos`
| | |
|---|---|
| **Auth** | Optional JWT |
| **Format** | Query params |

| Query | Required | Default | Notes |
|---|---|---|---|
| `page` | No | `1` | |
| `limit` | No | `10` | Max `50` |
| `query` | No | — | Search title/description |
| `sortBy` | No | `createdAt` | `createdAt` \| `views` \| `duration` \| `title` |
| `sortType` | No | `desc` | `asc` \| `desc` |
| `userId` | No | — | Filter by owner; unpublished only visible to owner |

**Success `200` — `data`:** Paginated list of videos (each with nested `owner`)

---

### POST `/api/v1/videos`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | `multipart/form-data` |

| Field | Required |
|---|---|
| `title` | Yes |
| `description` | Yes |
| `videoFile` (file) | Yes |
| `thumbnail` (file) | Yes |

**Success `201` — `data`:** Created Video

---

### GET `/api/v1/videos/:videoId`
| | |
|---|---|
| **Auth** | Optional JWT |
| **Format** | URL param |

Increments `views`. If authenticated, adds video to watch history.

**Success `200` — `data`:**

```json
{
  "_id": "ObjectId",
  "videoFile": "string",
  "thumbnail": "string",
  "title": "string",
  "description": "string",
  "duration": 0,
  "views": 1,
  "isPublished": true,
  "owner": { /* Owner */ },
  "likesCount": 0,
  "isLiked": false,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

### PATCH `/api/v1/videos/:videoId`
| | |
|---|---|
| **Auth** | Required JWT (owner only) |
| **Format** | `multipart/form-data` (or JSON if no thumbnail) |

| Field | Required |
|---|---|
| `title` | No |
| `description` | No |
| `thumbnail` (file) | No |

At least one field should be provided.

**Success `200` — `data`:** Updated Video

---

### DELETE `/api/v1/videos/:videoId`
| | |
|---|---|
| **Auth** | Required JWT (owner only) |
| **Format** | URL param |

**Success `200` — `data`:** `{}`

---

### PATCH `/api/v1/videos/toggle/publish/:videoId`
| | |
|---|---|
| **Auth** | Required JWT (owner only) |
| **Format** | URL param |

**Success `200` — `data`:** Video (with flipped `isPublished`)

---

## 3. Comments (`/api/v1/comments`)

### GET `/api/v1/comments/:videoId`
| | |
|---|---|
| **Auth** | Optional JWT |
| **Format** | URL param + query |

| Field | Location | Required | Default |
|---|---|---|---|
| `videoId` | param | Yes | |
| `page` | query | No | `1` |
| `limit` | query | No | `10` |

**Success `200` — `data`:** Paginated comments

Each comment doc:

```json
{
  "_id": "ObjectId",
  "content": "string",
  "video": "ObjectId",
  "owner": { /* Owner */ },
  "likesCount": 0,
  "isLiked": false,
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

### POST `/api/v1/comments/:videoId`
| | |
|---|---|
| **Auth** | Required JWT |
| **Format** | JSON + URL param |

| Field | Required |
|---|---|
| `content` | Yes |

**Success `201` — `data`:** Comment (with populated `owner`)

---

### PATCH `/api/v1/comments/c/:commentId`
| | |
|---|---|
| **Auth** | Required JWT (owner only) |
| **Format** | JSON |

| Field | Required |
|---|---|
| `content` | Yes |

**Success `200` — `data`:** Updated Comment

---

### DELETE `/api/v1/comments/c/:commentId`
| | |
|---|---|
| **Auth** | Required JWT (owner only) |
| **Format** | URL param |

**Success `200` — `data`:** `{}`

> Nested replies are not supported (flat comments only).

---

## 4. Likes (`/api/v1/likes`)

All endpoints: **Required JWT**

### POST `/api/v1/likes/toggle/v/:videoId`
**Success `200` — `data`:** `{ "isLiked": true | false }`

### POST `/api/v1/likes/toggle/c/:commentId`
**Success `200` — `data`:** `{ "isLiked": true | false }`

### POST `/api/v1/likes/toggle/t/:tweetId`
**Success `200` — `data`:** `{ "isLiked": true | false }`

### GET `/api/v1/likes/videos`
**Success `200` — `data`:** `Video[]` (each with nested `owner`)

---

## 5. Tweets (`/api/v1/tweets`)

All endpoints: **Required JWT**

### POST `/api/v1/tweets`
| Format | JSON |

| Field | Required |
|---|---|
| `content` | Yes |

**Success `201` — `data`:** Tweet with populated `owner`

---

### GET `/api/v1/tweets/user/:userId`
| Format | URL param |

**Success `200` — `data`:** Tweet array

```json
[
  {
    "_id": "ObjectId",
    "content": "string",
    "owner": { /* Owner */ },
    "likesCount": 0,
    "isLiked": false,
    "createdAt": "ISODate",
    "updatedAt": "ISODate"
  }
]
```

---

### PATCH `/api/v1/tweets/:tweetId`
| Format | JSON | Owner only |

| Field | Required |
|---|---|
| `content` | Yes |

**Success `200` — `data`:** Updated Tweet

---

### DELETE `/api/v1/tweets/:tweetId`
| Format | URL param | Owner only |

**Success `200` — `data`:** `{}`

---

## 6. Subscriptions (`/api/v1/subscriptions`)

All endpoints: **Required JWT**

### POST `/api/v1/subscriptions/c/:channelId`
Toggle subscribe/unsubscribe to a channel (cannot subscribe to self).

**Success `200` — `data`:** `{ "subscribed": true | false }`

---

### GET `/api/v1/subscriptions/c/:channelId`
List subscribers of a channel.

**Success `200` — `data`:**

```json
[
  {
    "_id": "ObjectId",
    "subscriber": { /* Owner */ },
    "createdAt": "ISODate"
  }
]
```

---

### GET `/api/v1/subscriptions/u/:subscriberId`
List channels a user is subscribed to.

**Success `200` — `data`:**

```json
[
  {
    "_id": "ObjectId",
    "channel": { /* Owner */ },
    "createdAt": "ISODate"
  }
]
```

---

## 7. Playlists (`/api/v1/playlist`)

> Note: mount path is singular — `/playlist`, not `/playlists`.  
> All endpoints: **Required JWT**

### POST `/api/v1/playlist`
| Format | JSON |

| Field | Required |
|---|---|
| `name` | Yes |
| `description` | Yes |

**Success `201` — `data`:**

```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "videos": [],
  "owner": "ObjectId",
  "createdAt": "ISODate",
  "updatedAt": "ISODate"
}
```

---

### GET `/api/v1/playlist/user/:userId`
**Success `200` — `data`:** Playlist array with `totalVideos`, `totalViews`, and light `videos[]`

---

### GET `/api/v1/playlist/:playlistId`
**Success `200` — `data`:** Playlist with populated `videos` (each with `owner`) and playlist `owner`

---

### PATCH `/api/v1/playlist/:playlistId`
| Format | JSON | Owner only |

| Field | Required |
|---|---|
| `name` | At least one of name/description |
| `description` | At least one of name/description |

**Success `200` — `data`:** Updated Playlist

---

### DELETE `/api/v1/playlist/:playlistId`
| Owner only |

**Success `200` — `data`:** `{}`

---

### PATCH `/api/v1/playlist/add/:videoId/:playlistId`
| Owner only |

**Success `200` — `data`:** Updated Playlist

---

### PATCH `/api/v1/playlist/remove/:videoId/:playlistId`
| Owner only |

**Success `200` — `data`:** Updated Playlist

---

## 8. Dashboard (`/api/v1/dashboard`)

All endpoints: **Required JWT** (stats for the authenticated user’s channel)

### GET `/api/v1/dashboard/stats`
**Success `200` — `data`:**

```json
{
  "totalSubscribers": 0,
  "totalVideos": 0,
  "totalViews": 0,
  "totalLikes": 0
}
```

---

### GET `/api/v1/dashboard/videos`
**Success `200` — `data`:** `Video[]` (all videos owned by current user, newest first)

---

## 9. Healthcheck (`/api/v1/healthcheck`)

### GET `/api/v1/healthcheck`
| | |
|---|---|
| **Auth** | Public |
| **Format** | — |

**Success `200` — `data`:**

```json
{
  "status": "OK",
  "uptime": 123.45,
  "timestamp": "2026-08-04T10:00:00.000Z"
}
```

---

## Auth Quick Reference

| Level | Meaning |
|---|---|
| **Public** | No token needed |
| **Optional JWT** | Works without login; token unlocks personal fields (`isLiked`, `isSubscribed`, watch history) |
| **Required JWT** | Must send `Authorization: Bearer <token>` or valid `accessToken` cookie |

---

## Frontend Integration Checklist

1. Store `accessToken` (and optionally `refreshToken`) from login/refresh responses.
2. Attach `Authorization: Bearer <accessToken>` on protected calls.
3. Use `credentials: "include"` if relying on cookies + CORS.
4. Set `CORS_ORIGIN` on the backend to your frontend origin (e.g. `http://localhost:5173`).
5. Multipart uploads: field names must match exactly (`avatar`, `coverImage`, `videoFile`, `thumbnail`).
6. On `401`, call `POST /users/refresh-token`, then retry; if refresh fails, redirect to login.
7. Playlist base path is `/api/v1/playlist` (singular).
