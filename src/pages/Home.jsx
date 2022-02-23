import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getProductTotal, setCart, getCart } from "../../services";
import { currentData } from "../../utils/styleHelper";
import Pagination from "../components/Pagination";
import ProductItem from '../components/ProductItem';

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 1000,
        centerMode: true,
        variableWidth: true,
        adaptiveHeight: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    centerMode: false,
                    variableWidth: false,
                    adaptiveHeight: false,
                }
            }
        ]
    };
    const [page, setPage] = useState(1);
    const PAGE_MAX = 12;
    const [products, setProducts] = useState([]);
    const count = Math.ceil(products.length / PAGE_MAX);
    const ReadData = currentData(products, page, PAGE_MAX);
    const changePager = (e, value) => {
        setPage(value);
    };
    useEffect(async () => {
        const fetchData = async _ => {
            try {
                const datas = await getProductTotal();
                setProducts(datas);
                const productId = 1;
                const t1 = await setCart({productId});
                const t2 = await getCart();
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Slider {...settings}>
                <div className="homeSlider__img">
                    <img src="assets/img/slider_img.jpg" alt="" />
                </div><div className="homeSlider__img">
                    <img src="assets/img/slider_img.jpg" alt="" />
                </div><div className="homeSlider__img">
                    <img src="assets/img/slider_img.jpg" alt="" />
                </div>
            </Slider>
            <div className="u-inner-1230">
                <div className="home-shopItem">
                    {ReadData && ReadData.map((d, i) => {
                        return (
                            <ProductItem data={d} key={i}/>                            
                        );
                    })}
                </div>
                <Pagination count={count} page={page} onChange={changePager} />
            </div>
        </>
    )
}

export default Home