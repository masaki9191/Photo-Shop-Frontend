import React, { memo } from "react";
const Avatar = memo((props) => {
    const { src } = props;
    const default_url = "/assets/img/profile/profile1.jpg";
    return (        
        <img src={src == "" ? default_url : src} alt="" className="avatar" />
    );
});
export { Avatar };