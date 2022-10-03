import React ,{ useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { Link } from "react-router-dom";

function LoginFormModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <Link className="login-link" onClick={()=>setShowModal(true)}>Log In</Link>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;