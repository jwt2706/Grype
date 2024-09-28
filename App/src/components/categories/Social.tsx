interface SocialProps {
    social: string;
}

/*
* handle the category animations within this component
*/

const Social = (props: SocialProps) => {
    return (
        <div className="flex justify-center items-center h-[90vh]">
            {props.social}
        </div>
    );
}

export default Social;