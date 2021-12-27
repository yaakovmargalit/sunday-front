export const storageService = {
    query,
    get,
    post,
    put,
    remove
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
if (!localStorage.board) makeBoard()

function makeBoard() {
    _save('board', [
        {
            "_id": "b101",
            "title": "Final Sprint",
            "createdAt": 1589983468418,
            "createdBy": {
                "_id": "u101",
                "fullname": "Tal Bahat",
                "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
            },
            predefineColors: [
                "#ff4500",
                "#ff8c00",
                "#ffd700",
                "#90ee90",
                "#00ced1",
                "#00ecd1",
                "#1e90ff",
                "#c71585",
                "#c7f5a5",
                "#c7158577",
              ],
            "members": [
                {
                    "_id": "u101",
                    "fullname": "Tal Bahat",
                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                },
                {
                    "_id": "u102",
                    "fullname": "Roy Gil",
                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                },
                {
                    "_id": "u103",
                    "fullname": "Yaakov Margalit",
                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                }
            ],
            "cmpsOrder": [
                "status-picker",
                "person-picker",
                "date-picker",
                "timeline-picker",
                "stopwatch-picker"
            ],
            "groups": [
                {
                    "id": "DLFre",
                    "title": "General",
                    "color": "#784bd1",
                    "items": [
                        {
                            "id": "poi09",
                            "title": "fix timeline invalid bug",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Done",
                                "bgColor": "#00C785"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [
                                
                                {
                                    "id": "aHtm5",
                                    "time": 1638802218150,
                                    "action": "Status changed",
                                    "byUser":
                                     {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                    }
                                },
                                {
                                    "id": "adpm3",
                                    "time": 1638802008150,
                                    "action": "Created",
                                    "byUser":
                                     {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                    }
                                }
                            ],
                            "updates": []
                        },
                        {
                            "id": "asd23",
                            "title": "fix draggable",
                            "date": 1638095856535,
                            "person": [
                                {
                                    "_id": "u103",
                                    "fullname": "Yaakov Margalit",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                                }
                            ],
                            "status": {
                                "txt": "Stuck",
                                "bgColor": "#E2445C"
                            },
                            "timeline": {
                                "startDate": 1638095856535,
                                "endDate": 1638095856535
                            },
                            "activityLog": [
                                {
                                    "id": "a101",
                                    "time": 1589983468418,
                                    "action": "",
                                    "byUser":
                                     {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://www.google.com"
                                    }
                                }
                            ],
                            "updates": [
                                {
                                    "id": "u101",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Yaakob J",
                                        "imgUrl": "https://www.google.com"
                                    },
                                    "txt": "hi",
                                    "replies": [
                                        {
                                            "id": "r101",
                                            "byUser": {
                                                "_id": "u101",
                                                "fullname": "Yaakob J",
                                                "imgUrl": "https://www.google.com"
                                            },
                                            "txt": "hi",
                                            "time": 1589983468418,
                                            "likes": [
                                                {
                                                    "_id": "u101",
                                                    "fullname": "Yaakob J",
                                                    "imgUrl": "https://www.google.com"
                                                }
                                            ]
                                        }
                                    ],
                                    "likes": [
                                        {
                                            "_id": "u101",
                                            "fullname": "Yaakob J",
                                            "imgUrl": "https://www.google.com"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "QWE2D",
                            "title": "fix item delete button",
                            "date": 1638700590311,
                            "person": [
                                {
                                    "_id": "u102",
                                    "fullname": "Roy Gil",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                                }
                            ],
                            "status": {
                                "txt": "Done",
                                "bgColor": "#00C785"
                            },
                            "timeline": {
                                "startDate": 1638095856535,
                                "endDate": 1638700590311
                            },
                            "activityLog": [
                                {
                                    "id": "a101",
                                    "time": 1638700590311,
                                    "action": "",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://www.google.com"
                                    }
                                }
                            ],
                            "updates": [
                                {
                                    "id": "u101",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Yaakob J",
                                        "imgUrl": "https://www.google.com"
                                    },
                                    "txt": "hi",
                                    "replies": [
                                        {
                                            "id": "r101",
                                            "byUser": {
                                                "_id": "u101",
                                                "fullname": "Yaakob J",
                                                "imgUrl": "https://www.google.com"
                                            },
                                            "txt": "hi",
                                            "time": 1589983468418,
                                            "likes": [
                                                {
                                                    "_id": "u101",
                                                    "fullname": "Yaakob J",
                                                    "imgUrl": "https://www.google.com"
                                                }
                                            ]
                                        }
                                    ],
                                    "likes": [
                                        {
                                            "_id": "u101",
                                            "fullname": "Yaakob J",
                                            "imgUrl": "https://www.google.com"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "r24te",
                            "title": "fix group color change",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u102",
                                    "fullname": "Roy Gil",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                                },
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "2RzXy",
                            "title": "shrink the edit button",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "BVn0t",
                            "title": "fix edit hovers",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "BSm0t",
                            "title": "insert demo data",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                },
                                {
                                    "_id": "u103",
                                    "fullname": "Yaakov Margalit",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                                }
                            ],
                            "status": {
                                "txt": "Done",
                                "bgColor": "#00C785"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        }
                    ]
                },
                {
                    "id": "flG4t",
                    "title": "Small design fixes",
                    "color": "#1677ee",
                    "items": [
                        {
                            "id": "FDp03",
                            "title": "push up the person modal",
                            "date": 1589983468418,
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": 1589983468418,
                                "endDate": 1589983468418
                            },
                            "activityLog": [
                                {
                                    "id": "a101",
                                    "time": 1589983468418,
                                    "action": "",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://www.google.com"
                                    }
                                }
                            ],
                            "updates": [
                                {
                                    "id": "u101",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Yaakob J",
                                        "imgUrl": "https://www.google.com"
                                    },
                                    "txt": "hi",
                                    "replies": [
                                        {
                                            "id": "r101",
                                            "byUser": {
                                                "_id": "u101",
                                                "fullname": "Yaakob J",
                                                "imgUrl": "https://www.google.com"
                                            },
                                            "txt": "hi",
                                            "time": 1589983468418,
                                            "likes": [
                                                {
                                                    "_id": "u101",
                                                    "fullname": "Yaakob J",
                                                    "imgUrl": "https://www.google.com"
                                                }
                                            ]
                                        }
                                    ],
                                    "likes": [
                                        {
                                            "_id": "u101",
                                            "fullname": "Yaakob J",
                                            "imgUrl": "https://www.google.com"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "i103",
                            "title": "Replace logo",
                            "date": 1589983468418,
                            "person": [
                                {
                                    "_id": "u103",
                                    "fullname": "Yaakov Margalit",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": 1589983468418,
                                "endDate": 1589983468418
                            },
                            "activityLog": [
                                {
                                    "id": "a101",
                                    "time": 1589983468418,
                                    "action": "",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://www.google.com"
                                    }
                                }
                            ],
                            "updates": [
                                {
                                    "id": "u101",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Yaakob J",
                                        "imgUrl": "https://www.google.com"
                                    },
                                    "txt": "hi",
                                    "replies": [
                                        {
                                            "id": "r101",
                                            "byUser": {
                                                "_id": "u101",
                                                "fullname": "Yaakob J",
                                                "imgUrl": "https://www.google.com"
                                            },
                                            "txt": "hi",
                                            "time": 1589983468418,
                                            "likes": [
                                                {
                                                    "_id": "u101",
                                                    "fullname": "Yaakob J",
                                                    "imgUrl": "https://www.google.com"
                                                }
                                            ]
                                        }
                                    ],
                                    "likes": [
                                        {
                                            "_id": "u101",
                                            "fullname": "Yaakob J",
                                            "imgUrl": "https://www.google.com"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "i102",
                            "title": "push up the person modal",
                            "date": 1589983468418,
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": 1589983468418,
                                "endDate": 1589983468418
                            },
                            "activityLog": [
                                {
                                    "id": "a101",
                                    "time": 1589983468418,
                                    "action": "",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Tal Tarablus",
                                        "imgUrl": "https://www.google.com"
                                    }
                                }
                            ],
                            "updates": [
                                {
                                    "id": "u101",
                                    "byUser": {
                                        "_id": "u101",
                                        "fullname": "Yaakob J",
                                        "imgUrl": "https://www.google.com"
                                    },
                                    "txt": "hi",
                                    "replies": [
                                        {
                                            "id": "r101",
                                            "byUser": {
                                                "_id": "u101",
                                                "fullname": "Yaakob J",
                                                "imgUrl": "https://www.google.com"
                                            },
                                            "txt": "hi",
                                            "time": 1589983468418,
                                            "likes": [
                                                {
                                                    "_id": "u101",
                                                    "fullname": "Yaakob J",
                                                    "imgUrl": "https://www.google.com"
                                                }
                                            ]
                                        }
                                    ],
                                    "likes": [
                                        {
                                            "_id": "u101",
                                            "fullname": "Yaakob J",
                                            "imgUrl": "https://www.google.com"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": "lAxIy",
                            "title": "shrink edit button",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "iKYpe",
                            "title": "fix edit hovers",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "K3Zhd",
                            "title": "fix add item line",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u103",
                                    "fullname": "Yaakov Margalit",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                                }
                            ],
                            "status": {
                                "txt": "Done",
                                "bgColor": "#00C785"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        }
                    ]
                }
            ]
        },
        {
            "_id": "b102",
            "title": "Planning the Trip",
            "createdAt": 1589983468418,
            "createdBy": {
                "_id": "u101",
                "fullname": "Tal Bahat",
                "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
            },
            predefineColors: [
                "#ff4500",
                "#ff8c00",
                "#ffd700",
                "#90ee90",
                "#00ced1",
                "#00ecd1",
                "#1e90ff",
                "#c71585",
                "#c7f5a5",
                "#c7158577",
              ],
            "members": [
                {
                    "_id": "u101",
                    "fullname": "Tal Bahat",
                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                },
                {
                    "_id": "u102",
                    "fullname": "Roy Gil",
                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                },
                {
                    "_id": "u103",
                    "fullname": "Yaakov Margalit",
                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                }
            ],
            "cmpsOrder": [
                "status-picker",
                "person-picker",
                "date-picker",
                "timeline-picker"
            ],
            "groups": [
                {
                    "id": "ML66y",
                    "title": "Before Flight Tasks",
                    "color": "#ff642e",
                    "items": [
                        {
                            "id": "Lfs34",
                            "title": "buy tickets",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "SIP3k",
                            "title": "book a place at air bnb",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u102",
                                    "fullname": "Roy Gil",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                                }
                            ],
                            "status": {
                                "txt": "Done",
                                "bgColor": "#00C785"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "RTko9",
                            "title": "plan the hiking day",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                },
                                {
                                    "_id": "u103",
                                    "fullname": "Yaakov Margalit",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                                }
                            ],
                            "status": {
                                "txt": "Done",
                                "bgColor": "#00C785"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "dOp90",
                            "title": "search for restaurants",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                },
                                {
                                    "_id": "u102",
                                    "fullname": "Roy Gil",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                                },
                                {
                                    "_id": "u103",
                                    "fullname": "Yaakov Margalit",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261141/thumb_small/26261141-user_photo_2021_11_30_11_21_10.png?1638271270"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        }
                    ]
                },
                {
                    "id": "V2Mp4",
                    "title": "To Package",
                    "color": "#9cd326",
                    "items": [
                        {
                            "id": "lskDB",
                            "title": "bread",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u101",
                                    "fullname": "Tal Bahat",
                                    "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                        {
                            "id": "kls77",
                            "title": "Tahini",
                            "date": "",
                            "person": [
                                {
                                    "_id": "u102",
                                    "fullname": "Roy Gil",
                                    "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
                                }
                            ],
                            "status": {
                                "txt": "Working on it",
                                "bgColor": "#FDAB3D"
                            },
                            "timeline": {
                                "startDate": "",
                                "endDate": ""
                            },
                            "activityLog": [],
                            "updates": []
                        },
                    ]
                }
            ]
        }
    ]

    )
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}