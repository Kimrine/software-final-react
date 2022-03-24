import {useNavigate} from "react-router-dom";
import {useState} from "react";
import * as service from "../../services/auth-service"
import {signup} from "../../services/auth-service";

export const Login = () => {
    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate()
    const login = () =>
        service.login(loginUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    return (
        <div>
            <h1>Login</h1>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                                 username: e.target.value})}/>
            <input onChange={(e) =>
                setLoginUser({...loginUser,
                                 password: e.target.value})}/>
            <button onClick={login}>
                Login</button>
            <button onClick={navigate('/login')}>
                Signup</button>
        </div>
    );
};
