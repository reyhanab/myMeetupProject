import { csrfFetch } from "./csrf";

const ADD_GROUP = 'group/add'
const GET_GROUPS = 'user/groups'
const EDIT_GROUP = 'group/edit'
const DELETE_GROUP = 'group/delete'

export const deleteGroupAction = (id)=>{
    return {
        type: DELETE_GROUP,
        payload:id
    }
}
export const updateGroup = (group)=>{
    return {
        type: EDIT_GROUP,
        payload:group
    }
}

export const addGroup = (group)=>{
    return{
        type: ADD_GROUP,
        payload:group
    }
}
export const getGroups = (groups)=>{
    return {
        type:GET_GROUPS,
        payload:groups
    }
}
export const loadGroups = ()=>async dispatch =>{
    if(localStorage.getItem('userId')){
        const userId = localStorage.getItem('userId')
        const response = await csrfFetch(`/api/users/${userId}/groups`)
        const data = await response.json()
        dispatch(getGroups(data))
    }
}
export const createGroup = (group)=> async dispatch =>{
    const response = await csrfFetch('/api/groups', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(group)
    })
    const newGroup = await response.json()
    if (response.ok){
        dispatch(addGroup(newGroup))
    }
}
export const editGroup = (group, groupId)=> async dispatch =>{
    const response = await csrfFetch(`/api/groups/${groupId}`, {
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(group)
    })
    const editedGroup = await response.json()
    if (response.ok){
        dispatch(updateGroup(editedGroup))
    }
}

export const deleteGroupThunk = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/groups/${id}`, {
        method:'DELETE'
    })
    if (response.ok){
        dispatch(deleteGroupAction(id))
    }
}

const initialState = {}

const groupReducer = (state = initialState,action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_GROUP:
            return {...state, [action.payload.id]: action.payload}
        case GET_GROUPS:
            for(let obj of action.payload.Groups){
                newState[obj.id] = obj
            }
            return newState
        case DELETE_GROUP:
            delete newState[action.payload]
            return newState
        case EDIT_GROUP:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state
    }
}

export default groupReducer;