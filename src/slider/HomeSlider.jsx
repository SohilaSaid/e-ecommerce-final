

HomeSlider



import React from "react";
import Slider from "react-slick";
import img1 from "../assets/images/41nN4nvKaAL._AC_SY200_.jpg"
import img2 from "../assets/images/61cSNgtEISL._AC_SY200_.jpg"
import img3 from "../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg"
import img4 from "../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg"

export default function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
    };
    return (
        <div className="flex my-10 mx-auto">
            <div className="w-3/12 ms-auto">
                <div className="slider-container">
                    <Slider {...settings} autoplay >
                        <div>
                            <img src={img1} alt="photo" className="w-full h-96  object-cover"></img>
                        </div>
                        <div>
                            <img src={img2} alt="photo" className="w-full h-96 object-cover"></img>
                        </div>
                    </Slider>
                </div>
            </div>
            <div className="w-3/12 me-auto">
            <div>
                <img src={img3} className=" w-full h-48 object-cover" alt="photo"></img>
                <img src={img4} className="w-full h-48 object-cover" alt="photo"></img>
            </div>
            </div>
        </div>
    );
}



