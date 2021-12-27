import { boardService } from '../services/borad/board.service.js'
import { utilService } from '../services/util.service.js'
import { socketService } from '../services/socket.service.js'

export const boardStore = {
    state: {
        board: null,
        filteredBoard: null,
        boardsList: null,
        filterBy: {
            txt: '',
            personId: '',
            statusTxt: '',
            priorityTxt: '',
        },
        sortBy: {
            type: '',
            direction: 1
        }
    },
    getters: {
        currBoard(state) {
            return state.board
        },
        currGroups(state) {
            return state.board.groups
            // .forEach(group=>{
            //     return {group, items:group.items.filter(item=>{
            //         item.status.txt===state.filterBy.statusTxt||true
            //     })}
            // })
        },
        boardsList(state) {
            return state.boardsList;
        },
        cmpsOrder(state) {
            return state.board.cmpsOrder;
        },
        members(state) {
            return state.board.members;
        },
        getItemById: (state) => (idx) => {
            for (let i = 0; i < state.board.groups.length; i++) {
                for (let j = 0; j < state.board.groups[i].items.length; j++) {
                    if (state.board.groups[i].items[j].id === idx) {
                        return {
                            item: state.board.groups[i].items[j],
                            groupId: state.board.groups[i].id
                        }
                    }
                }
            }
            console.log('couldnt find id');
        },
        // predefineColors(state) {
        //     return state.board.predefineColors;
        // },
        currFilterBy(state) {
            return JSON.parse(JSON.stringify(state.filterBy));
        },
        currSortBy(state) {
            return JSON.parse(JSON.stringify(state.sortBy));
        }
    },
    // Boards:

    mutations: {
        // Boards:
        loadBoard(state, { board }) {
            state.board = board
            // state.filteredBoard = board;
        },
        addBoard(state, { newBoard }) {
            console.log(newBoard);
            state.board = newBoard
            state.boardsList.push({
                boardId: newBoard._id,
                boardTitle: newBoard.title
            })
        },
        removeBoard(state, { boardId }) {
            state.board = null
            state.boardsList = state.boardsList.filter(board => board.boardId !== boardId)
        },
        updateMembers(state, { members }) {
            state.board.members = members
        },
        loadBoardsList(state, { boardsList }) {
            state.boardsList = boardsList
        },
        loadCmpsOrder(state, { cmpsOrder }) {
            state.board.cmpsOrder = cmpsOrder
        },
        //Groups:
        loadGroups(state, { groups }) {
            state.board.groups = groups
        },
        addGroup(state, { newGroup }) {
            state.board.groups.unshift(newGroup)
        },
        updateGroup(state, { group }) {
            const groupIdx = state.board.groups.findIndex(currGroup => currGroup.id === group.id)
            state.board.groups.splice(groupIdx, 1, group)
        },

        updateFilter(state,{filterBy}){
            state.filterBy=filterBy
        },

        // Items:
        addItem(state, { newItem, groupIdx }) {
            state.board.groups[groupIdx].items.push(newItem)
            // const group = boardService.getGroupById(state.board, groupId)
            // group.items.push(newItem);
        },
        removeItem(state, { groupIdx, itemIdx }) {
            state.board.groups[groupIdx].items.splice(itemIdx, 1);
        },
        updateItem(state, { groupIdx, item, itemIdx }) {
            state.board.groups[groupIdx].items.splice(itemIdx, 1, item);
        },
        duplicateItem(state, { groupIdx, itemIdx, dupItem }) {
            state.board.groups[groupIdx].items.splice(itemIdx, 0, dupItem);
        },
        // Filter:
        filter(state, { filterBy }) {
            console.log('state.board', state.board);
            var boardToShow = JSON.parse(JSON.stringify(state.board));
            var filteredGroups = [];
            // console.log('filterBy.txt', filterBy.txt);
            // console.log('filterBy.personId',filterBy.personId);

            // by txt:
            boardToShow.groups.forEach(group => {
                if (group.title.toLowerCase().includes(filterBy.txt.toLowerCase())) {
                    filteredGroups.push(group);
                }
                else {
                    var filteredItems = [];
                    group.items.forEach(item => {
                        if (item.title.toLowerCase().includes(filterBy.txt.toLowerCase())) {
                            filteredItems.push(item);
                        }
                    })
                    if (filteredItems.length) {
                        group.items = filteredItems;
                        filteredGroups.push(group);
                    }
                }
            })
            boardToShow.groups = filteredGroups;

            // by person: 
            if (filterBy.personId) {
                filteredGroups = [];
                boardToShow.groups.forEach(group => {
                    var filteredItems = [];
                    group.items.forEach(item => {
                        item.person.forEach(member => {
                            if (member._id === filterBy.personId) filteredItems.push(item);
                        })
                    })
                    if (filteredItems.length) {
                        group.items = filteredItems;
                        filteredGroups.push(group);
                    }
                })
                boardToShow.groups = filteredGroups;
            }

            //by status:
            if (filterBy.statusTxt) {
                filteredGroups = [];
                boardToShow.groups.forEach(group => {
                    var filteredItems = [];
                    group.items.forEach(item => {
                        if (item.status.txt === filterBy.statusTxt) filteredItems.push(item);
                    })
                    if (filteredItems.length) {
                        group.items = filteredItems;
                        filteredGroups.push(group);
                    }
                })
                boardToShow.groups = filteredGroups;
            }
            //by priority:
            if (filterBy.priorityTxt) {
                filteredGroups = [];
                boardToShow.groups.forEach(group => {
                    var filteredItems = [];
                    group.items.forEach(item => {
                        if (item.priority.txt === filterBy.priorityTxt) filteredItems.push(item);
                    })
                    if (filteredItems.length) {
                        group.items = filteredItems;
                        filteredGroups.push(group);
                    }
                })
                boardToShow.groups = filteredGroups;
            }
            

            state.filteredBoard = boardToShow;
        },
        sort(state, { sortBy }) {
            state.filteredBoard.groups.forEach(group => {
                var items = group.items;
                // by status:
                if (sortBy.type === 'status') {
                    items.sort((i1, i2) => {
                        if (i1.status.txt > i2.status.txt) return sortBy.direction;
                        else return sortBy.direction * -1;
                    });
                }
                // by priority:
                if (sortBy.type === 'priority') {
                    items.sort((i1, i2) => {
                        if (i1.priority.importance > i2.priority.importance) return sortBy.direction;
                        else return sortBy.direction * -1;
                    });
                }
                // by person: 
                if (sortBy.type === 'person') {
                    var boardCopy = JSON.parse(JSON.stringify(state.board));
                    const sortedMembers = boardCopy.members.sort((m1, m2) => {
                        if (m1.fullname > m2.fullname) return 1;
                        else return -1;
                    })
                    items.forEach(item => {
                        item.person.sort((m1, m2) => {
                            if (m1.fullname > m2.fullname) return 1;
                            else return -1;
                        })
                    })
                    items.sort((i1, i2) => {
                        if (!i1.person.length || !i2.person.length) {
                            if (!i1.person.length) return sortBy.direction * -1;
                            else return sortBy.direction;
                        }
                        if (i1.person[0].fullname > i2.person[0].fullname) {
                            return sortBy.direction;
                        }
                        else return sortBy.direction * -1;
                    })
                }
                //by date:
                if(sortBy.type === 'date') {
                    // var boardCopy = JSON.parse(JSON.stringify(state.board));
                    items.sort((i1, i2) => {
                        if (i1.date > i2.date) return sortBy.direction;
                        else return sortBy.direction * -1;
                    });
                }
                //by timeline:
                if(sortBy.type === 'timeline') {
                    // var boardCopy = JSON.parse(JSON.stringify(state.board));
                    items.sort((i1, i2) => {
                        if (i1.timeline.startDate > i2.timeline.startDate) return sortBy.direction;
                        else return sortBy.direction * -1;
                    });
                }
                //by stopwatch:
                if(sortBy.type === 'stopwatch') {
                    // var boardCopy = JSON.parse(JSON.stringify(state.board));
                    items.sort((i1, i2) => {
                        if (i1.stopwatch.secondsCount > i2.stopwatch.secondsCount) return sortBy.direction;
                        else return sortBy.direction * -1;
                    });
                }
                //by title:
                if(sortBy.type === 'title') {
                    // var boardCopy = JSON.parse(JSON.stringify(state.board));
                    items.sort((i1, i2) => {
                        if (i1.title > i2.title) return sortBy.direction;
                        else return sortBy.direction * -1;
                    });
                }
            })
        }
    },
    actions: {
        // Boards:

        async updateBoard({ commit }, { board }) {
            console.log('emiting new update ', board.title);

            await boardService.update(board)
        },
        async updateMembers({ state, commit }, { copyMembers }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.members = copyMembers
            await boardService.update(copyBoard)
            commit({ type: 'updateMembers', members: copyBoard.members })

        },
        async newBoard({ commit }, { boardName }) {
            var newBoard = boardService.getEmptyBoard(boardName)
            newBoard = await boardService.add(newBoard)
            commit({ type: 'addBoard', newBoard })
            return newBoard
        },
        async removeBoard({ commit }, { boardId }) {
            await boardService.remove(boardId)
            commit({ type: 'removeBoard', boardId })
        },
        async getBoard({ commit }, { boardId }) {
            //get borad from service
            const board = await boardService.getById(boardId)
            socketService.emit('open board', board._id)
            commit({ type: 'loadBoard', board })
        },
        async getBoardsList({ commit }) {
            const boardsList = await boardService.getBoardsList()
            commit({ type: 'loadBoardsList', boardsList })
        },
        async updateGroups({ commit, groups }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.groups = groups
            await boardService.update(copyBoard)
            commit({ type: 'loadGroups', groups: copyBoard.groups })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },

        async changeGroupsOrder({ state, commit }, { groups }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            const copyGroups = JSON.parse(JSON.stringify(groups))
            copyBoard.groups = copyGroups
            await boardService.update(copyBoard)
            socketService.emit('board newUpdateBoard', copyBoard)
            // commit({ type: 'loadBoard', newBoard })

            commit({ type: 'loadGroups', groups: copyBoard.groups })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        async changeCmpsOrder({ state, commit }, { cmpsOrder }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            copyBoard.cmpsOrder = cmpsOrder
            await boardService.update(copyBoard)
            socketService.emit('board newUpdateBoard', copyBoard)
            commit({ type: 'loadCmpsOrder', cmpsOrder })
            commit({ type: 'loadGroups', groups: copyBoard.groups })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        //Groups:
        async updateGroup({ state, commit }, { group }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            var groupIdx = copyBoard.groups.findIndex(currGroup => currGroup.id === group.id)
            copyBoard.groups.splice(groupIdx, 1, group)
            await boardService.update(copyBoard)
            socketService.emit('board newUpdateBoard', copyBoard)
            commit({ type: 'updateGroup', group })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        async changeItemsOrder({ state, commit }, { groupId, items }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            var groupIdx = copyBoard.groups.findIndex(currGroup => currGroup.id === groupId)
            // console.log('in change order',items[0].title);
            // console.log('in change order',items[1].title);
            copyBoard.groups[groupIdx].items = items

            await boardService.update(copyBoard)
            commit({ type: 'updateGroup', group: copyBoard.groups[groupIdx] })
            socketService.emit('board newUpdateBoard', copyBoard)
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        async addGroup({ state, commit }) {
            const newGroup = boardService.getEmptyGroup()
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            // console.log('in add group',newGroup.items[0].title);
            // console.log('in add group',newGroup.items[1].title);
            copyBoard.groups.unshift(newGroup)

            await boardService.update(copyBoard)
            // const board = await boardService.addGrouptoBoard(copyBoard, newGroup)
            // copyBoard.groups.unshift(newGroup)
            commit({ type: 'addGroup', newGroup })
            socketService.emit('board newUpdateBoard', copyBoard)
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        async removeGroup({ state, commit }, { groupId }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            var groupIdx = copyBoard.groups.findIndex(currGroup => currGroup.id === groupId)
            copyBoard.groups.splice(groupIdx, 1)
            socketService.emit('board newUpdateBoard', copyBoard)
            await boardService.update(copyBoard)
            commit({ type: 'loadBoard', board: copyBoard })
        },
        // Items:
        async addItem({ state, commit }, { newItemTitle, groupId }) {
            const newItem = boardService.getEmptyItem(newItemTitle)
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            const groupIdx = copyBoard.groups.findIndex(currGroup => currGroup.id === groupId)
            copyBoard.groups[groupIdx].items.push(newItem)
            await boardService.update(copyBoard)
            socketService.emit('board newUpdateBoard', copyBoard)
            commit({ type: 'addItem', newItem, groupIdx })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        async removeItem({ state, commit }, { groupId, item }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            const group = boardService.getGroupById(copyBoard, groupId)
            var groupIdx = copyBoard.groups.findIndex(group => group.id === groupId)
            var itemIdx = group.items.findIndex(reqItem => reqItem.id === item.id)
            copyBoard.groups[groupIdx].items.splice(itemIdx, 1)
            socketService.emit('board newUpdateBoard', copyBoard)
            await boardService.update(copyBoard)
            commit({ type: 'removeItem', groupIdx, itemIdx })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },
        async duplicateItem({ state, commit }, { groupId, item }) {
            const dupItem = JSON.parse(JSON.stringify(item))
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            const group = boardService.getGroupById(copyBoard, groupId)
            var groupIdx = copyBoard.groups.findIndex(group => group.id === groupId)
            var itemIdx = group.items.findIndex(reqItem => reqItem.id === item.id) + 1
            dupItem.id = utilService.makeId();
            console.log('dup id item in store:', dupItem.id);
            copyBoard.groups[groupIdx].items.splice(itemIdx, 0, dupItem)
            await boardService.update(copyBoard)
            commit({ type: 'duplicateItem', groupIdx, itemIdx, dupItem })
            // commit({ type: 'filter', filterBy: state.filterBy})
        },


        async editItem({ state, commit }, { item, groupId }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            // const group = await boardService.getGroupById(state.board, groupId)

            var groupIdx = state.board.groups.findIndex(currGroup => currGroup.id === groupId)
            var itemIdx = copyBoard.groups[groupIdx].items.findIndex(reqItem => reqItem.id === item.id)

            copyBoard.groups[groupIdx].items.splice(itemIdx, 1, item)
            commit({ type: 'loadGroups', groups: copyBoard.groups })
            await boardService.update(copyBoard)

            // commit({ type: 'updateItem', groupIdx, item, itemIdx })
            socketService.emit('board newUpdateBoard', copyBoard)
            // commit({ type: 'filter', filterBy: state.filterBy})

        },
        // Filter:
        async updateFilter({ state, commit }, { filterBy }) {
            state.filterBy = filterBy;
            // commit({ type: 'filter', filterBy });
        },
        // Sort:
        updateSort({ state, commit }, { sortBy }) {
            state.sortBy = sortBy;
            // commit({ type: 'sort', sortBy })
        },
        //////////////  test /////////////////////

        async justUpdateBoard({ commit, state }) {
            const copyBoard = JSON.parse(JSON.stringify(state.board))
            socketService.emit('board newUpdateBoard', copyBoard)
            await boardService.update(copyBoard)
            // commit({ type: 'loadGroups', groups: copyBoard.groups })

            // commit({ type: 'filter', filterBy: state.filterBy})
        }
    },
    modules: {

    }
}






