// import { httpService } from './http.service'
import { storageService } from '../async-storage.service'
// import { userService } from '../user/user.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'

export const itemService = {
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
    // return httpService.get(`item${queryStr}`)
    return await storageService.query('borad')
}

async function remove(itemId) {
    // return httpService.delete(`item/${itemId}`)
    return await storageService.delete('item', itemId)

}
async function add(item) {
    // const addedItem = await httpService.post(`item`, item)

    // item.byUser = userService.getLoggedinUser()
    const addedItem = await storageService.post('item', item)

    return addedItem
}
async function update(item) {
    // const addedItem = await httpService.post(`item`, item)

    // item.byUser = userService.getLoggedinUser()
    const addedItem = await storageService.put('item', item)

    return addedItem
}

// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async() => {
//     var items = await storageService.query('item')

//     // Dev Helper: Listens to when localStorage changes in OTHER browser
//     window.addEventListener('storage', async() => {
//         console.log('Storage updated');
//         const freshItems = await storageService.query('item')
//         if (freshItems.length === items.length + 1) {
//             console.log('Item Added - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_REVIEW_ADDED, freshItems[freshItems.length - 1])
//         }
//         items = freshItems
//     });
// })()