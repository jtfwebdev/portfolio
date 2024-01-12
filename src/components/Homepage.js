import About from "./About";
import Bio from "./Bio";
import Contact from "./Contact";
import Projects from "./Projects";
import SideNav from "./SideNav";

const Homepage = ({homeRef, projectRef, contactRef, bioRef, handleAnimateStairs}) => {
    
    return ( 
        <>
            <SideNav homeRef={homeRef} projectRef={projectRef} contactRef={contactRef} bioRef={bioRef} handleAnimateStairs={handleAnimateStairs} />
            <About homeRef={homeRef} />
            <Bio bioRef={bioRef} />
            <Projects projectRef={projectRef} />
            <Contact contactRef={contactRef} />
        </>
     );
}
 
export default Homepage;