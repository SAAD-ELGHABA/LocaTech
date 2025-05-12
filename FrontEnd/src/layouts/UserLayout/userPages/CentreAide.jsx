import React from "react";
import Aside from "../usercompoenents/aside";
import ContactUs from "../../../pages/ContactUs";

function CentreAide() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="lg:flex mt-10 bg-white rounded-lg overflow-hidden">
        <Aside />
        <div className="w-full lg:w-[80%] p-6 mt-16">
            <ContactUs centreAide={true}/>
        </div>
      </div>
    </div>
  );
}

export default CentreAide;
