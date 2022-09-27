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
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map(error=>{
                    <li key={error}>{error}</li>
                })}
            </ul>
            <label>
                FirstName:
                <input
                type='text'
                value= {firstName}
                onChange={e=> setFirstName(e.target.value)}
                />
            </label>
            <label>
                lastName:
                <input
                type='text'
                value= {lastName}
                onChange={e=> setLastName(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                type='email'
                value= {email}
                onChange={e=> setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                type='password'
                value= {password}
                onChange={e=> setPassword(e.target.value)}
                />
            </label>
            <label>
                Confirm Password:
                <input
                type='password'
                value= {confirmPassword}
                onChange={e=> setConfirmPassword(e.target.value)}
                />
            </label>
            <button type="submit">Sign up</button>
        </form>
    )
}

export default SignupForm;