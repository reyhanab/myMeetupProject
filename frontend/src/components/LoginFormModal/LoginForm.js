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
                <label className="email">
                    Email:
                    <input
                    className="email-input"
                    type='text'
                    value={email}
                    required
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
                // disabled={errors.length>0? true : false}
                type="submit">Log In</button>
            </div>
        </form>
    )
}

export default LoginForm;