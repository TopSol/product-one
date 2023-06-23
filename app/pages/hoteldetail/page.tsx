import React from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
function HotelDetail() {
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5 flex justify-between items-center">
          <div>
            <h1 className="font-vollkorn text-4xl text-gray-600">Hotel Detail</h1>
            <p className="mt-2 text-xs font-roboto">Home / Hotel</p>
          </div>
          <div>
            <h1 className="font-vollkorn text-4xl text-gray-600">350$</h1>
          </div>
        </div>
      </div>
      <div className="md:container mx-auto flex flex-col lg:flex-row mt-24 ">
        <div className="lg:w-[70%]">
          <img src="https://demo.himaratheme.com/wp-content/uploads/2022/05/pexels-engin-akyurt-1579253-1170x680.jpg" alt="" />
          <p className="mt-20 font-roboto text-textColor text-justify ">
            Aliquam erat volutpat. Morbi semper tempus quam. Aenean quis porta velit. Aliquam dictum neque lobortis ipsum
            hendrerit facilisis. Curabitur vel sapien convallis, convallis metus id, facilisis metus. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Morbi aliquet a lacus ut maximus. Pellentesque a vestibulum
            risus. Proin non placerat metus, sed molestie nisi. Nulla ornare diam ornare odio varius, sit amet placerat enim
            Aliquam erat volutpat. Morbi semper tempus quam. Aenean quis porta velit. Aliquam dictum neque lobortis ipsum
            hendrerit facilisis. Curabitur vel sapien convallis, convallis metus id, facilisis metus. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Morbi aliquet a lacus ut maximus. Pellentesque a vestibulum
            risus. Proin non placerat metus, sed molestie nisi. Nulla ornare diam ornare odio varius, sit amet placerat enim
            facilisis. Phasellus vel purus quis lorem volutpat lacinia eu a eros, maecenas at erat purus.Etiam vel lectus eu lorem
            mattis sollicitudin quis at lectus. Donec dignissim nisi sed vestibulum ornare, interdum et malesuada fames ac ante
            ipsum primis in faucibus. Ut viverra arcu a metus interdum, at laoreet elit accumsan.
          </p>
          <p className="font-roboto mt-8 text-textColor text-justify ">
            Nulla elementum enim quis nisi elementum, a placerat eros accumsan. Mauris aliquet tincidunt erat, at dignissim neque
            bibendum vel. Donec scelerisque odio at malesuada venenatis. Etiam vel lectus eu lorem mattis sollicitudin quis at
            lectus. Donec dignissim nisi sed vestibulum ornare. Maecenas volutpat, erat vitae ultricies consequat, augue nisi
            Aliquam erat volutpat. Morbi semper tempus quam. Aenean quis porta velit. Aliquam dictum neque lobortis ipsum
            hendrerit facilisis. Curabitur vel sapien convallis, convallis metus id, facilisis metus. Vestibulum ante ipsum primis
            in faucibus orci luctus et ultrices posuere cubilia curae; Morbi aliquet a lacus ut maximus. Pellentesque a vestibulum
            risus. Proin non placerat metus, sed molestie nisi. Nulla ornare diam ornare odio varius, sit amet placerat enim
            varius nulla, facilisis tincidunt ligula tellus vitae tortor. Aenean felis orci, venenatis vel lectus sit amet,
            maximus elementum magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut viverra arcu a metus
            interdum, at laoreet elit accumsan.
          </p>

          <div className="container my-24 mx-auto md:px-6">
            <section className="mb-32 text-center lg:text-left">
              <div className="py-12 md:px-6 md:px-12">
                <div className="container mx-auto xl:px-32">
                  <div className="flex grid items-center lg:grid-cols-2">
                    <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                      <div className="relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.7)] dark:shadow-black/20 md:px-12 lg:-mr-14">
                        <h2 className="mb-2 text-3xl font-bold text-primary dark:text-primary-400">Anna Doe</h2>
                        <p className="mb-4 font-semibold">Graphic designer</p>
                        <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                          Nunc tincidunt vulputate elit. Mauris varius purus malesuada neque iaculis malesuada. Aenean gravida
                          magna orci, non efficitur est porta id. Donec magna diam.
                        </p>
                        <p className="mb-6 text-neutral-500 dark:text-neutral-300">
                          Ad, at blanditiis quaerat laborum officia incidunt cupiditate dignissimos voluptates eius aliquid minus
                          voluptatibus atque vero repellat sit eligendi autem maiores quasi cum aperiam. Aperiam rerum culpa
                          accusantium, ducimus deserunt aliquid alias vitae quasi corporis placeat vel maiores explicabo commodi!
                        </p>
                        <ul className="flex justify-center lg:justify-start">
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 96 960 960"
                              className="w-5 text-primary dark:text-primary-400"
                            >
                              <path
                                fill="currentColor"
                                d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                              />
                            </svg>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 96 960 960"
                              className="w-5 text-primary dark:text-primary-400"
                            >
                              <path
                                fill="currentColor"
                                d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                              />
                            </svg>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 96 960 960"
                              className="w-5 text-primary dark:text-primary-400"
                            >
                              <path
                                fill="currentColor"
                                d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                              />
                            </svg>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 96 960 960"
                              className="w-5 text-primary dark:text-primary-400"
                            >
                              <path
                                fill="currentColor"
                                d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                              />
                            </svg>
                          </li>
                          <li>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 96 960 960"
                              className="w-5 text-primary dark:text-primary-400"
                            >
                              <path
                                fill="currentColor"
                                d="m233 976 65-281L80 506l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"
                              />
                            </svg>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="md:mb-12 lg:mb-0">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/new/ecommerce/vertical/080.jpg"
                        className="lg:rotate-[6deg] w-full rounded-lg shadow-lg dark:shadow-black/20"
                        alt="image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="lg:w-[30%] ml-5">
          <div className="border-gray-200 p-6 border-[1px]  ">
            <p className="font-vollkorn text-xl">Booking Hotel</p>
            <div className="mt-8">
              <label htmlFor="" className=" ">
                ChexkIn/out
              </label>
              <input
                type="text"
                placeholder="Check In "
                className="border-gray-200 py-3 px-2 mt-2 rounded-md  w-full border-[1px]"
              />
            </div>
            <div className="mt-8">
              <label htmlFor="">Services</label>
              <input type="text" placeholder=" Services " className="border-gray-200 py-3 px-2  w-full rounded-md border-[1px]" />
            </div>
            <button className="px-4  py-3 bg-primaryColor text-white mt-10 rounded-md w-full ">Check Availability</button>
          </div>

          <img src="https://demo.himaratheme.com/wp-content/uploads/2022/10/widget_banner-1.jpg" alt="" className="w-full mt-8" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HotelDetail;
