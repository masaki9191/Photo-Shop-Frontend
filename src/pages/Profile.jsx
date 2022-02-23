import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Avatar } from '../components/Avatar';
import { UserContext } from "../../context/userProvider";

function Profile() {
    const { loginUser } = useContext(UserContext);
    return (
        <div className="u-content">
            <div className="profile">
                <div className="profile-item">
                    <figure className="profile__img">
                        <Avatar src={ loginUser?.avatar }/>
                    </figure>
                    <p className="profile__name">{ loginUser?.name}</p>
                    <div className="profile-editBtn">
                        <Link className="c-btn" to="/profileEdit">変更</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;