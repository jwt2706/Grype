interface AffirmationProps {
    affirmation: string;
}

/*
* handle the category animations within this component
* use GASP
*/

const Affirmation = (props: AffirmationProps) => {
    return (
        <div className="text-2xl text-center">
            {props.affirmation}
        </div>
    );
}

export default Affirmation;