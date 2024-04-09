import React, {useState} from "react";
import "./adminLogin.css";
import {useDispatch, useSelector} from "react-redux";
import {adminLoginSuccess} from "../../../redux/userSlice";
import {useNavigate} from "react-router";

const AdminLogin = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const { token } = useSelector((state) => state.user);


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:5001/auth/login`, {
                headers: {
                    'Content-Type': 'application/json'

                },
                method: "POST",
                body: JSON.stringify({username: username, email: email, password: password})
            });
            if (res.ok) {
                const data = await res.json();
                if (data.isAdmin) {
                    console.log(data);
                    dispatch(adminLoginSuccess(data))
                    navigate("/admin/home");
                } else {
                    throw new Error("You are not authorized to login as admin")
                }
            } else {
                throw new Error("Authentication failed")
            }
        } catch (error) {
            setTimeout(() => {
                setError(true)
            }, 3000)
        }


    }


    return (
        <div  className= "login-container" >
            <div className= "adminLogin-container">
                <h1 className= "adminLogin-login">ADMIN LOG IN</h1>
                <input  type= "username" className= "adminLogin-input" placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                />
                <input className= "adminLogin-input"
                       type= "email"
                       placeholder= "email"
                       onChange={(e) => setEmail(e.target.value)}

                />
                <input className= "adminLogin-input"
                       type= "password"
                       placeholder= "password"
                       onChange={(e) => setPassword(e.target.value)}
                />
                <button className= "adminLogin-button"
                        onClick= {handleLogin}
                >Login</button>
            </div>
        </div>
    )
}

export default AdminLogin;