import React,{ useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/session"
import { useHistory, Redirect } from "react-router-dom"
import './LoginForm.css'

function LoginForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state=>state.session.user)

    const onSubmit = (e)=>{
        e.preventDefault();
        setErrors([])
        // return dispatch(login({email,password})).catch(async (res)=>{
        //     const data = await res.json()
        //     if(data && data.errors) setErrors(data.errors)
        // })
        dispatch(login({email,password}))
        history.push('/')
    }
    return (
        <form className="login-form" onSubmit={onSubmit}>
            <ul>
                {errors.map(error=>{
                    <li key={error}>{error}</li>
                })}
            </ul>
            <label className="email">
                Email:
                <input
                className="email-input"
                type='text'
                value={email}
                onChange={e=> setEmail(e.target.value)}
                />
            </label>
            <label className="password">
                Password:
                <input
                className="password-input"
                type='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}
                required
                />
            </label>
            <button
            className="login-form-button"
            type="submit">Log In</button>
        </form>
    )
}

export default LoginForm;