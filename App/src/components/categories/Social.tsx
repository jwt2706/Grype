import { IoPeople } from "react-icons/io5";

interface SocialProps {
    social: string;
}

/*
* handle the category animations within this component
*/

const Social = (props: SocialProps) => {
    return (
        <div className="text-2xl text-center">
            {props.social}
            <IoPeople />
        </div>
    );
}

export default Social;