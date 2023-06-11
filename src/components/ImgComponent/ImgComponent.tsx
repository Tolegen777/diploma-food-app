import React from 'react';

import foodMainImg from "./../../img/food-13619.png"
import "./index.css"

const ImgComponent = () => {
    return (
        <div>
            <div className="container-xxl py-5 bg-dark hero-header mb-5">
                <div className="container my-5 py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                            <img className="img-fluid" src={foodMainImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImgComponent;