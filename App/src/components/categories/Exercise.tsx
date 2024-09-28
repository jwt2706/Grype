import { GiWeightLiftingUp } from "react-icons/gi";

interface ExerciseProps {
    exercise: string;
}

/*
* handle the category animations within this component
*/


const Exercise = (props: ExerciseProps) => {
    return (
        <div className="flex justify-center items-center h-full bg-purple-400">
            {props.exercise}
            <GiWeightLiftingUp />
        </div>
    );
}

export default Exercise;