import React, { useState, useEffect  } from "react";
import { Link } from "react-router-dom";
import { getRooms } from "../../../services"
import { Avatar } from '../../components/Avatar';

function List() {
    const [rooms, setRooms] = useState([]);
    useEffect( async() => {
        const fetchData = async _ => {
            try {
                const response = await getRooms();
                setRooms(response);
            } catch (err) {
                console.log(err);
            }   
        }
        fetchData();
    }, []);
    return (
        <div className="u-content">
            <div className="message">
                <div className="message-list">
                    <div className="list content">
                        {rooms && rooms.map((room, i) => {
                            return (
                            <Link to={`/message/${room.id}`} className={`item ${ room.unread && `unread`}`} key={i}>
                                <Avatar src={room.lasted_comment_user_avatar}/>
                                <p className="name">{room.lasted_comment_user_name}</p>
                                <p className="txt">{room.lasted_comment_text}</p>
                            </Link>     
                            );
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;