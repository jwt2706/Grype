interface FoodProps {
    food: string;
}

const Food = (props: FoodProps) => {
    return (
        <div className="text-2xl text-center">
            {props.food}
        </div>
    );
}

export default Food;