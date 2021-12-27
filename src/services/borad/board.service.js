import { httpService } from '../http.service'
import { storageService } from '../async-storage.service'
import { utilService } from '../util.service.js'
// import { userService } from '../user/user.service'
import { socketService, SOCKET_EVENT_BOARD_UPDATED } from '../socket.service'

export const boardService = {
    // Boards:
    add,
    query,
    getById,
    remove,
    update,
    getEmptyBoard,
    getBoardsList,
    // Groups:
    getEmptyGroup,
    getGroupById,
    updateGroupInBoard,
    addGrouptoBoard,
    removeGroup,
    getNewId,
    // Items:
    getEmptyItem,
    setActivity,
}

// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy = {}) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    return await httpService.get(`board`)
    // return await storageService.query('borad')
}
async function getById(boardId) {
    return await httpService.get(`board/${boardId}`)
    socketService.emit('unset-user-socket');

    // return await storageService.get('board', boardId)
}
async function getBoardsList() {
    var res
    res = await httpService.get('board')
    res.forEach((board, idx) => {
        res[idx] = {
            boardId: board._id,
            boardTitle: board.title
        }
    })
    return JSON.parse(JSON.stringify(res))
}

async function remove(boardId) {
    return await httpService.delete(`board/${boardId}`)
    // return await storageService.remove('board', boardId)

}
async function add(board) {
    const addedBoard = await httpService.post(`board`, board)

    // board.byUser = userService.getLoggedinUser()
    // const addedBoard = await storageService.post('board', board)
    return addedBoard
}

async function update(board) {
    const updatedBoard = await httpService.put(`board`, board)
    // board.byUser = userService.getLoggedinUser()
    // const addedBoard = await storageService.put('board', board)
    return updatedBoard
}

function getNewId() {
    utilService.makeId()
}

// Groups:


function getGroupById(board, groupId) {
    return board.groups.find(group => group.id === groupId)
}

async function addGrouptoBoard(board, newGroup) {
    board.groups.unshift(newGroup)
    const updatedBoard = await httpService.put(`board`, board)
    // const updatedBoard = await storageService.put('board', board)
    return updatedBoard
}

async function updateGroupInBoard(board, group) {
    const copyBoard = JSON.parse(JSON.stringify(board))
    const groupId = group.id;
    const idx = copyBoard.groups.findIndex(group => group.id === groupId);
    copyBoard.groups.splice(idx, 1, group)
    const updatedBoard = await httpService.put(`board`, board)
    // const updatedBoard = await storageService.put('board', copyBoard)
    return updatedBoard
}

async function removeGroup(board, groupId) {
    const groupIdx = board.groups.findIndex(currGroup => currGroup.id === groupId)
    board.groups.splice(groupIdx, 1)
    const updatedBoard = await httpService.put(`board`, board)
    // const updatedBoard = await storageService.put('board', board)
    return updatedBoard
}

// Items:

function setActivity() {

}

function getEmptyItem(itemTitle) {
    const newItem = {
        "id": "i_" + utilService.makeId(),
        "title": itemTitle,
        "date": "",
        "person": [],
        "status": {
            "bgColor": '#c8c8c8',
            "txt": "-"
        },
        "timeline": {
            "startDate": "",
            "endDate": ""
        },
        "priority": {
            "bgColor": "#c6c6c6",
            "txt": "-",
            "importance": 0 
        },
        "stopwatch": {
            "secondsCount": 0
        },
        "activityLog": [
            {
                "id": "a_" + utilService.makeId(),
                "time": Date.now(),
                "action": "Created",
                "byUser": {}
            }
        ],
        "updates": [],
    }
    return newItem;
}

