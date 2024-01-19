import '../styles/SideNav.css';

const SideNav = ({sidebar, homeRef, projectRef, contactRef, bioRef, handleAnimateStairs}) => {

    const handleNavigate = (target) => {
        if (target.current) {
            handleAnimateStairs(target);
        }
    }

    return ( 
        <nav className="nav_container" ref={sidebar}>
            <button onClick={() => handleNavigate(homeRef)}>
                Home
            </button>
            <div>&#9830;</div>
            <button onClick={() => handleNavigate(bioRef)}>
                About
            </button>
            <div>&#9830;</div>
            <button onClick={() => handleNavigate(projectRef)}>
                Projects
            </button>
            <div>&#9830;</div>
            <button onClick={() => handleNavigate(contactRef)}>
                Contact
            </button>
        </nav>
     );
}
 
export default SideNav;