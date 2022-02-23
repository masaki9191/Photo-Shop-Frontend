import React, { useState, useEffect, useContext  } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from "../../../context/userProvider";
import { getProductDetail, removeProduct, goRoom } from "../../../services"
import ConfirmModal, {
    useConfirmModal
  } from '../../components/ConfirmModal';

function Show() {
    const { show: showConfirmModal, isConfirmModalLive } = useConfirmModal();
    const navigate = useNavigate();
    const { loginUser, isLoggedIn } = useContext(UserContext)
    const { productId } = useParams()
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)
    const [product, setProduct] = useState([])
    const isMe = loginUser.id === product.owner_id;
    let slider1 = []
    let slider2 = []
    const settings1 = {
        className: "slider-main",
        arrows: false,
        asNavFor: nav2,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: false,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                dots: true
              }
            }
        ]
    };
    const settings2 = {
        className: "slider-nav",
        arrows: false,
        slidesToShow: 3,
        swipeToSlide: true,
        focusOnSelect: true,
        infinite: product.photos && (product.photos).length > 3,
    };

    const removeClick = async() => {
        try {
            const response = await removeProduct({ productId: productId });
            if(response) {                
                navigate("/selllists");
            }
        } catch (err) {
            console.log(err);
        }
    }
    const goRoomFn = async() => {
        if (isLoggedIn == null) {
            navigate("/login");
        }
        try {
            const response = await goRoom({ productId: productId });
            if(response.success) {   
                const id = response.data.id;
                navigate(`/message/${id}`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const clickConfirm = e => {
        showConfirmModal();
    };

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [product])

    useEffect(async () => {
        const fetchData = async _ => {
            try {
                const data = await getProductDetail({ productId: productId });
                setProduct(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [productId])
    if(product.length == 0) 
        return false;
    return (
        <>
            {isConfirmModalLive && (
                <ConfirmModal removeClick={removeClick}/>
            )}
            <div className="goodDetail">
                <div className="goodDetail-item">
                    <div className="slider">
                        <div className="slider-item">
                            {
                                product.photos &&
                                   <> 
                                   <Slider asNavFor={nav2} ref={slider => (slider1 = slider)} {...settings1}>
                                        {(product.photos).map((photo, i) => {
                                            return (
                                                <div className="slider-sub" key={i}>
                                                    <figure className="home-shopItem__img">
                                                        <img src={photo['url']} alt="" />
                                                    </figure>
                                                </div>
                                            );
                                        })}
                                    </Slider>
                                    <Slider asNavFor={nav1} ref={slider => (slider2 = slider)} arrows={false}  {...settings2}>
                                        {(product.photos).map((photo, i) => {
                                            return (
                                                <div className="slider-sub" key={i}>
                                                    <figure className="home-shopItem__img">
                                                        <img src={photo['url']} alt="" />
                                                    </figure>
                                                    <div className="slider-sub-abs"></div>
                                                </div>
                                            );
                                        })}
                                    </Slider>
                                    </>
                            }
                        </div>
                    </div>
                    <div className="goodDetail-contents">
                        <p className="goodDetail-contents__txt">{product.description}</p>
                        <p className="goodDetail-contents__time"><span>時:</span><span>{product.time}</span></p>
                        <p className="goodDetail-contents__place"><span>駅:</span><span>{product.station}</span></p>
                    </div>
                </div>
                <div className="goodDetail-message">
                    {
                    isMe ? 
                        <><Link className="c-btn" to={`/product/edit/${product.id}`}>編集</Link><button className="c-btn" onClick={clickConfirm}>削除</button></> :
                        <button className="c-btn" onClick={goRoomFn}>メッセージを送る</button>
                    }                    
                </div>
            </div>
        </>
    )
}

export default Show;