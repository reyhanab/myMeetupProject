import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editEvent, loadEvent } from "../../store/event";

function EditEventPage(){
    const {eventId} = useParams()
    const event = useSelector(state=> state.event.event)
    const events = useSelector(state => state.event)
    const event2 = events[eventId]
    const venueId = event.venueId;
    const [name, setName] = useState(event?.name);
    const [type, setType] = useState(event?.type)
    const [capacity, setCapacity] = useState(event?.capacity)
    const [price, setPrice] = useState(event?.price)
    const [description, setDescription] = useState(event?.description);
    const [startDate, setStartDate] = useState(event?.startDate);
    const [endDate, setEndDate] = useState(event?.endDate)
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrors([]);
        const payload = {
            venueId,name,type,capacity,price,description,startDate,endDate
        }
        // await dispatch(editEvent(payload, eventId))
        // alert(`"${name}" has been updated`)
        // history.push(`/events/${eventId}`)
        // // history.push('/')
        dispatch(editEvent(payload, eventId))
        .then(()=>{
            alert(`"${name}" has been Updated`)
            history.push(`/events/${eventId}`)
        })
        .catch(async (res)=>{
            const data = await res.json()
            if(data && data.errors) {
                const errorsArr = Object.values(data.errors)
                setErrors(errorsArr)
            }
        })
    }

    return (
        <>
            <div>
                <img className="create-event-image-background" src={event2?.previewImage}/>
            </div>
            <h1>Update Event</h1>
            <form onSubmit={handleSubmit}>
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
                    <button
                    className="submit-button"
                    type="submit"
                    >Submit</button>
                </div>

            </form>
        </>

    )

}

export default EditEventPage;