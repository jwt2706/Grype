import { LuGlassWater } from "react-icons/lu";

interface WaterProps {
    water: string;
}

/*
* handle the category animations within this component
*/

const Water = (props: WaterProps) => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            {props.water}
            <LuGlassWater />
        </div>
    );
}

export default Water;