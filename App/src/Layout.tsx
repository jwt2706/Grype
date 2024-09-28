interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <>
            {props.children}
        </>
    );
}

export default Layout;