import { useEffect, useState } from 'react';
import '../styles/Projects.css';
import Project from './Project';
import { motion, useAnimate, useInView, AnimatePresence } from 'framer-motion';
import MovieReviewBlogger from '../images/MovieReviewBlogger.jpg';
import MainStCafe from '../images/MainStCafe.png';
import Conways from '../images/Conways.png';

const Projects = ({projectRef}) => {

    const title = [
        "P", "R", "O", "J", "E", "C", "T", "S"
    ]

    const [header, animateHeader] = useAnimate();
    const isInView = useInView(header, {amount: 0.3, once: true});

    const [project1, animateProject1] = useAnimate();
    const [project2, animateProject2] = useAnimate();
    const [project3, animateProject3] = useAnimate();

    const enterTitle = async () => {
        await animateHeader(header.current, { opacity: 0.3, x: 0 }, { duration: 1, ease: [0, 0.71, 0.2, 1.01], delay: .5 });
        animateHeader(header.current, { fontSize: "5rem", y: 30 }, { duration: .4 });
        await animateProject1(project1.current, {opacity: 1, x: 0}, {duration: .5});
        await animateProject2(project2.current, { opacity: 1, x: 0 }, { duration: .5 });
        await animateProject3(project3.current, { opacity: 1, x: 0 }, { duration: .5 });
    }

    useEffect(() => {
        if (isInView) { 
           enterTitle(); 
        }
        else { animateHeader(header.current, { opacity: 0, x: -200 }, { duration: 1 }) }
    }, [isInView]);

    const [activeProject, setActiveProject] = useState(null);

    //whileHover variants for project cards

    const projectParent = {
        hover: {

        }
    }

    const projectImg = {
        hover: {
            filter: "brightness(30%)"
        }
    }

    const projectHeader = {
        hover: {
            fontSize: "5rem"
        }
    }

    return ( 
        <section className="projects" ref={projectRef}>
            <motion.h2 ref={header} initial={{fontSize: "15rem"}}
            >{title.map((char) => {return <span>{char}</span>})}</motion.h2>
            <div className="projectsContainer">
                <motion.div ref={project1} variants={projectParent}
                    initial={{ opacity: 0, x: -200, width: "25%", height: "65vh", margin: "0 1vw" }}
                    className="project_individ project_1"
                    onClick={() => setActiveProject(1)}
                    whileHover="hover">
                        <motion.div variants={projectImg}
                        style={{ background: `url(${MovieReviewBlogger})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px"}}
                        />
                        <motion.h2 variants={projectHeader}
                        style={{fontSize: "2rem", color: "white"}}
                        transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: activeProject ? 1 : 0 }}
                        >Movie<br/>Review<br/>Blogger</motion.h2>
                </motion.div>
                <motion.div ref={project2} variants={projectParent}
                    initial={{ opacity: 0, x: -200, width: "25%", height: "65vh", margin: "0 1vw" }}
                    whileHover="hover"
                    className="project_individ project_2"
                    onClick={() => setActiveProject(2)}>
                        <motion.div variants={projectImg}
                        style={{ backgroundImage: `url(${Conways})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px" }}
                        />
                        <motion.h2 variants={projectHeader}
                        style={{ fontSize: "2rem", color: "white" }}
                        transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: activeProject ? 1 : 0 }}
                        >Conway's<br/>Game<br/>of<br/>Life</motion.h2>
                </motion.div>
                <motion.div ref={project3} variants={projectParent}
                    initial={{ opacity: 0, x: -200, width: "25%", height: "65vh", margin: "0 1vw" }}
                    whileHover="hover"
                    className="project_individ project_3"
                    onClick={() => setActiveProject(3)}>
                        <motion.div variants={projectImg}
                        style={{ backgroundImage: `url(${MainStCafe})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px" }}
                        />
                        <motion.h2 variants={projectHeader}
                        style={{ fontSize: "2rem", color: "white" }}
                        transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: activeProject ? 1 : 0 }}
                        >Main<br/>St.<br/>Cafe</motion.h2>
                </motion.div>
            </div>
            <AnimatePresence>
                {activeProject ? <Project setActiveProject={setActiveProject} activeProject={activeProject} /> : null }
            </AnimatePresence>
        </section>
     );
}
 
export default Projects;