interface SocialProps {
    social: string;
}

/*
* handle the category animations within this component
*/

const Social = (props: SocialProps) => {
    return (
        <div className="flex justify-center items-center h-full bg-blue-40">
            {props.social}
        </div>
    );
}

export default Social;