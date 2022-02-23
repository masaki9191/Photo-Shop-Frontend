import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const onLogoutHandler = () => {
        localStorage.clear();        
        navigate("/");
    };
    return (
        <>
            <div className="c-sidebar">
                <Link className="c-sidebar__links" to="/message">
                    <span>
                        <img src="/assets/img/profile/ico/ico_message.svg" alt="" />
                    </span>
                    <span>メッセージ</span>
                </Link>
                <Link className="c-sidebar__links" to="/selllists">
                    <span>
                        <img src="/assets/img/profile/ico/ico_sell_lists.svg" alt="" />
                    </span>
                    <span>出品リスト</span>
                </Link>
                <Link className="c-sidebar__links" to="/profile">
                    <span>
                        <img src="/assets/img/profile/ico/ico_setting.svg" alt="" />
                    </span>
                    <span>設定</span>
                </Link>
                <p className="c-sidebar__links" onClick={onLogoutHandler}>
                    <span>
                        <img src="/assets/img/profile/ico/ico_logout.svg" alt="" />
                    </span>
                    <span>ログアウト</span>
                </p>
            </div>
        </>
    )
}

export default Sidebar;