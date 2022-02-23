import React, { useState, useEffect, useContext }from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile, getUser } from "../../services"
import { UserContext } from "../../context/userProvider";

import { Alert } from "../components/Alert"
function ProfileEdit() {
    const navigate = useNavigate();
    // image onchange hander
    const { loginUser, setLoginUser } = useContext(UserContext);
    const [avatar, setAvatar] = useState("");
    const [formValues, setFormValues] = useState({
        name: '',
        avatar: []
    });
    const [responseMsg, setResponseMsg] = useState({
        success: "",
        message: ""
    });
    const handleChangeName = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };
    const handleChangeAvatar = (e) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setAvatar(url);
        setFormValues({ ...formValues, ["avatar"]: file });
    };
    const handleSubmit = async() => {
        try {
            const data = await updateProfile({ user : formValues });
            setResponseMsg(data);
            setLoginUser(data.data);
            navigate("/profile");
        } catch (err) {
            console.log(err);
        }   
    }
    useEffect( async() => {
        try {          
            setAvatar(loginUser?.avatar);
            setFormValues({ ...formValues, ["name"]: loginUser?.name });
        } catch (err) {
            console.log(err);
        }   
    }, []);

    return (
        <div className="u-content">
            <div className="profileEdit">
                <div className="profileEdit-item">
                   <Alert responseMsg={responseMsg} />
                    <div className="form-group">
                        <label>ユーザー名</label>
                        <input type="text" name="name" value={formValues.name} onChange={handleChangeName}/>
                    </div>
                    <div className="form-group">    
                        <label>アバター</label>                        
                        <div className="avatar">
                            <img id="avatar_img" name="avatar_img" src={`${avatar ? avatar : `assets/img/profile/profile1.jpg`}`}/>
                            <div className="">                                
                                <label htmlFor="avatar">
                                    変化する
                                    <input
                                    type="file"
                                    accept="image/*" 
                                    id="avatar"
                                    name="avatar"                      
                                    onChange={handleChangeAvatar}
                                    className="form-control"
                                    hidden
                                    />
                                </label>   
                            </div>
                        </div>                     
                    </div>

                    <button type="button" onClick={handleSubmit} className="c-btn">
                    完了
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProfileEdit;