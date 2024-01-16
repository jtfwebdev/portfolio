import About from "./About";
import Bio from "./Bio";
import Contact from "./Contact";
import Projects from "./Projects";
import SideNav from "./SideNav";
import MobileNav from "./MobileNav";
import { useContext } from "react";
import { ScreenWidthContext } from '../App';

const Homepage = ({homeRef, projectRef, contactRef, bioRef, handleAnimateStairs}) => {

    const screenWidth = useContext(ScreenWidthContext);
    
    return ( 
        <>
            {screenWidth > 1049 && <SideNav homeRef={homeRef} projectRef={projectRef} contactRef={contactRef} bioRef={bioRef} handleAnimateStairs={handleAnimateStairs} />}
            {screenWidth < 1050 && <MobileNav />}
            <About homeRef={homeRef} />
            <Bio bioRef={bioRef} />
            <Projects projectRef={projectRef} />
            <Contact contactRef={contactRef} />
        </>
     );
}
 
export default Homepage;