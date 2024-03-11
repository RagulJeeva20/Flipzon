import MainNavigation from '../Layout/MainNavigation';

function Layout(props){
    return(
        <>
            <MainNavigation/>
            <div>{props.children}</div>
        </>
    )
}
export default Layout;
