"use client";
import React, { createRef, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./cropStyle.css";
import { message } from "antd";

interface ImageCroperType {
  image?: string | number;
  setModal1Open: any;
  setCropImage: any;
  multipleImage: any;
  setMultipleImage: any;
  handleDiemension: any;
  setImageId: any;
  imageId: any;
}

function ImageCroper({
  image,
  setModal1Open,
  setCropImage,
  multipleImage,
  setMultipleImage,
  setImageId,
  handleDiemension,
  imageId,
}: ImageCroperType) {
  const cropperRef = createRef<ReactCropperElement>();
  const getCropData = async () => {
    try {
      // Check if the cropper is defined
      if (typeof cropperRef.current?.cropper !== "undefined") {
        // Get the cropped canvas
        const canvas = cropperRef.current.cropper.getCroppedCanvas();

        if (canvas !== null) {
          // Convert the canvas to a data URL
          const dataURL = canvas.toDataURL();

          // Fetch the data URL and create a blob
          const res = await fetch(dataURL);
          const blob = await res.blob();

          // Create a File object from the blob
          const cropFile = new File([blob], "cropedImage.jpg", {
            type: "image/jpeg",
          });
          // Update the multipleImage state with the cropped image
          setMultipleImage((prevMultipleImage) =>
            prevMultipleImage.map((item) =>
              item.id === image.id
                ? {
                    ...item,
                    file: cropFile,
                  }
                : item
            )
          );
          setImageId([...imageId, image.id]);

          console.log(imageId, "sdafas");
          let secondArraySet = new Set([...imageId, image.id]);
          let filteredArray = multipleImage.filter(
            (item) => !secondArraySet.has(item.id)
          );
          handleDiemension(filteredArray[0].id);
          console.log(filteredArray, "filltete", filteredArray[0].id);
          message.success("your image is successfully crop ");
        } else {
          console.log("Error: getCroppedCanvas returned null.");
        }
      }

      // setModal1Open(false);
    } catch (error) {
      console.error("Error during cropping:", error);
    }
  };
  // const cropperRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const width = 2000;
  const height = 1300;
  const aspectRatio = width / height;
  const handleZoom = (e) => {
    const newZoomLevel = parseFloat(e.target.value);
    setZoomLevel(newZoomLevel);
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          // height: 468,
          // alignItems: "center",
          // display: "flex",
          // justifyContent: "center",
          // overflow: "hidden",
        }}
      >
        <Cropper
          ref={cropperRef}
          zoomTo={zoomLevel}
          // zoomTo={0.5}
          zoom={(e) => console.log(e, "sddssd")}
          style={{ height: 400, width: "100%" }}
          src={image.img}
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
      <div className="w-full flex justify-center">
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={zoomLevel}
          onChange={handleZoom}
          className="w-[50%] py-3"
        />
      </div>
      <div className="flex bg-red-4">
        {/* Group of images */}

        <div className="flex flex-wrap px-3">
          {Object.values(multipleImage).map((item, index) => {
            if (item && item.file instanceof Blob) {
              const objectURL = URL.createObjectURL(item.file);

              return (
                <img
                  src={objectURL}
                  alt=""
                  key={index}
                  onClick={() => handleDiemension(item.id)}
                  className="w-[15%] rounded-lg m-2"
                />
              );
            } else {
              return (
                <span key={index} className="text-red-500">
                  Invalid image data
                </span>
              );
            }
          })}
        </div>

        {/* Crop Image Button */}

        <div className="box" style={{ float: "right" }}>
          <h1>
            <button
              className=" flex justify-center border py-2 w-28 lg:px-3 rounded-md  bg-primary text-white "
              style={{ float: "right" }}
              onClick={getCropData}
            >
              Crop Image
            </button>
          </h1>
        </div>
      </div>
    </>
  );
}

export default ImageCroper;
