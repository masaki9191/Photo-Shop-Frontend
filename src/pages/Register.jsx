import React, { useState, useEffect, useContext} from "react";
import { signup } from "../../services"
import { saveJSON } from '../../utils';
import { useNavigate} from "react-router-dom";
import { fadeZoomIn } from "../../utils/styleHelper"
import { UserContext } from "../../context/userProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import useToken from '../../hooks/useToken';

function Register() {    
    const navigate = useNavigate();    
    const { isLogined, setIsLogined, setLoginUser } = useContext(UserContext);
    const { setToken } = useToken();
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const handleForm = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };
    const handleSubmit = async() => {
        try {
            const data = await signup({ user : formValues });
            if(data) {
                setIsLogined(true);
                setToken( data.token);
                setLoginUser( data.user);
                navigate("/selllists");
            }
        } catch (err) {
            console.log(err);
        }   
    }    
    useEffect(() => {
        AOS.init();
        if (isLogined == true) {
            navigate("/");
        }
    }, []);
    
    return (
        <>
            <div className="loginItem" {...fadeZoomIn}>
                <div className="loginItem-bg">
                    <div className="form-group">
                        <label>ユーザー名</label>
                        <input type="text" name="name"  value={formValues.name} onChange={handleForm}/>
                    </div>
                    <div className="form-group">
                        <label>メールアドレス</label>
                        <input type="email" name="email"  value={formValues.email} onChange={handleForm}/>
                    </div>
                    <div className="form-group">
                        <label>パスワード</label>
                        <input type="password" name="password" value={formValues.password} onChange={handleForm}/>
                    </div>
                    <div className="form-group">
                        <label>パスワード再確認</label>
                        <input type="password" name="confirmPassword"  value={formValues.confirmPassword} onChange={handleForm}/>
                    </div>
                    <a onClick={handleSubmit} className="c-btn loginItem-btn">登録</a>
                </div>
            </div>
        </>
    )
}

export default Register;