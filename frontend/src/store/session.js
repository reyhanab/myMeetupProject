import { csrfFetch } from "./csrf"

const SET_USER = 'session/set'
const REMOVE_USER = 'session/remove'

const setUser = (user) =>{
    return {
        type: SET_USER,
        payload: user
    }
}
const removeUser = ()=>{
    return {
        type:REMOVE_USER
    }
}

export const login = (user)=> async dispatch =>{
    const {email , password} = user;
    const response = await csrfFetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({email,password})
    })
    const data = await response.json()
    localStorage.setItem('userId',data.id)
    dispatch(setUser(data))
    return response;
}

export const signup = (user)=> async dispatch =>{
    const {firstName, lastName, email, password} = user;
    const response = await csrfFetch('/api/users/signup', {
        method :'POST',
        body: JSON.stringify({firstName, lastName, email, password})
    })
    console.log(response)
    const data = await response.json()
    dispatch(setUser(data))
    return response;
}

export const restoreUser = ()=>async dispatch =>{
    // const response = await csrfFetch('/api/users/login')
    // const data = await response.json()
    // dispatch(setUser(data))
    // return response
    if(localStorage.getItem('userId')){
        const response = await csrfFetch(`/api/users/${localStorage.getItem('userId')}`)
        const data = await response.json()
        dispatch(setUser(data))
        return response
    }
}
export const logout = ()=> async dispatch => {
    const response = await csrfFetch('/api/users', {
        method:'DELETE'
    })
    dispatch(removeUser())
    return response;
}

const initialState = {user:null}

const sessionReducer = (state = initialState, action) =>{
    let newState ={...state}
    switch(action.type){
        case SET_USER:
            newState.user = action.payload
            return newState;
        case REMOVE_USER:
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;