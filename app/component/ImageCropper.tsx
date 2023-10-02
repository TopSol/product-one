"use client";
  import React, { createRef } from "react";
  import Cropper, { ReactCropperElement } from "react-cropper";
  import "cropperjs/dist/cropper.css";
  import "./cropStyle.css";

  interface ImageCroperType {
    image? : string | number,
    setModal1Open: any,
    setCropImage: any,
    multipleImage:any,
    setMultipleImage:any
  }

  function ImageCroper({
    image,
    setModal1Open,
    setCropImage,
    multipleImage,
    setMultipleImage,
  }:ImageCroperType) {
    console.log(image, "multipleImage", multipleImage);
    const cropperRef = createRef<ReactCropperElement>();
    const getCropData = async () => {
      try {
        const newMultipleImages = await Promise.all(
          multipleImage.map(async (item) => {
            console.log(item.id === image.id, "macting");

            if (item.id === image.id) {
              if (typeof cropperRef.current?.cropper !== "undefined") {
                const canvas = cropperRef.current.cropper.getCroppedCanvas();
                if (canvas !== null) {
                  const dataURL = canvas.toDataURL();
                  const res = await fetch(dataURL);
                  const blob = await res.blob();
                  const cropFile = new File([blob], "cropedImage.jpg", {
                    type: "image/jpeg",
                  });
                  return {
                    ...item,
                    file: cropFile,
                  };
                } else {
                  console.log("Error: getCroppedCanvas returned null.");
                }
              }
            }
            return item;
          })
        );

        setMultipleImage(newMultipleImages);
        console.log(newMultipleImages, "newMultipleImages");

        setModal1Open(false);
      } catch (error) {
        console.error("Error during cropping:", error);
      }
    };
    const width = 2000;
    const height = 1300;
    const aspectRatio = width / height;

    console.log("ImageCheck", image.img);

    return (
      <div>
        <div
          style={{
            width: 700,
            height: 500,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Cropper
            ref={cropperRef}
            zoomTo={0.5}
            // preview=".img-preview"
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
        <div>
          <div className="box" style={{ float: "right" }}>
            <h1>
              <button
                className=" flex justify-center border py-2 w-28 lg:px-3 rounded-md  bg-blue-600 -mt-8"
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

  export default ImageCroper;