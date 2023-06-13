import {FruitsSection, MenuSection, ShowcaseBanner,} from "../../components"
import HomePage from "../../components/HomePage/HomePage";
import VideoIframe from "../../components/YoutubeIframe/YoutubeIframe";
import {useEffect, useState} from "react";
import {useStateValue} from "../../context/StateProvider";
import {Roles} from "../../const/roles";

const Home = () => {

    const [isMobile, setIsMobile] = useState(false);

    const [{role}] = useStateValue();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
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
        <div className='flex w-full h-auto flex-col items-center justify-center'>
            <ShowcaseBanner />
            <HomePage/>
            <VideoIframe videoId={'v5cT1gpfSTg'} title={"Saffy"}/>
            {(isMobile || role === Roles.restaurant) && <FruitsSection/>}
            {(isMobile || role === Roles.restaurant) && <MenuSection/>}
        </div>

    )
}

export default Home