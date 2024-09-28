import React from "react";

interface ContainerProps {
    children: React.ReactNode;
}

const Container = (props: ContainerProps) => {
    return (
        <>
            <div className="border-2 border-solid border-gray-400 bg-black rounded-md p-4 w-full h-[99vh] text-black">
                {props.children}
            </div>
        </>
    );
}

export default Container;
