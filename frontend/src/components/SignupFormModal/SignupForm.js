import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import './SignupForm.css'


function SignupForm(){
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const sessionUser = useSelector(state=> state.session.user)

    // if (sessionUser) return <Redirect to='/' />

    const onSubmit = (e)=>{
        e.preventDefault()
        if (password === confirmPassword){
            setErrors([])
            return dispatch(signup({firstName,lastName,email,password}))
            .catch(async res=>{
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
        <form className="signup-form" onSubmit={onSubmit}>
            <ul>
                {errors.map(error=>{
                    <li key={error}>{error}</li>
                })}
            </ul>
            <label className="firstName">
                FirstName:
                <input
                type='text'
                value= {firstName}
                onChange={e=> setFirstName(e.target.value)}
                />
            </label>
            <label className="lastName">
                lastName:
                <input
                type='text'
                value= {lastName}
                onChange={e=> setLastName(e.target.value)}
                />
            </label>
            <label className="email-signup">
                Email:
                <input
                type='email'
                value= {email}
                onChange={e=> setEmail(e.target.value)}
                />
            </label>
            <label className="password-signup">
                Password:
                <input
                type='password'
                value= {password}
                onChange={e=> setPassword(e.target.value)}
                />
            </label>
            <label className="confirm-password">
                Confirm Password:
                <input
                type='password'
                value= {confirmPassword}
                onChange={e=> setConfirmPassword(e.target.value)}
                />
            </label>
            <button className="signup-form-button" type="submit">Sign up</button>

        </form>
    )
}

export default SignupForm;