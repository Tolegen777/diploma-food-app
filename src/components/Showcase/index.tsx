import React, {useEffect, useState} from 'react'
import Left from './left'
import Right from './right'
import ImgComponent from "../ImgComponent/ImgComponent";
import {useStateValue} from "../../context/StateProvider";


const ShowcaseBanner = () => {

    const [isMobile, setIsMobile] = useState(false);

    const [{role}] = useStateValue();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900); // Adjust the breakpoint as needed
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
        <div style={!isMobile ? {paddingLeft: "40px"} : {paddingLeft: 0}}>
            <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id='home'>
                <Left/>
                {/*<Right/>*/}
                <ImgComponent/>
            </section>
        </div>

    )
}

export default ShowcaseBanner