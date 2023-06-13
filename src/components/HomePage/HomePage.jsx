import React, {useEffect, useState} from "react";
import "./HomePage.css";
import bgMp4 from './../../img/pexels-cottonbro-studio-3296574-4096x2160-50fps.mp4'
import bgWebM from './../../img/pexels-cottonbro-studio-3296574-4096x2160-50fps.mp4'
import {useTranslation} from "react-i18next";
import posterImage from "./../../img/eda.jpg"

function HomePage() {

    const {t} = useTranslation()

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1008); // Adjust the breakpoint as needed
        };

        // Initial check
        handleResize();

        // Event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="homepage" style={{marginBottom: "50px"}}>
                <div className="header padding " style={{background: "#1F2122", position: "relative"}}>
                    <video id="bg-video" autoPlay loop muted playsInline poster={posterImage}>
                        <source src={bgWebM} type="video/webm"/>
                        <source src={bgMp4} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                    <div className="header__brand " id="tsparticles" style={{position: "absolute", top: 0}}>
                        {/*<p className="header__brand__description">*/}
                        {/*    {isMobile ? t("columns.aboutInformationMobile") : t("columns.aboutInformation")}*/}
                        {/*</p>*/}
                        {!isMobile && <div
                            style={{
                                position: "absolute",
                                top: 200,
                                left: 50,
                                width: "350px",
                                fontSize: "18px",
                                color: "#fff"
                            }}>
                            {t("columns.aboutInformation1")}
                        </div>}

                        {!isMobile && <div
                            style={{
                                position: "absolute",
                                top: 200,
                                left: 1050,
                                width: "350px",
                                fontSize: "18px",
                                color: "#fff"
                            }}>
                            {t("columns.aboutInformation2")}
                        </div>}


                        {isMobile && <div
                            style={{
                                position: "absolute",
                                top: 10,
                                width: "400px",
                                fontSize: "14px",
                                color: "#fff",
                                left: "10px",
                                right: "10px"
                            }}>
                            {t("columns.aboutInformation11")}
                        </div>}

                        {isMobile && <div
                            style={{
                                position: "absolute",
                                top: 640,
                                width: "400px",
                                fontSize: "14px",
                                color: "#fff",
                                left: "10px"
                            }}>
                            {t("columns.aboutInformation22")}
                        </div>}

                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
