// import { httpService } from './http.service'
import { storageService } from '../async-storage.service'
// import { userService } from '../user/user.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

export const groupService = {
    add,
    query,
    remove,
    update
}


// More ways to send query params:
// return axios.get('api/toy/?id=1223&balance=13')
// return axios.get('api/toy/?', {params: {id: 1223, balanse:13}})

async function query(filterBy = {}) {
    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`group${queryStr}`)
    return await storageService.query('borad')
}

async function remove(groupId) {
    // return httpService.delete(`group/${groupId}`)
    return await storageService.delete('group', groupId)

}
async function add(group) {
    // const addedGroup = await httpService.post(`group`, group)

    // group.byUser = userService.getLoggedinUser()
    const addedGroup = await storageService.post('group', group)

    return addedGroup
}


async function update(group) {
    // const addedGroup = await httpService.post(`group`, group)

    // group.byUser = userService.getLoggedinUser()
    const addedGroup = await storageService.put('group', group)

    return addedGroup
}
// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async() => {
//     var groups = await storageService.query('group')

//     // Dev Helper: Listens to when localStorage changes in OTHER browser
//     window.addEventListener('storage', async() => {
//         console.log('Storage updated');
//         const freshGroups = await storageService.query('group')
//         if (freshGroups.length === groups.length + 1) {
//             console.log('Group Added - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshGroups[freshGroups.length - 1])
//         }
//         groups = freshGroups
//     });
// })()