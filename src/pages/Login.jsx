import React, { useState, useEffect, useContext  } from "react";
import { useNavigate} from "react-router-dom";
import { signin } from "../../services"
import { saveJSON } from '../../utils';
import { UserContext } from "../../context/userProvider";
import { fadeZoomIn } from "../../utils/styleHelper"
import AOS from "aos";
import "aos/dist/aos.css";
import useToken from '../../hooks/useToken';


function Login() {
    const navigate = useNavigate();
    const { isLogined, setIsLogined, setLoginUser } = useContext(UserContext);
    const { setToken } = useToken();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const handleForm = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };
    useEffect(() => {
        AOS.init();
        if (isLogined == true) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async() => {
        try {
            const data = await signin({ user : formValues } );
            if(data) {
                setIsLogined(true);
                setToken( data.token);
                setLoginUser( data.user);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    }    

    return (
        <>
            <div className="loginItem" {...fadeZoomIn}>
                <div className="loginItem-bg">
                    <div className="form-group">
                        <label htmlFor="">メールアドレス</label>
                        <input type="email" name="email"  value={formValues.email} onChange={handleForm}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">パスワード</label>
                        <input type="password" name="password" value={formValues.password} onChange={handleForm}/>
                    </div>
                    <a onClick={handleSubmit} className="c-btn loginItem-btn">ログイン</a>
                    {/* <a href="" className="loginItem-passwordReset">パスワードをお忘れですか？</a> */}
                </div>
            </div>
        </>
    )
}

export default Login;