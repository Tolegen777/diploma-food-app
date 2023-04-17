// FIXME first done
import { useState } from "react";

import Container from "../../Container";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";

const Menu = ({title}:{title?:string}) => {

  const [scrollValue, setScrollValue] = useState(0);
  const [{ foodItems }, dispatch] = useStateValue();
  const [filter, setFilter] = useState<string>("all");
  console.log(filter)
  console.log(foodItems, 'ffoods')
  return (
    <section className="w-full my-5" id="menu">
      <div className="w-full flex items-center justify-center">
        <Title title={title || "Наши блюда"} center />
      </div>
      <Filters filter={filter} setFilter = {setFilter} />
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={foodItems ?? []}
      />
    </section>
  );
};

export default Menu;
