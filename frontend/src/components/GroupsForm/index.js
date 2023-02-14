import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGroups } from "../../store/group";
import { NavLink } from "react-router-dom";
import './GroupPage.css'


function GroupsPage (){
    const dispatch = useDispatch()
    const groupsArr = Object.values(useSelector(state=> state.group))

    // useEffect(()=>{
    //     dispatch(loadGroups())
    // },[dispatch])

    return (
        <>
            <h2 className="your-groups">Your groups</h2>
            <div className="your-groups-container">
                    {groupsArr?.map((group,i)=>(
                            <div key={i} className='group-div'>
                                <p className='group-name'>{group.name}</p>
                                <NavLink to={`/groups/${group.id}`}>
                                <img className="group-image" src={group.previewImage} />
                                </NavLink>
                                {/* <NavLink key={i} to={`/groups/${group.id}`} >{group.name}</NavLink> */}
                            </div>

                        ))
                    }

            </div>
        </>
    )

}

export default GroupsPage;