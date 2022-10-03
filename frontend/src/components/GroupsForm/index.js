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
            <form className="your-groups-container">


                    {groupsArr?.map((group,i)=>(
                            <div key={i} className='group-div'>
                                <NavLink className='group-name group' to={`/groups/${group.id}`}>{group.name}
                                <img className="group-image group" src={group.previewImage} />
                                </NavLink>
                                {/* <NavLink key={i} to={`/groups/${group.id}`} >{group.name}</NavLink> */}
                            </div>

                        ))
                    }

            </form>
        </>
    )

}

export default GroupsPage;