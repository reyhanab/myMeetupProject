import { NavLink, Redirect, useHistory, useParams, } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroupThunk } from "../../store/group";


function GroupDetailPage(){

    const dispatch = useDispatch()
    const history = useHistory()
    const {groupId} = useParams()
    const groups = useSelector(state=> state.group)
    const group = groups[groupId]

    const deleteGroup = async(groupId) =>{
        await dispatch(deleteGroupThunk(groupId))
        return history.push('/user/groups')
    }
    // const editGroup = ()=>{
    //     return <Redirect to={`/groups/${groupId}/edit`}/>
    //     // return history.push(`/groups/${groupId}/edit`)

    // }

    return (
        <>
            <h1> Group {groupId}</h1>
            <h2>Name:{group?.name}</h2>
            <h2>About:{group?.about}</h2>
            <h2>Type:{group?.type}</h2>
            <h2>Number of Members:{group?.numMembers}</h2>
            <h2>City:{group?.city}</h2>
            <h2>State:{group?.state}</h2>
            {/* <button onClick={()=>editGroup}>Edit</button> */}
            <NavLink to={`/groups/${groupId}/edit`}>Edit</NavLink>
            <button onClick={()=>deleteGroup(groupId)}>Delete</button>

        </>
    )

}

export default GroupDetailPage;