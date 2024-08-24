Users
Chats
Messages

Users - Chats
Users - Messages



```json
{
    "users": [
        {"id": 1, "songId": "2W4bzvPG5P3nBTj4H0jNid"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
    ],

    "chat": [
        {
            "id": 9813248,
            "messages": [],
            "userA": "UserA",
            "userB": "UserB"
        }
    ],

    "messages": [
        {
            "id": 696969,
            "content": "This is a sample message"
        }
    ]
}
```

POST api/users
- Add a new user and their favourite song to the database

PATCH api/users/userId
- Update a user's choice of song 

GET api/users/userId
- Get a particular user by userId

POST api/chat
- Add a new "chat" between two users







