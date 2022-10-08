import React ,{ useState } from "react";
import LoginForm from "./LoginForm";
import { Modal } from "../../context/Modal";
import { Link } from "react-router-dom";

function LoginFormModal(){
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <h2 className="login-link" onClick={()=>setShowModal(true)}>Log In</h2>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    )
}

export default LoginFormModal;