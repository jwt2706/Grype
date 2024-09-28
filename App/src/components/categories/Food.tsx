import { GiChickenLeg } from "react-icons/gi";

interface FoodProps {
    food: string;
}

const Food = (props: FoodProps) => {
    return (
        <div className="text-2xl text-center">
            {props.food}
            <GiChickenLeg />
        </div>
    );
}

export default Food;