import { csrfFetch } from "./csrf";

const ADD_EVENT = 'event/add'
const GET_All_EVENTS = 'get/events'
const GET_EVENT = 'get/event'
const GET_GROUP_EVENTS ='group/events'
const EDIT_EVENT = 'event/edit'
const DELETE_EVENT = 'event/delete'


export const deleteEventAction = (id)=>{
    return {
        type: DELETE_EVENT,
        payload:id
    }
}
export const updateEvent = (event)=>{
    return {
        type: EDIT_EVENT,
        payload:event
    }
}

export const addEvent = (event)=>{
    return{
        type: ADD_EVENT,
        payload:event
    }
}
export const getEvents = (events)=>{
    return {
        type:GET_GROUP_EVENTS,
        payload:events
    }
}
export const getEvent = (event)=>{
    return {
        type:GET_EVENT,
        payload:event
    }
}
export const getAllEvents = (events)=>{
    return {
        type:GET_All_EVENTS,
        payload:events
    }
}
export const loadEvent = (eventId) => async dispatch =>{
    const response = await csrfFetch(`/api/events/${eventId}`)
    const data = await response.json()
    dispatch(getEvent(data))
}
export const loadEvents = (groupId)=>async dispatch =>{
    const response = await csrfFetch(`/api/groups/${groupId}/events`)
    const data = await response.json()
    dispatch(getEvents(data))
}
export const loadAllEvents = ()=> async dispatch =>{
    const response = await csrfFetch('/api/events')
    const data = await response.json()
    dispatch(getAllEvents(data))
}

export const createEvent = (event, groupId)=> async dispatch =>{
    const response = await csrfFetch(`/api/groups/${groupId}/events`, {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(event)
    })
    const newEvent = await response.json()
    if (response.ok){
        dispatch(addEvent(newEvent))
    }
}
export const editEvent= (event, eventId)=> async dispatch =>{
    const response = await csrfFetch(`/api/events/${eventId}`, {
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(event)
    })
    const editedEvent = await response.json()
    if (response.ok){
        dispatch(updateEvent(editedEvent))
    }
}

export const deleteEventThunk = (id) => async dispatch =>{
    const response = await csrfFetch(`/api/events/${id}`, {
        method:'DELETE'
    })
    if (response.ok){
        dispatch(deleteEventAction(id))
    }
}

const initialState = {}

const eventReducer = (state = initialState,action)=>{
    let newState = {...state}
    switch(action.type){
        case ADD_EVENT:
            return {...state, [action.payload.id]: action.payload}
        case GET_GROUP_EVENTS:
            for(let obj of action.payload.Events){
                newState[obj.id] = obj
            }
            return newState
        case GET_All_EVENTS:
            for(let obj of action.payload.Events){
                newState[obj.id] = obj
            }
            return newState
        case GET_EVENT:
            newState.event = action.payload
            return newState
        case DELETE_EVENT:
            delete newState[action.payload]
            return newState
        case EDIT_EVENT:
            return {...state, [action.payload.id]: action.payload}
        default:
            return state
    }
}

export default eventReducer;