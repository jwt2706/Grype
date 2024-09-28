import React from "react";

interface WidgetProps {
    children: React.ReactNode;
}

const Widget = (props: WidgetProps) => {
    return (
        <>
            <div className="border-2 border-solid border-gray-400 rounded-md p-8 m-8 w-full">
                {props.children}
            </div>
        </>
    );
}

export default Widget;