function getEmptyGroup() {
    return {
        "id": "g_" + utilService.makeId(),
        "title": "New Group",
        "color": utilService.getRandomPredefinedColor(),
        "items": [
            getEmptyItem("New Item")
            // {
            //     "id": "i_" + utilService.makeId(),
            //     "title": "bread",
            //     "date": "",
            //     "person": [
            //         {
            //             "_id": "u101",
            //             "fullname": "Tal Bahat",
            //             "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
            //         }
            //     ],
            //     "status": {
            //         "bgColor": "#c8c8c8",
            //         "txt": "-"
            //     },
            //     "timeline": {
            //         "startDate": "",
            //         "endDate": ""
            //     },
            //     "activityLog": [],
            //     "updates": []
            // },
            // {
            //     "id": "i_" + utilService.makeId(),
            //     "title": "Tahini",
            //     "date": "",
            //     "person": [
            //         {
            //             "_id": "u102",
            //             "fullname": "Roy Gil",
            //             "imgUrl": "https://files.monday.com/use1/photos/26261151/thumb_small/26261151-user_photo_2021_11_30_09_34_45.png?1638264885"
            //         }
            //     ],
            //     "status": {
            //         "txt": "Working on it",
            //         "bgColor": "#FDAB3D"
            //     },
            //     "timeline": {
            //         "startDate": "",
            //         "endDate": ""
            //     },
            //     "activityLog": [],
            //     "updates": []
            // },
        ]
    }
}

function getEmptyBoard(boardName) {

    const newBoard = {
        "title": "",
        "createdAt": 1589983468418,
        "createdBy": {
            "_id": "u101",
            "fullname": "Tal Bahat",
            "imgUrl": "https://files.monday.com/use1/photos/26222916/thumb_small/26222916-user_photo_2021_11_30_09_26_11.png?1638264371"
        },
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
        "cmpsOrder": ["status-picker", "person-picker", "date-picker", "timeline-picker", "priority-picker", "stopwatch-picker"],
        "groups": [
            getEmptyGroup(),
            //     {
            //     "id": "g_" + utilService.makeId(),
            //     "title": "New Group",
            //     "color": utilService.getRandomPredefinedColor(),
            //     "items": [
            //         {
            //         "id": "i_" + utilService.makeId(),
            //         "title": "New Item",
            //         "date": Date.now(),
            //         "person": [],
            //         "status": {
            //             "bgColor": "#c8c8c8",
            //             "txt": "-"
            //         },
            //         "timeline": {
            //             "startDate": Date.now(),
            //             "endDate": Date.now() + 100 * 60 * 60 * 24 * 7
            //         },
            //         "activityLog": [{
            //             "id": 'a101',
            //             "time": 1589983468418,
            //             "action": "",
            //             "byUser": {
            //                 "_id": "u101",
            //                 "fullname": "Tal Tarablus",
            //                 "imgUrl": "https://www.google.com"
            //             }
            //         }],
            //         "updates": [{
            //             "id": "u101",
            //             "byUser": {
            //                 "_id": "u101",
            //                 "fullname": "Yaakob J",
            //                 "imgUrl": "https://www.google.com"
            //             },
            //             "txt": "hi",
            //             "replies": [{
            //                 "id": "r101",
            //                 "byUser": {
            //                     "_id": "u101",
            //                     "fullname": "Yaakob J",
            //                     "imgUrl": "https://www.google.com"
            //                 },
            //                 "txt": "hi",
            //                 "time": 1589983468418,
            //                 "likes": [{
            //                     "_id": "u101",
            //                     "fullname": "Yaakob J",
            //                     "imgUrl": "https://www.google.com"
            //                 }]
            //             }],
            //             "likes": [{
            //                 "_id": "u101",
            //                 "fullname": "Yaakob J",
            //                 "imgUrl": "https://www.google.com"
            //             }

            //             ]
            //         }]

            //     },
            //     ],
            // },
        ],

    }
    newBoard.title = boardName
    return newBoard
}
// This IIFE functions for Dev purposes
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async() => {
//     var boards = await storageService.query('board')

//     // Dev Helper: Listens to when localStorage changes in OTHER browser
//     window.addEventListener('storage', async() => {
//         console.log('Storage updated');
//         const freshBoards = await storageService.query('board')
//         if (freshBoards.length === boards.length + 1) {
//             console.log('Board Added - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshBoards[freshBoards.length - 1])
//         }
//         boards = freshBoards
//     });
// })()