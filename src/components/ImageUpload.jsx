import React, { memo, useState, useCallback, useContext  } from 'react';
import { uploadmedia } from '../../services'
import { ProductFormContext } from '../../context/productFormProvider';


function ImageUpload(props) {
  const {photos, setPhotos} = useContext(ProductFormContext);
  const {images, setImages} = props;
  const addImage = useCallback(async (e) => {
    let fileObj = e.target.files;
    let tempPhotos = [];
    let tempImages = [];
    if((images.length + fileObj.length) > 3) {
      alert("出品時の画像の最大枚数はとりあえず3枚までです。");
      return;
    }
    console.log("images.length", images.length);
    console.log("ifileObj.length", fileObj.length);
    for (let i = 0; i < fileObj.length; i++) {
      const file = fileObj[i];
      const url = URL.createObjectURL(file);
      try {
        const res = await uploadmedia({ file: file });
        tempImages.push(url);
        tempPhotos.push(res.name);
      } catch (err) {
        console.log(err);
      }
    }
    setImages((t) => [...t, ...tempImages]);
    setPhotos((t) => [...t, ...tempPhotos]);
  }, [images, photos]);

  const removeImage = useCallback((index) => {
    const tempImages = images.filter((d, i) => {
      return i !== index;
    });
    setImages(tempImages);
    const tempPhotos = photos.filter((d, i) => {
      return i !== index;
    });
    setPhotos(tempPhotos);
  }, [images, photos]);

  return (
    <div className="form-group">
      <div className="c-images">
        <ImagePreview images={images} addImage={addImage} removeImage={removeImage} />
      </div>
    </div>
  );
}

const ImagePreview = memo(props => {
  const { images, addImage, removeImage } = props;
  console.log(images.length);
  return (
    <>
      {images.map((image, index) => {
        return <div
          className="img"
          style={{ backgroundImage: `url(${image})` }} key={index}>
          <span onClick={e => removeImage(index) }>remove</span>
        </div>;
      })}
      { 
      images.length < 3 
        ? (<label htmlFor='file' className="pic">
            add
            <input type="file" accept="image/*" id="file" name="file" onChange={addImage} multiple hidden />
          </label>)
        : <></>
      }
    </>
  );
});


export default ImageUpload;