import React, { useState, useEffect, useRef  } from "react";
import { Link, useParams } from "react-router-dom";
import { getMessages, sendMessage } from "../../../services"
import { loadJSON } from '../../../utils';
import { Avatar } from '../../components/Avatar';
import ProductItem from '../../components/ProductItem';

function Detail() {
    const user = loadJSON('user');
    const { roomId } = useParams()
    const messagesEndRef = useRef(null)
    const [messages, setMessages] = useState([]);
    const [product, setProduct] = useState([]);    
    const [value, setValue] = useState('');

    const changeMessage = e => {
        const newValue = e.target.value;
        setValue(newValue);
    };

    const sendFn = async() => {
        try {
            if(value == "")
            {
                return;
            }
            const message = { text: value, room_id: roomId };
            const response = await sendMessage({ message });
            if(response) 
            {
                setValue("");
                fetchData();
            }
        } catch (err) {
            console.log(err);
        }   
    }
    const fetchData = async _ => {
        try {
            const response = await getMessages({ roomId });
            setProduct(response.product);
            setMessages(response.messages);
            scrollToBottom();
            setTimeout(fetchData, 2000);  
        } catch (err) {
            console.log(err);
        }   
    }
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    useEffect(() => {   
        fetchData();      
    }, [roomId]);
    return (
        <div className="u-content">
            <div className="message">
                <div className="message-detail">
                    <div className="header">
                        <div className="header__inner">
                            <div className="header__left">
                                <ProductItem data={product} />
                                <p>メッセージ</p>
                            </div>                            
                            <button className="reload" onClick={fetchData}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24.477 21.275"
                                >
                                <g transform="translate(0 -33.484)">
                                    <path
                                    d="M20.064,215.576l.019-.03-.157.159c-.1.1-.251.259-.447.448l-.341.286a3.915,3.915,0,0,1-.41.318l-.485.334-.565.319c-.2.109-.417.193-.633.3a2.615,2.615,0,0,1-.34.133l-.354.123a2.76,2.76,0,0,1-.368.106l-.379.095c-.255.062-.524.087-.788.134-.269.025-.543.041-.815.054l-.413-.01a3.089,3.089,0,0,1-.413-.024,6.783,6.783,0,0,1-.821-.12l-.4-.084-.395-.12a7.487,7.487,0,0,1-1.477-.639c-.23-.126-.441-.284-.656-.417l-.02-.013,0,0,0,0,.018.01-.027-.02-.005-.006,0,.005-.018-.013-.091-.066-.18-.132a1.366,1.366,0,0,1-.144-.12l-.125-.111c-.083-.074-.164-.15-.243-.227l-.03-.029c-.156-.154-.3-.312-.44-.472l-.036-.043c-.066-.079-.131-.158-.19-.237a6.9,6.9,0,0,1-.653-1.022c-.1-.205-.192-.431-.269-.619l0-.017H8.537l.911,0,0,0h.009l-3.534-4.99-1.156-1.637v0l0-.007-3,4.186L0,213.788H.005L0,213.8H2.6c.052.121.114.268.185.421l.252.493c.1.174.2.365.329.56a10.941,10.941,0,0,0,.91,1.247A10.435,10.435,0,0,0,7.2,218.9l.241.129c.079.042.167.09.229.115l.45.2c.327.12.646.257.983.356a9.825,9.825,0,0,0,2.064.4c.174.013.347.029.52.038l.52-.005a8.583,8.583,0,0,0,1.019-.074,4.213,4.213,0,0,0,.5-.079l.484-.1c.316-.083.625-.172.923-.268.293-.118.584-.214.854-.346l.4-.2a3.39,3.39,0,0,0,.378-.205l.356-.218a3.056,3.056,0,0,0,.335-.223c.21-.161.421-.3.6-.461l.516-.462.425-.453a4.134,4.134,0,0,0,.348-.418l.28-.363c.151-.227.261-.411.341-.533l.06-.1.065-.089ZM9.394,216.914l0,0,0,0-.005,0C9.4,216.916,9.371,216.9,9.394,216.914Z"
                                    transform="translate(0 -165.377)"
                                    />
                                    <path
                                    d="M111.884,39.79l.005-.008h-2.6c-.052-.121-.114-.226-.185-.379l-.252-.493c-.1-.174-.2-.365-.329-.56a10.945,10.945,0,0,0-.91-1.247,10.429,10.429,0,0,0-2.922-2.384l-.241-.129c-.08-.042-.167-.09-.229-.115l-.45-.2c-.327-.12-.646-.257-.983-.356a9.83,9.83,0,0,0-2.064-.4c-.174-.013-.348-.029-.52-.038l-.52.005a8.544,8.544,0,0,0-1.019.074,4.152,4.152,0,0,0-.5.079l-.484.1c-.316.083-.625.172-.923.268-.293.118-.584.214-.854.345l-.4.2a3.357,3.357,0,0,0-.378.205l-.356.218a3.077,3.077,0,0,0-.335.223c-.21.161-.42.3-.6.461l-.516.462-.425.453a4.184,4.184,0,0,0-.348.418l-.28.363c-.152.227-.262.411-.341.533l-.06.095-.065.089.025-.025-.019.03.157-.159c.1-.1.251-.259.447-.448l.341-.286a3.863,3.863,0,0,1,.409-.318l.485-.334.565-.319c.2-.108.417-.193.633-.3a2.611,2.611,0,0,1,.34-.133l.354-.123a2.786,2.786,0,0,1,.368-.106l.379-.094c.255-.062.524-.087.788-.134.269-.025.542-.042.815-.054l.413.01a3.069,3.069,0,0,1,.413.024,6.7,6.7,0,0,1,.821.12l.4.084.395.121a7.467,7.467,0,0,1,1.477.639c.23.125.441.284.656.417l.02.013,0,0,0,0-.018-.01.027.02.005.006,0-.005.018.013.09.066.18.132a1.327,1.327,0,0,1,.144.12l.125.111a7.313,7.313,0,0,1,.94,1.009,6.939,6.939,0,0,1,.653,1.022c.092.181.17.347.24.512.01.027.023.055.032.081h-1.582l-.9,0,0,0h-.009l4.7,6.674,3.018-4.234,1.739-2.432ZM102.5,36.706l0,0,0,0,.005,0C102.492,36.7,102.519,36.719,102.5,36.706Z"
                                    transform="translate(-87.412)"
                                    />
                                </g>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <div className="messages">
                            {messages && messages.map((message, i) => {
                                return (
                                <div className={`item ${message.user_id == user.id ? `me` : ``}`} key={i}>
                                     <div className="item__inner">
                                         <div className="item__top">
                                            <div>
                                                <Avatar src={message.user_avatar}/>
                                                <p>{message.user_name}</p>
                                            </div>
                                            <p className="text">
                                                {message.text}
                                            </p>
                                         </div>
                                         <div className="item__bottom">
                                            {message.created_at}
                                         </div>                                         
                                     </div>
                                </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <form className="messageForm">
                            <textarea className="messagebox" onChange={e => changeMessage(e)} value={value}/>
                            <button type="button" className="subBtn" onClick={sendFn}>送信</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;