import '../styles/Project.css';
import { motion, useInView } from 'framer-motion';
import HeroImage1 from '../images/MovieReviewBloggerFull.png';
import HeroImage2 from '../images/ConwaysFull.png';
import HeroImage3 from '../images/MainStCafeFull.png';
import { useRef, useContext } from 'react';
import BlockTextEnter from './BlockTextEnter';
import ProjectData from '../Projects.json';
import { ScreenWidthContext } from '../App';

const Project = ({setActiveProject, activeProject}) => {

    const screenWidth = useContext(ScreenWidthContext);

    const textRef = useRef();
    const textIsInView = useInView(textRef, {once: false});

    return ( 
            <motion.div 
            initial={{width: 0, height: 0}}
            animate={{width: "100%", height: window.innerHeight}}
            transition={{duration: 0.7, ease: [0, 0.71, 0.2, 1.01]}}
            exit={{width: 0, height: 0}}
            className="projectContainer" ref={textRef}>
                {screenWidth > 650 && <div className="bg_column_1"></div>}
                <motion.div
                className="projectWrap"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ duration: 0.7, ease: [0, 0.71, 0.2, 1.01], delay: .8 }}>
                    <a href={ProjectData[activeProject -1].target} target="_blank"><div 
                    className="projectHero"
                    style={{backgroundImage: `url(${activeProject == 1 ? HeroImage1 : activeProject == 2 ? HeroImage2 : HeroImage3})`}}
                    /></a>
                    <div className="projectDescription">
                        {ProjectData && ProjectData[activeProject -1]?.text.map((paragraph, id) => {
                            return <BlockTextEnter isInView={textIsInView} delay={1.4}>{paragraph}</BlockTextEnter>
                        })}
                    </div>
                    <motion.div className="close_project" onClick={() => setActiveProject(null)}></motion.div>
                </motion.div>
                {screenWidth > 650 && <div className="bg_column_2"></div>}
            </motion.div>
     );
}
 
export default Project;