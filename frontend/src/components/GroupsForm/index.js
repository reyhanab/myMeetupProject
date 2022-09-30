import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGroups } from "../../store/group";
import { NavLink } from "react-router-dom";


function GroupsPage (){
    const dispatch = useDispatch()
    const groupsArr = Object.values(useSelector(state=> state.group))

    // useEffect(()=>{
    //     dispatch(loadGroups())
    // },[dispatch])

    return (
        <form>
            <h1>Groups:</h1>
            <ul>
                {groupsArr?.map((group,i)=>(
                        <li key={i}>
                            <NavLink key={i} to={`/groups/${group.id}`} >{group.name}</NavLink>
                        </li>

                    ))
                }
            </ul>
        </form>
    )

}

export default GroupsPage;