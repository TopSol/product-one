import React from "react";
import Herro from "@/app/component/Herro";
import GalleryCard from "../../component/galleryItem/galleryCard";
import { Data } from "./Data";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "@/app/component/footer";
export default function landingPage() {
  const currentPost = Data.slice(0, 8);
  return (
    <div>
      {/* <Navbar /> */}
      <Herro />
      <div className="bg-bgColor pb-24 pt-24">
        <div className="md:container mx-auto ">
          <div className="">
            <p className="text-5xl font-vollkorn text-headingColor ">The best places to stay</p>
            <p className="font-bold text-textColor mt-2 font-roboto   ">
              Plenty of services to assure your relaxation and comfortability.
            </p>
            <div className="flex flex-col lg:flex-row mt-8  ">
              <div>
                <img
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/07/pexels-pixabay-262047-1.jpg"
                  alt=""
                  className="rounded-md"
                />
              </div>
              <div className="flex flex-col justify-between lg:ml-5">
                <div className="flex items-center border-gray-200 border-[1px] mt-6 lg:mt-0  rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor">
                  <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/pool.png" alt="" className="w-[50px] mx-5" />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Swimming Pool</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
                <div className="flex items-center border-gray-200 border-[1px] mt-6 lg:mt-0  rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor">
                  <img
                    src="https://demo.himaratheme.com/wp-content/uploads/2022/07/restaurant.png"
                    alt=""
                    className="w-[50px] mx-5"
                  />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Restaurant</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
                <div className="flex items-center border-gray-200 border-[1px]  mt-6 lg:mt-0 rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor">
                  <img
                    src="https://demo.himaratheme.com/wp-content/uploads/2022/07/teamwork.png"
                    alt=""
                    className="w-[50px] mx-5"
                  />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Meeting Room</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
                <div className="flex items-center border-gray-200 border-[1px]  mt-6 lg:mt-0 rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor">
                  <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/sauna.png" alt="" className="w-[50px] mx-5" />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Sauna</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery section */}
      <div className="bg-white  pb-24">
        <div className=" md:container mx-auto pt-24  ">
          <p className="text-5xl font-vollkorn text-headingColor ">Himara Image Gallery</p>
          <div className=" md:flex items-center justify-between">
            <p className="font-bold text-textColor mt-2 font-roboto   ">
              Capture the experience of your vacation at Himara Hotel.
            </p>
            <p className="font-bold text-textColor mt-2 font-roboto cursor-pointer ">View Full Gallery</p>
          </div>

          <div className=" grid grid-cols-1 mt-8  md:grid-cols-2 gap-8 lg:grid-cols-4 lg: lg:container lg:mx-auto ">
            {currentPost.map((item) => (
              <div key={item.id}>
                <GalleryCard src={item.src} name={item.name} desc={item.desc} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonials section */}
      <div className="bg-bgColor  ">
        <div className=" md:container mx-auto pt-24 pb-32 ">
          <p className="text-5xl font-vollkorn text-headingColor ">Himara Image Gallery</p>
          <div className="md:flex items-center justify-between">
            <p className="font-bold text-textColor mt-2 font-roboto   ">
              Capture the experience of your vacation at Himara Hotel.
            </p>
            <p className="font-bold text-textColor mt-2 font-roboto cursor-pointer ">View Full Gallery</p>
          </div>

          <div className="flex flex-col lg:flex-row  justify-around  ">
            <div className=" w-auto mx-5  lg:w-[30rem] text-center mt-28 bg-white rounded-lg first-letter:  ">
              <div className="flex justify-center">
                <img
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/05/user7.jpg"
                  className="w-[70px] rounded-full -mt-8"
                  alt=""
                />
              </div>
              <h1 className="mt-6 font-vollkorn  ">John Doe</h1>
              <p className="mt-1 font-vollkorn ">Web Developer</p>
              <div className="my-5">
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
              </div>
              <p className="text-center px-9 pb-9 text-textColor font-roboto">
                Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim
                elementum. Donec a ullamcorper diam.
              </p>
            </div>
            <div className="w-auto mx-5 lg:w-[30rem] text-center mt-28 bg-white rounded-lg first-letter:  ">
              <div className="flex justify-center">
                <img
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/05/user2.jpg"
                  className="w-[70px] rounded-full -mt-8"
                  alt=""
                />
              </div>
              <h1 className="mt-6 font-vollkorn  ">John Doe</h1>
              <p className="mt-1 font-vollkorn ">Web Developer</p>
              <div className="my-5">
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
              </div>
              <p className="text-center px-9 pb-9 text-textColor font-roboto">
                Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim
                elementum. Donec a ullamcorper diam.
              </p>
            </div>
            <div className="w-auto mx-5 lg:w-[30rem] text-center mt-28 bg-white rounded-lg first-letter:  ">
              <div className="flex justify-center">
                <img
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/05/user9.jpg"
                  className="w-[70px] rounded-full -mt-8"
                  alt=""
                />
              </div>
              <h1 className="mt-6 font-vollkorn  ">John Doe</h1>
              <p className="mt-1 font-vollkorn ">Web Developer</p>
              <div className="my-5">
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
                <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
              </div>
              <p className="text-center px-9 pb-9 text-textColor font-roboto">
                Ut pretium ultricies dignissim. Sed sit amet mi eget urna placerat vulputate. Ut vulputate est non quam dignissim
                elementum. Donec a ullamcorper diam.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}
