import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Redirect  } from "react-router-dom";
import { editGroup } from "../../store/group";



function EditGroupPage(){
    const {groupId} = useParams()
    const groups = useSelector(state=> state.group)
    const group = groups[groupId]
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState(group?.name);
    const [about, setAbout] = useState(group?.about);
    const [type, setType] = useState(group?.type);
    const [privateBool, setPrivateBool] = useState(group?.private);
    const [city, setCity] = useState(group?.city);
    const [state, setState] = useState(group?.state);
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setErrors([])
        const payload = {
            name, about,type, private:privateBool, city,state
        }
        // await dispatch(editGroup(payload, groupId))
        // alert(`"${name}" has been updated`)
        // history.push(`/groups/${groupId}`)
        // // history.push('/')
        dispatch(editGroup(payload, groupId))
        .then(()=>{
            alert(`"${name}" has been Updated`)
            history.push(`/groups/${groupId}`)
        })
        .catch(async (res)=>{
            const data = await res.json()
            if(data && data.errors) {
                const errorsArr = Object.values(data.errors)
                setErrors(errorsArr)
            }
        })


    }

    return(
        <form onSubmit={handleSubmit}>
              <div>
                <img className="create-group-image-background" src={group?.previewImage}/>
            </div>
            <h1>Update your group</h1>
                {errors.length>0 && (
                    <div className="create-group-error">Errrors:
                        <ul>
                            {errors.map(error=>{
                                return <li key={error}>{error}</li>
                            })}
                        </ul>
                    </div>
                )
                }
            <div className="input-form">
                <div className="div-input">
                    <label className="group-label">
                        Name:
                        <input
                        type='text'
                        className="group-input"
                        value={name}
                        onChange={e=> setName(e.target.value)}
                        />
                    </label>
                </div>
                <div className="div-input">
                <label className="group-label">
                    About:
                    <textarea
                    type='text'
                    value={about}
                    className="group-input"
                    onChange={e=> setAbout(e.target.value)}
                    />
                </label>
                </div>
                <div  className="div-input">
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
                <div className="div-input">

                    <label className="group-label" htmlFor="private">
                        Private
                        <input
                        type='checkbox'
                        className="group-input"
                        id='private'
                        onChange={()=>setPrivateBool(!privateBool)}
                        checked= {privateBool === true}
                    />
                    </label>
                </div>
                <div className="div-input">
                    <label className="group-label">
                        City:
                        <input
                        type='text'
                        className="group-input"
                        value={city}
                        onChange={e=> setCity(e.target.value)}
                        />
                    </label>
                </div>
                <div className="div-input">
                    <label className="group-label">
                        State:
                        <input
                        type='text'
                        className="group-input"
                        value={state}
                        onChange={e=> setState(e.target.value)}
                        />
                    </label>
                </div>
                <button className="submit-button" type="submit">Submit</button>
            </div>

        </form>
    )
}

export default EditGroupPage;