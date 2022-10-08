import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signup } from "../../store/session";
import { login } from "../../store/session";
import './SignupForm.css'


function SignupForm(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    // if (sessionUser) return <Redirect to='/' />

    const onSubmit = (e)=>{
        e.preventDefault()
        setErrors([])
        if (password === confirmPassword){
            dispatch(signup({firstName,lastName,email,password}))
            .catch(async res=>{
                const data = await res.json();
                if (data && data.errors){
                    const errorsArr = Object.values(data.errors)
                    setErrors(errorsArr)
                }
                // else{
                //     dispatch(login({email,password}))
                //     history.push('/')
                // }
            })

        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
        <form  onSubmit={onSubmit}>
              {errors.length>0 && (
                    <div className="signup-error">Errrors:
                        <ul>
                            {errors.map(error=>{
                                return <li key={error}>{error}</li>
                            })}
                        </ul>
                    </div>
                )
                }
            <div className="signup-form">
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
                    required
                    onChange={e=> setEmail(e.target.value)}
                    />
                </label>
                <label className="password-signup">
                    Password:
                    <input
                    type='password'
                    value= {password}
                    required
                    onChange={e=> setPassword(e.target.value)}
                    />
                </label>
                <label className="confirm-password">
                    Confirm Password:
                    <input
                    type='password'
                    value= {confirmPassword}
                    required
                    onChange={e=> setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className="signup-form-button" type="submit">Sign up</button>
            </div>

        </form>
    )
}

export default SignupForm;