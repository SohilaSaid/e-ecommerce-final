

import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 6,
        slidesToScroll: 3,
        autoplay:true
    };

    let [productList, setProduct] = useState(null)

    function productsAPI() {
        axios.get("https://ecommerce.routemisr.com/api/v1/categories")
            .then((res) => {
                setProduct(res.data.data)
            })
            .catch((err) => {
console.log(err)
            })
    }

    useEffect(() => {
        productsAPI()
    }, [])

    return (
        <div className="slider-container my-10 w-full">
            <Slider {...settings} >
                {productList?.map((cayegory) => {
                    return (
                        <div key={cayegory._id}>
                            <img src={cayegory.image} className="w-full h-48 object-cover" alt=""></img>
                            <h4 className="text-center text-2xl">{cayegory.name}</h4>
                        </div>
                    )

                })}


            </Slider>
        </div>
    );
}




