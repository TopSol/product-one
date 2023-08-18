
"use client"
import React, { useState, createRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropStyle.css";

function Demo({ image , setModal1Open , setCropImage}) {
  
  const cropperRef = createRef<ReactCropperElement>();
  
const getCropData = async () => {
  if (typeof cropperRef.current?.cropper !== "undefined") {
    const canvas = cropperRef.current.cropper.getCroppedCanvas()

const dataURL = canvas.toDataURL()
const res = await fetch(dataURL)
const blob = await res.blob()

const cropFile = new File([blob], 'cropedImage.jpg', {type: 'image/jpeg'})
const asd = URL.createObjectURL(cropFile)
console.log("cropFilecropFile", asd)
setCropImage(cropFile)
setModal1Open(false);
  }
};
  
return (
  <div>
    <div style={{ width: "100%" }}>
      <Cropper
        ref={cropperRef}
        style={{ height: 400, width: "100%" }}
        zoomTo={0.5}
        initialAspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        guides={true}
      />
    </div>
    <div>
      <div
        className="box"
        style={{ width: "50%", float: "right", height: "300px" }}
      >
        <h1>
          <button style={{ float: "right" }} onClick={getCropData}>
            Crop Image
          </button>
        </h1>
      </div>
    </div>
  </div>
);
}

export default Demo;
