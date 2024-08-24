Users
matchs
Messages

Users - matchs
Users - Messages



```json
{
    "users": [
        {"id": 1, "songId": "2W4bzvPG5P3nBTj4H0jNid"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
        {"id": 2, "songId": "3TfccGs1tmOLtcmTKRokhv"}
    ],

    "match": [
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
            "match": "match",
            "content": "This is a sample message",
            "user": "User"
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

POST api/match
- Add a new "match" between two users







