interface AffirmationProps {
    affirmation: string;
}

const Affirmation = (props: AffirmationProps) => {
    return (
        <div className="text-2xl text-center">
            {props.affirmation}
        </div>
    );
}

export default Affirmation;