import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
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
    const [previewImage, setPreviewImage] = useState(null)
    const backgroungImage = 'https://rcni.com/sites/rcn_nspace/files/Article-images/149701/Groupwork_tile_Stock.jpg'

    const handleSubmit = (e)=>{
        e.preventDefault()
        setErrors([])
        let errorsArr;
        const payload = {
            name, about,type, private:privateBool, city,state, previewImage
        }
        dispatch(createGroup(payload))
        .then(()=>{
            alert(`"${name}" has been created`)
            history.push('/')
        })
        .catch(async (res)=>{
            const data = await res.json()
            if (data && data.errors){
                errorsArr = Object.values(data.errors)
                setErrors(errorsArr)
            }
        })

    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewImage(file);
    };

    return(
        <>

            <form onSubmit={handleSubmit}>

                <div>
                    <img className='create-group-image-background' src={backgroungImage}/>
                </div>
                <h1>Start a new group</h1>
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
                <div className='input-form'>
                    <div className="div-input">
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
                    <div className="div-input">
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
                    <div className="div-input">
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
                    <label htmlFor="private" className="group-label">
                            Private
                        <input
                        type='checkbox'
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
                            className="group-input"
                            type='text'
                            value={city}
                            onChange={e=> setCity(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="div-input">
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
                    <div>
                        <label className="group-label"> Preview Image:
                            <input className="group-input" type="file" onChange={updateFile} />
                        </label>
                    </div>
                    <button
                    className="submit-button"
                    type="submit"
                    // disabled ={errors.length>0 ?true:false}
                    >Submit</button>
                </div>

            </form>
        </>
    )

}

export default CreateGroupPage;