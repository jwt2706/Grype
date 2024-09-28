import React from "react";

interface WidgetProps {
    children: React.ReactNode;
}

const Widget = (props: WidgetProps) => {
    return (
        <>
            <div className="border-2 border-solid border-gray-400 rounded-md p-8 mb-5 w-full text-black h-[95vh]">
                {props.children}
            </div>
        </>
    );
}

export default Widget;
