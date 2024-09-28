interface ExerciseProps {
    exercise: string;
}

const Exercise = (props: ExerciseProps) => {
    return (
        <div className="text-2xl text-center">
            {props.exercise}
        </div>
    );
}

export default Exercise;