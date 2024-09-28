interface WaterProps {
    water: string;
}

/*
* handle the category animations within this component
*/

const Water = (props: WaterProps) => {
    return (
        <div className="text-2xl text-center">
            {props.water}
        </div>
    );
}

export default Water;