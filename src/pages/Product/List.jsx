import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from '../../components/Avatar';
import { getProductList } from "../../../services"
import ProductItem from '../../components/ProductItem';

function List() {
    const [products, setProducts] = useState([]);
    const [loding, setLoading] = useState(false);
    useEffect( async() => {
        const fetchData = async _ => {
            try {
            const datas = await getProductList();
            setProducts(datas);
            setLoading(true);
            } catch (err) {
                console.log(err);
            }   
        }
        fetchData();
    }, []);
    console.log("products", products);
    return (
        <div className="u-content">
            <div className="sellLists">
                <div className="sellLists-item">
                    {
                        products.length > 0 
                            ?   products.map((product, i) => {
                                return (
                                    <ProductItem data={product} key={i}/>                            
                                );
                            })
                            : loding && <p>出品中の商品はありません。</p>
                    }      
                </div>
            </div>
        </div>
    )
}

export default List;