import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Avatar } from '../components/Avatar';
const ProductItem = memo(props => {
    const { data } = props;
    return (
        <Link to={`/product/${data.id}`} className="c-product">
            <figure className="c-product__img">
                <Avatar src={ data.thumbnail }/>
            </figure>
            <p className="c-product__txt"><span>{data.time} {data.station}</span></p>
        </Link>
    );
});
export default ProductItem;