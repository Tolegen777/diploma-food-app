import { GiFruitTree, GiChickenOven, GiBeerBottle, GiBowlOfRice } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import {FaFish} from "react-icons/fa";

export const Categories = [
    {
        id: 1,
        name: "Курица",
        urlParam: 'chicken',
        icon: <GiChickenOven />,
    },
    {
        id: 2,
        name: "Фрукты",
        urlParam: 'fruits',
        icon: <GiFruitTree />,
    },
    {
        id: 3,
        name: "Напитки",
        urlParam: 'drinks',
        icon: <GiBeerBottle />,
    },
    {
        id: 4,
        name: "Десерты",
        urlParam: 'desserts',

    },
    {
        id: 5,
        name: "Мороженное",
        urlParam: 'icecreams',
        icon: <MdOutlineIcecream />,
    },
    {
        id: 6,
        name: "Рыба",
        urlParam: 'fish',
        icon: <FaFish />,
    },
    {
        id: 7,
        name: "Рис",
        urlParam: 'rice',
        icon: <GiBowlOfRice />,
    },
    {
        id: 8,
        name: "Карри",
        urlParam: 'curry',

    }
]