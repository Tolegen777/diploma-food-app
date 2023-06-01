import {MdChevronLeft, MdChevronRight} from 'react-icons/md';

import {motion} from 'framer-motion';

export const Title = ({title, center}: { title: string, center?: boolean }) => {
    return (
        <p className={`text-2xl text-headingColor font-semi-bold relative before:absolute before:rounded before:content before:w-36 before:h-1 before:-bottom-2 ${center ? "before:left-0" : "before:left-0"} before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100`}
           style={{color: '#fff'}}
        >
            {title}
        </p>
    );
};

export const PrevNext = ({
                             onPrev,
                             onNext,
                         }: {
    onPrev: () => void;
    onNext: () => void;
}) => {
    return (
        <div className="hidden md:flex items-center gap-3">
            <motion.div whileTap={{scale: 1.1}} onClick={onPrev}
                        className="w-8 h-8 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-100 ease-in-out hover:shadow-lg">
                <MdChevronLeft className="text-lg text-white"/>
            </motion.div>
            <motion.div whileTap={{scale: 1.1}} onClick={onNext}
                        className="w-8 h-8 rounded-lg bg-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-all duration-100 ease-in-out hover:shadow-lg">
                <MdChevronRight className="text-lg text-white"/>
            </motion.div>
        </div>
    );
};

