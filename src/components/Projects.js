import { useEffect, useState, useContext } from 'react';
import '../styles/Projects.css';
import Project from './Project';
import { motion, useAnimate, useInView, AnimatePresence, useMotionValue } from 'framer-motion';
import MovieReviewBlogger from '../images/MovieReviewBlogger.jpg';
import MainStCafe from '../images/MainStCafe.png';
import Conways from '../images/Conways.png';
import { ScreenWidthContext } from '../App';

const Projects = ({projectRef}) => {

    const screenWidth = useContext(ScreenWidthContext);

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
        animateHeader(header.current, { fontSize: screenWidth < 580 ? "4rem" : "5rem", y: screenWidth > 750 ? 30 : 5 }, { duration: .4 });
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

    //Carousel functionality

    const numOfProjects = 3;

    const DRAG_BUFFER = 50;

    const SPRING_TRANSITION = { type: "spring", mass: 3, stiffness: 400, damping: 50 };

    const [dragging, setDragging] = useState(false);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const dragX = useMotionValue(0);

    const onDragStart = () => {
        setDragging(true);
    }

    const onDragEnd = () => {
        setDragging(false);

        const x = dragX.get();

        if (x <= -DRAG_BUFFER && carouselIndex < numOfProjects -1) {
            setCarouselIndex(pv => pv + 1)
        } else if (x >= DRAG_BUFFER && carouselIndex > 0) {
            setCarouselIndex(pv => pv - 1)
        }
    }

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
            <motion.h2 ref={header} 
            initial={{
                fontSize: `${screenWidth > 1200 ? "15rem" 
                : screenWidth > 1049 ? "12rem" 
                : screenWidth > 950 ? "10rem"
                : screenWidth > 750 ? "8rem"
                : screenWidth > 580 ? "6rem" : "5rem"
            }`}}
            >{title.map((char) => {return <span>{char}</span>})}</motion.h2>
            <motion.div 
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0
                }}
                style={{
                    x: dragX
                }}
                animate={{
                    translateX: `-${screenWidth < 1050 && carouselIndex * (screenWidth * (screenWidth > 675 ? 0.46 : screenWidth > 580 ? 0.55 : screenWidth > 500 ? 0.63 : 0.76))}px`
                }}
                transition={SPRING_TRANSITION}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className="projectsContainer"
                >
                <motion.div ref={project1} variants={projectParent}
                    initial={{ opacity: 0, x: -200 }}
                    className="project_individ project_1"
                    onClick={() => !dragging && setActiveProject(1)}
                    whileHover="hover">
                        <motion.div variants={projectImg}
                        style={{ background: `url(${MovieReviewBlogger})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px"}}
                        />
                        <motion.h2 variants={projectHeader}
                        style={{fontSize: "2rem", color: "white"}}
                        transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: activeProject ? 1 : 0 }}
                        //transition={SPRING_TRANSITION}
                        >Movie<br/>Review<br/>Blogger</motion.h2>
                </motion.div>
                <motion.div ref={project2} variants={projectParent}
                    initial={{ opacity: 0, x: -200 }}
                    whileHover="hover"
                    className="project_individ project_2"
                    onClick={() => !dragging && setActiveProject(2)}>
                        <motion.div variants={projectImg}
                        style={{ backgroundImage: `url(${Conways})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px" }}
                        />
                        <motion.h2 variants={projectHeader}
                        style={{ fontSize: "2rem", color: "white" }}
                        transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: activeProject ? 1 : 0 }}
                        >Conway's<br/>Game<br/>of<br/>Life</motion.h2>
                </motion.div>
                <motion.div ref={project3} variants={projectParent}
                    initial={{ opacity: 0, x: -200 }}
                    whileHover="hover"
                    className="project_individ project_3"
                    onClick={() => !dragging && setActiveProject(3)}>
                        <motion.div variants={projectImg}
                        style={{ backgroundImage: `url(${MainStCafe})`, backgroundSize: "cover", backgroundPosition: "center center", height: "100%", width: "100%", borderRadius: "5px" }}
                        />
                        <motion.h2 variants={projectHeader}
                        style={{ fontSize: "2rem", color: "white" }}
                        transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: activeProject ? 1 : 0 }}
                        >Main<br/>St.<br/>Cafe</motion.h2>
                </motion.div>
            </motion.div>
            {screenWidth < 1050 && <motion.div className="carousel_dots_container">
                {[...new Array(numOfProjects)].map((_, idx) => {
                    return <button 
                    className="carousel_dot"
                    onClick={() => setCarouselIndex(idx)}
                    style={{backgroundColor: `${carouselIndex === idx ? "white" : "gray"}`}}
                    />
                })}
            </motion.div>}
            <AnimatePresence>
                {activeProject ? <Project setActiveProject={setActiveProject} activeProject={activeProject} /> : null }
            </AnimatePresence>
        </section>
     );
}
 
export default Projects;