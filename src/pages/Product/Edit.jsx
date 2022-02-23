import React, { useState, useEffect, useContext  } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";
import { getProductDetail, productUpdate } from "../../../services";
import { Alert } from "../../components/Alert";
import { ProductFormContext ,ProductFormProvider } from '../../../context/productFormProvider';

function Form() {
    const navigate = useNavigate();    
    const { photos, setPhotos } = useContext(ProductFormContext);
    const [images, setImages] = useState([]); 
    const { productId } = useParams()
    const [responseMsg, setResponseMsg] = useState({
        success: "",
        message: ""
    });

    const [formValues, setFormValues] = useState({
        description: '',
        time: 0,
        station: 0,
        photos: []
    });

    const formValidate = () => {
        if(formValues.description == "")
        {
            alert("詳細:必須");
            return false;
        }
        if(formValues.time == 0)
        {
            alert("時:必須");
            return false;
        }
        if(formValues.station == 0){
            alert("駅:必須");
            return false;
        }
        if((formValues.photos).length == 0)
        {
            alert("画像:必須");
            return false;
        }
        return true;        
    }

    const handleForm = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleSubmit = async() => {
        if(formValidate() === false)
            return;
        try {
            const data = await productUpdate(productId, formValues);
            setResponseMsg(data);            
            navigate(`/product/${productId}`);
        } catch (err) {
            console.log(err);
        }   
    }
    useEffect(() => {
        setFormValues({ ...formValues, photos: photos });
    },[photos]);

    useEffect(() => {
        const fetchData = async _ => {
            try {
                const data = await getProductDetail({ productId: productId });
                const tempPhotos = (data.photos).map((photo, index) => {
                    return photo.name;
                })
                const tempImages = (data.photos).map((photo, index) => {
                    return photo.url;
                })
                const tempFormValues = {
                    description: data.description,
                    time: data.time_id,
                    station: data.station_id,
                    photos: tempPhotos
                }
                setFormValues(tempFormValues);
                setImages(tempImages);
                setPhotos(tempPhotos);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData()
    }, [productId])

    return (
        <>
            <div className="sellPage">
                <Alert responseMsg={responseMsg} />
                <ImageUpload images={images} setImages={setImages}/>
                <div className="form-group">
                    <label htmlFor="description">詳細</label>
                    <textarea name="description" id="" cols="30" rows="10" placeholder="詳細"  value={formValues.description} onChange={handleForm}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="time">時</label>
                    <select name="time" id="time"  value={formValues.time} onChange={handleForm}>
                        <option value="0">- 選択 -</option>
                        <option value="1">05:00</option>
                        <option value="2">06:00</option>
                        <option value="3">07:00</option>
                        <option value="4">08:00</option>
                        <option value="5">09:00</option>
                        <option value="6">10:00</option>
                        <option value="7">11:00</option>
                        <option value="8">12:00</option>
                        <option value="9">13:00</option>
                        <option value="10">14:00</option>
                        <option value="11">15:00</option>
                        <option value="12">16:00</option>
                        <option value="13">17:00</option>
                        <option value="14">18:00</option>
                        <option value="15">19:00</option>
                        <option value="16">20:00</option>
                        <option value="17">21:00</option>
                        <option value="18">22:00</option>
                        <option value="19">23:00</option>
                        <option value="20">00:00</option>
                        <option value="21">01:00</option>
                        <option value="22">02:00</option>
                        <option value="23">03:00</option>
                        <option value="24">04:00</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="station">駅</label>
                    <select name="station" id="station"  value={formValues.station} onChange={handleForm}>
                        <option value="0">- 選択 -</option>
                        <option value="1">渋谷</option>
                        <option value="2">原宿</option>
                        <option value="3">代々木</option>
                        <option value="4">新宿</option>
                        <option value="5">新大久保</option>
                        <option value="6">高田馬場</option>
                        <option value="7">目白</option>
                        <option value="8">池袋</option>
                        <option value="9">大塚</option>
                        <option value="10">巣鴨</option>
                        <option value="11">駒込</option>
                        <option value="12">田端</option>
                        <option value="13">西日暮里</option>
                        <option value="14">日暮里</option>
                        <option value="15">鶯谷</option>
                        <option value="16">上野</option>
                        <option value="17">御徒町</option>
                        <option value="18">秋葉原</option>
                        <option value="19">神田</option>
                        <option value="20">東京</option>
                        <option value="21">有楽町</option>
                        <option value="22">新橋</option>
                        <option value="23">浜松町</option>
                        <option value="24">田町</option>
                        <option value="25">高輪ゲートウェイ</option>
                        <option value="26">品川</option>
                        <option value="27">大崎</option>
                        <option value="28">五反田</option>
                        <option value="29">目黒</option>
                        <option value="30">恵比寿</option>
                    </select>
                </div>
                <div className="sellPage-registerBtn">
                    <p className="c-btn sellPage-subBtn" onClick={handleSubmit} >更新</p>
                </div>
            </div>
        </>
    )
}

function ProductEdit() {
    return (
        <> 
            <ProductFormProvider><Form/></ProductFormProvider>         
        </>
    )
}

export default ProductEdit;

