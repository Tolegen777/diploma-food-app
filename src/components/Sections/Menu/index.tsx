import { useEffect, useState } from "react";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";
import foodImg from './../../../img/r3.png'

const foodItems = [
  {
    id: 1,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '15',
    category: '',
  },
  {
    id: 2,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '25',
    category: '',
  },
  {
    id: 3,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '35',
    category: '',
  },
  {
    id: 4,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '45',
    category: '',
  },
  {
    id: 5,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '55',
    category: '',
  },
  {
    id: 6,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '65',
    category: '',
  },
  {
    id: 7,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '75',
    category: '',
  },
  {
    id: 8,
    title: 'Плов',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus blanditiis dolor dicta a, possimus omnis?',
    price: '10000 тг',
    imageURL: foodImg,
    calories: '100g',
    qty: '85',
    category: '',
  },
]

const Menu = ({title}:{title?:string}) => {

  const [scrollValue, setScrollValue] = useState(0);
  // const [{ foodItems }, dispatch] = useStateValue();
  const [filter, setFilter] = useState<string>("all");
    
  return (
    <section className="w-full my-5" id="menu">
      <div className="w-full flex items-center justify-center">
        <Title title={title || "Наши горячие блюда"} center />
      </div>
      <Filters filter={filter} setFilter = {setFilter} />
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={filter === "all" ? foodItems : FilterFood(filter)}
      />
    </section>
  );
};

export default Menu;
