import { useState, createContext } from "react";

export const ProductFormContext = createContext();

export const ProductFormProvider = props => {
    const { children } = props;

    const [photos, setPhotos] = useState([]);   
    const value = {
        photos: photos,
        setPhotos: setPhotos,
    }
    return <ProductFormContext.Provider value={value}>{children}</ProductFormContext.Provider>;
};