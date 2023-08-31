"use client";
import React, {  createRef } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropStyle.css";

function Demo({ image, setModal1Open, setCropImage }) {
  const cropperRef = createRef<ReactCropperElement>();

  const getCropData = async () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const canvas = cropperRef.current.cropper.getCroppedCanvas();
      const dataURL = canvas.toDataURL();
      const res = await fetch(dataURL);
      const blob = await res.blob();
      const cropFile = new File([blob], "cropedImage.jpg", {
        type: "image/jpeg",
      });
      const asd = URL.createObjectURL(cropFile);
      console.log(cropFile, "cropFilecropFile", asd);
      setCropImage(cropFile);
      setModal1Open(false);
    }
  };

  const width = 2000;
  const height = 1300;
  const aspectRatio = width / height;
  return (
    <div>
      <div style={{ width: 700 , height: 500, alignItems: 'center' ,display: 'flex', justifyContent: 'center' }}>
        <Cropper
          ref={cropperRef}
          // style={{ height: 600, width: "100%" }}
          zoomTo={0.5}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={height}
          minCropBoxWidth={width}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
          aspectRatio={aspectRatio}
        />
      </div>
      <div>
        <div
          className="box"
          style={{float: "right"}}
        >
          <h1>
            <button
              className=" sflex justify-center border py-2 w-28 lg:px-3 rounded-md  bg-blue-600 -mt-8"
              style={{ float: "right" }}
              onClick={getCropData}
            >
              Crop Image
            </button>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Demo;
