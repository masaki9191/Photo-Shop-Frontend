import React, { useState, useContext, useEffect, useRef, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userProvider";
import { Avatar } from '../components/Avatar';

function Header() {
    const profileRef = useRef(null);
    const notificationRef = useRef(null);
    const { notifications, reLoadNotification, isLogined, setIsLogined, loginUser, setLoginUser } = useContext(UserContext);
    const [notificationShow, setNotificationShow] = useState(false);
    const [profileShow, setProfileShow] = useState(false);
    const navigate = useNavigate();

    const onLogoutHandler = () => {
        localStorage.clear();
        setLoginUser([]);
        setIsLogined(false);
        navigate("/");
    };
    const changeProfileShow = () => {
        setProfileShow(!profileShow);
    }
    const changeNotificationShow = () => {
        setNotificationShow(!notificationShow);
    }
    const handleClickOutside = (event) => {     
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setProfileShow(false);
        }
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
            setNotificationShow(false);
        }
    }
    const clickNotificationItem = () => {
        changeNotificationShow();
        reLoadNotification();
    }
    useEffect( () => { 
        document.addEventListener('click', handleClickOutside, true);
        
    }, []);

    return (
        <div className="c-login-header">
            <Link className="c-sub-header__logo" to="/">
                <img src="/assets/img/hd_logo.svg" alt="" />
            </Link>
            {
            isLogined ? 
                <div className={`c-sub-header-menu`}>
                    <div className="c-sub-header-menu__messageItem" ref={notificationRef}>
                        <div className="c-sub-header__message" onClick={changeNotificationShow}>
                            <img src="/assets/img/ico_message.svg" alt="" />
                            {notifications.length > 0 ? <span>{notifications.length}</span> : <></>}
                        </div>
                        <div className={`c-sub-header__message-content ${notificationShow?'d-block':''}`}>  
                            <div className="messages">                  
                                {notifications && notifications.map((room, i) => {
                                    return (
                                    <Link className="c-sub-header__message-links" to={`/message/${room.id}`} key={i} onClick={clickNotificationItem}>
                                        <span>{room.lasted_comment_user_name}さん</span>
                                        <span>{room.lasted_comment_text}</span>
                                    </Link>   
                                    );
                                })}                            
                            </div>    
                            <div className="all"><Link to="/message" onClick={changeNotificationShow}>メッセージ一覧</Link></div>
                        </div>
                    </div>
                    <div className="c-sub-header__profileItem"  ref={profileRef}>
                        <div className="c-sub-header__profile" onClick={changeProfileShow}>
                            <Avatar src={ loginUser.avatar }/>
                        </div>
                        <div className={`c-sub-header__profile-content ${profileShow?'d-block':''}`}  onClick={changeProfileShow}>
                            <Link className="c-sub-header__profile-links" to="/product/add">出品する</Link>
                            <Link className="c-sub-header__profile-links" to="/selllists">出品リスト</Link>
                            <Link className="c-sub-header__profile-links" to="/profile">設定</Link>
                            <p className="c-sub-header__profile-links" onClick={onLogoutHandler}>ログアウト</p>
                        </div>
                    </div>
                </div>
                :
                <div className={`c-login-header-btns`}>
                    <Link className="c-login-header__register" to="/register">登録</Link>
                    <Link className="c-login-header__login" to="/login">ログイン</Link>
                </div>
            }
        </div>
    )
}
export default (Header);