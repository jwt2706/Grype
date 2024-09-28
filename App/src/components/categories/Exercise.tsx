interface ExerciseProps {
    exercise: string;
}

/*
* handle the category animations within this component
*/


const Exercise = (props: ExerciseProps) => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            {props.exercise}
        </div>
    );
}

export default Exercise;