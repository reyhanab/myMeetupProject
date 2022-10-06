import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createEvent } from "../../store/event";

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

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setErrors([]);
        const payload = {
            name,type,capacity,price,description,startDate,endDate
        }
        const result = await dispatch(createEvent(payload, groupId))
        alert(`"${name}" has been created`)
        history.push('/')
    }

    return (
        <>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
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
                <div className="group-div-input">
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
                <div className="group-div-input">
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
                <div className="group-div-input">
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
                <div className="group-div-input">
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
                <button type="submit" >Submit</button>

            </form>
        </>

    )

}

export default CreateEventPage;