import React from "react";
export type FoodCategory = {
  id: number;
  title: string;
  icon: string;
};

interface Props {
  categories: FoodCategory[];
  action: any;
  selected: string;
}
const CategoriesSelector: React.FC<Props> = ({
  categories,
  action,
  selected,
}) => {
  return (
    <select name="categories" id="categories" className="bg-transparent outline-none w-full capitalize text-base border-2 border-gray-200 p-2 rounded-md cursor-pointer text-gray-400"
            onChange={(e) => action(e.target.value)}>
      <option defaultValue={selected? selected: "Select category"}  className="bg-white capitalize ">
        {selected? selected: "Выберите категорию"}
      </option>
      {categories
        // .filter((cat) => cat.urlParam !== selected)
        .map((category, index) => (
          <option key={index} value={category.id} className = "text-base border-0 outline-none uppercase bg-white text-headingColor">
            {category.title}
          </option>
        ))}
    </select>
  );
};

export default CategoriesSelector;
