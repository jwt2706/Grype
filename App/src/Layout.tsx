import { useEffect } from "react";
import { calculateAspectRatio } from "./utils/calculateAspectRatio";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    function resizeLayout() {
        const ratio = calculateAspectRatio();
        const root: HTMLElement = document.querySelector("#root")!;
        root.style.setProperty("--container-width", `${ratio.width}px`);
        root.style.setProperty("--container-height", `${ratio.height}px`);
        root.style.setProperty("--container-padding", `${ratio.padding}px`);
    }

    useEffect(() => {
        resizeLayout();
        window.addEventListener("resize", resizeLayout);
    }, [])


    return (
        <span id="main-app" className="overflow-hidden bg-black">
            {props.children}
        </span>
    );
}

export default Layout;
