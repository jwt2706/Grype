import { GiWeightLiftingUp } from "react-icons/gi";

interface ExerciseProps {
    exercise: string;
}

const Exercise = (props: ExerciseProps) => {
    return (
        <div className="text-2xl text-center">
            {props.exercise}
            <GiWeightLiftingUp />
        </div>
    );
}

export default Exercise;