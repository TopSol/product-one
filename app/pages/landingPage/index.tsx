import React from "react";
import Navbar from "@/app/component/Navbar";
import Herro from "@/app/component/Herro";
export default function landingPage() {
  return (
    <div>
      {/* <Navbar /> */}
      <Herro />
      <div className="md:container mx-auto">
        <div className="mt-9">
          <p className="text-5xl">The best places to stay</p>
          <p className="font-bold text-gray-300 mt-4 ">Plenty of services to assure your relaxation and comfortability.</p>
          <div className="flex flex-col lg:flex-row mt-3  ">
            <div>
              <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/pexels-pixabay-262047-1.jpg" alt="" />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex items-center border-gray-200 border-2 ml-5 rounded-md hover:bg-gray-800 hover:text-white ">
                <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/pool.png" alt="" className="m-3 mx-4" />
                <div>
                  <h1>Swimming Pool</h1>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                  </p>
                </div>
              </div>
              <div className="flex items-center border-gray-200 border-2 ml-5 rounded-md hover:bg-gray-800 hover:text-white ">
                <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/restaurant.png" alt="" className="m-3 mx-4" />
                <div>
                  <h1>Swimming Pool</h1>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                  </p>
                </div>
              </div>
              <div className="flex items-center border-gray-200 border-2 ml-5 rounded-md hover:bg-gray-800 hover:text-white ">
                <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/teamwork.png" alt="" className="m-3 mx-4" />
                <div>
                  <h1>Swimming Pool</h1>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                  </p>
                </div>
              </div>
              <div className="flex items-center border-gray-200 border-2 ml-5 rounded-md hover:bg-gray-800 hover:text-white ">
                <img src="https://demo.himaratheme.com/wp-content/uploads/2022/07/sauna.png" alt="" className="m-3 mx-4" />
                <div>
                  <h1>Swimming Pool</h1>
                  <p className="text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin elementum porta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
