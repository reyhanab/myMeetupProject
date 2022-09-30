import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../store/group";


function CreateGroupPage(){

    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [type, setType] = useState('Online');
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
            reset()
    }
    const reset = ()=>{
        setName('');
        setAbout('');
        setType('Online');
        setPrivateBool(false);
        setCity('');
        setState('');
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Start a new group</h1>
            <label>
                Name:
                <input
                type='text'
                value={name}
                onChange={e=> setName(e.target.value)}
                />
            </label>
            <label>
                About:
                <textarea
                type='text'
                value={about}
                onChange={e=> setAbout(e.target.value)}
                />
            </label>
            <label>
                Type:
                <select
                    onChange= {e=> setType(e.target.value)}
                    value={type}
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
            <input
            type='checkbox'
            id='private'
            onChange={()=>setPrivateBool(!privateBool)}
            />
            <label htmlFor="private">
                Private
            </label>
            <label>
                City:
                <input
                type='text'
                value={city}
                onChange={e=> setCity(e.target.value)}
                />
            </label>
            <label>
                State:
                <input
                type='text'
                value={state}
                onChange={e=> setState(e.target.value)}
                />
            </label>
            <button type="submit" disabled={errors.length ? true : false}>Submit</button>

        </form>
    )

}

export default CreateGroupPage;