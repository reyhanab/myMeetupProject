import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createGroup } from "../../store/group";
import './CreateGroupPage.css'


function CreateGroupPage(){

    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('In person');
    const [privateBool, setPrivateBool] = useState(false);
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setErrors([])
        const payload = {
            name, about,type, private:privateBool, city,state
        }
        // return dispatch(createGroup(payload)).catch(async (res)=>{
        //     const data = await res.json()
        //     if(data && data.errors) setErrors(data.errors)
        //     alert(`"${name}" has been created`)
        //     reset()
        // })
        const result = await dispatch(createGroup(payload))
            alert(`"${name}" has been created`)
            history.push('/')
    }
    const reset = ()=>{
        setName('');
        setAbout('');
        setType('In person');
        setPrivateBool(false);
        setCity('');
        setState('');
    }

    return(
        <>
            <h1>Start a new group</h1>
            <form onSubmit={handleSubmit} className='group-input-form'>

                <div className="group-div-input">
                    <label className="group-label">
                        Name:
                        <input
                        className="group-input"
                        type='text'
                        value={name}
                        onChange={e=> setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="group-div-input">
                    <label className="group-label">
                        About:
                        <textarea
                        className="group-input"
                        type='text'
                        value={about}
                        onChange={e=> setAbout(e.target.value)}
                        />
                    </label>
                </div>
                <div className="group-div-input">
                    <label className="group-label">
                        Type:
                        <select
                            onChange= {e=> setType(e.target.value)}
                            value={type}
                            className="group-input"
                        >
                            <option
                            key='Online'
                            value='Online'>
                                Online
                            </option>
                            <option
                            key='In person'
                            value='In person'>
                                In person
                            </option>
                        </select>
                    </label>

                </div>
                <div className="group-div-input">
                    <input
                    type='checkbox'
                    id='private'
                    onChange={()=>setPrivateBool(!privateBool)}
                    />
                    <label htmlFor="private" className="group-label">
                        Private
                    </label>
                </div>
                <div className="group-div-input">
                    <label className="group-label">
                        City:
                        <input
                        className="group-input"
                        type='text'
                        value={city}
                        onChange={e=> setCity(e.target.value)}
                        />
                    </label>
                </div>
                <div className="group-div-input">
                    <label className="group-label">
                        State:
                        <input
                        className="group-input"
                        type='text'
                        value={state}
                        onChange={e=> setState(e.target.value)}
                        />
                    </label>
                </div>
                <button type="submit" disabled={errors.length ? true : false}>Submit</button>

            </form>
        </>
    )

}

export default CreateGroupPage;