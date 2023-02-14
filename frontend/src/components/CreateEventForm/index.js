import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createEvent } from "../../store/event";
import './CreateEventPage.css'


function CreateEventPage(){
    const {groupId} = useParams()
    // const venueId = groupId;
    const [name, setName] = useState('');
    const [type, setType] = useState('In person')
    const [capacity, setCapacity] = useState(20)
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('')
    const [errors, setErrors] = useState([])
    const [previewImage, setPreviewImage] = useState(null)
    const backgroundImage = 'https://clipart.world/wp-content/uploads/2021/05/Free-Group-of-Friends-clipart.png'

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors([]);
        const payload = {
            name,type,capacity,price,description,startDate,endDate, previewImage
        }
        dispatch(createEvent(payload, groupId))
        .then(()=>{
            alert(`"${name}" has been created`)
            history.push('/')
        })
        .catch(async (res)=>{
            const data = await res.json()
            if(data && data.errors) {
                const errorsArr = Object.values(data.errors)
                setErrors(errorsArr)
            }
        })
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setPreviewImage(file);
    };

    return (
        <>

            <form onSubmit={handleSubmit} >
                <div>
                    <img className='create-event-image-background' src={backgroundImage}/>
                </div>
                <h1>Create Event</h1>
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
                <div className="event-input-form">
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
                        <label className="group-label">
                            Capacity:
                            <input
                            className="group-input"
                            type='number'
                            value={capacity}
                            onChange={e=> setCapacity(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="div-input">
                        <label className="group-label">
                            Price:
                            <input
                            className="group-input"
                            type='number'

                            value={price}
                            onChange={e=> setPrice(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="div-input">
                        <label className="group-label">
                            Description:
                            <textarea
                            className="group-input"
                            type='text'
                            value={description}
                            onChange={e=> setDescription(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className="div-input">
                        <label className="group-label">
                            Start Date:
                            <input
                            className="group-input"
                            type='datetime-local'
                            value={startDate}
                            onChange={e=> setStartDate(e.target.value)}

                            />
                        </label>
                    </div>
                    <div className="div-input">
                        <label className="group-label">
                            End Date:
                            <input
                            className="group-input"
                            type='datetime-local'
                            value={endDate}
                            onChange={e=> setEndDate(e.target.value)}
                            />
                        </label>
                    </div>
                    <div>
                        <label className="group-label"> Preview Image:
                            <input className="group-input" type="file" onChange={updateFile} />
                        </label>
                    </div>
                    <button
                    type="submit"
                    className="submit-button"
                    >Submit</button>
                </div>

            </form>
        </>

    )

}

export default CreateEventPage;