import { NavLink, Redirect, useHistory, useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupThunk } from "../../store/group";
import { Route } from "react-router-dom";
import EditGroupPage from "../EditGroupForm";
import './GroupDetailPage.css'


function GroupDetailPage(){
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const {groupId} = useParams()
    const groups = useSelector(state=> state.group)
    const group = groups[groupId]

    const deleteGroup = async(groupId) =>{
        await dispatch(deleteGroupThunk(groupId))
        return history.push('/user/groups')
    }
    const editGroup = ()=>{
        return <Redirect to={`/groups/${groupId}/edit`}/>
        // return history.push(`/groups/${groupId}/edit`)

    }

    return (
        <form className="group-detail-form">
            <div>
                <img className='group-image-background' src={group?.previewImage}/>
            </div>
            <div className="group-detail-div">
                <h2 >{group?.name}</h2>
                <h3>{group?.about}</h3>

                <h2>Number of Members:{group?.numMembers}</h2>
                <h2>City:{group?.city}</h2>
                <h2>State:{group?.state}</h2>
            </div>
            <div className="edit-delete-div">
                {/* <button onClick={()=>editGroup}>Edit</button> */}
                <NavLink to={`/groups/${groupId}/edit`}>Edit</NavLink>
                <button onClick={()=>deleteGroup(groupId)}>Delete</button>
            </div>

        </form>
    )

}

export default GroupDetailPage;