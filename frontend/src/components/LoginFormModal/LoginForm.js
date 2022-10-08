import React,{ useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/session"
import { useHistory } from "react-router-dom"
import './LoginForm.css'

function LoginForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const onSubmit = (e)=>{
        e.preventDefault();
        setErrors([])
        dispatch(login({email,password})).catch(async (res)=>{
            const data = await res.json()
            console.log(data)
            let errorsArr =[]
            if(data && data.message) {
                errorsArr.push(data.message)
                setErrors(errorsArr)
            }
        })
        history.push('/')
    }
    const demoLogin = (e)=>{
        e.preventDefault();
        setErrors([])
        email = 'user1@user.io'
        password = 'password1'
        dispatch(login({email,password}))
        history.push('/')
    }
    return (
        <form  onSubmit={onSubmit}>
                {errors.length>0 && (
                    <div className="login-error">Errrors:
                        <ul>
                            {errors.map(error=>{
                            return   <li key={error}>{error}</li>
                            })}
                        </ul>
                    </div>
                )
                }
            <div className="login-form">
                <div className="email">
                    <label>
                        Email:
                        <input
                        className="email-input"
                        type='text'
                        value={email}
                        required
                        onChange={e=> setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="password">
                    <label >
                        Password:
                        <input
                        className="password-input"
                        type='password'
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        required
                        />
                    </label>
                </div>
                <button
                className="login-form-button"
                // disabled={errors.length>0? true : false}
                type="submit">Log In</button>
                <button
                className="demo-login-form-button"
                type="submit"
                onChange={demoLogin}
                >Demo Log In</button>
            </div>
        </form>
    )
}

export default LoginForm;