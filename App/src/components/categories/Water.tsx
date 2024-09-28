interface WaterProps {
    water: string;
}

/*
* handle the category animations within this component
*/

const Water = (props: WaterProps) => {
    return (
        <div className="flex justify-center items-center h-full bg-blue-400">
            {props.water}
        </div>
    );
}

export default Water;