import React from "react";
import "./HomePage.css";
import bgMp4 from './../../img/pexels-cottonbro-studio-3296574-4096x2160-50fps.mp4'
import bgWebM from './../../img/pexels-cottonbro-studio-3296574-4096x2160-50fps.mp4'
import {useTranslation} from "react-i18next";

function HomePage() {

    const {t} = useTranslation()

    return (
        <>
            <div className="homepage" style={{marginBottom: "50px"}}>
                <div className="header padding " style={{background: "red", position: "relative"}}>
                    <video id="bg-video" autoPlay loop muted playsInline>
                        <source src={bgWebM} type="video/webm" />
                        <source src={bgMp4} type="video/mp4" />
                    </video>
                    <div className="header__brand " id="tsparticles" style={{position: "absolute", top:0}}>
                        <p className="header__brand__description">
                            {t("columns.aboutInformation")}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
