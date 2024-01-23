import { useEffect, useState, useContext } from 'react';
import '../styles/Projects.css';
import Project from './Project';
import { motion, useAnimate, useInView, AnimatePresence, useMotionValue } from 'framer-motion';
import MovieReviewBlogger from '../images/MovieReviewBlogger.jpg';
import MainStCafe from '../images/MainStCafe.png';
import Conways from '../images/Conways.png';
import { ScreenWidthContext } from '../App';
import FullScreenProjectSlide from './FullScreenProjectSlide';
import MobileProjectSlide from './MobileProjectSlide';

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

    const projects = [
        {
            id: 1,
            ref: project1,
            image: MovieReviewBlogger,
            title: ["Movie", "Review", "Blogger"]
        },
        {
            id: 2,
            ref: project2,
            image: Conways,
            title: ["Conway's", "Game", "of", "Life"]
        },
        {
            id: 3,
            ref: project3,
            image: MainStCafe,
            title: ["Main", "St.", "Cafe"]
        }
    ]

    const projectParams = {
        dragging, 
        setActiveProject, 
        activeProject
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
            >{title.map((char, idx) => {return <span key={idx}>{char}</span>})}</motion.h2>
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
                {screenWidth > 768 && projects.map((project, idx) => {
                    return <FullScreenProjectSlide key={idx} project={project.ref} heroImg={project.image} id={project.id} title={project.title} params={projectParams} />
                })}
                {screenWidth <= 768 && projects.map((project, idx) => {
                    return <MobileProjectSlide key={idx} project={project.ref} heroImg={project.image} id={project.id} title={project.title} params={projectParams} />
                })}
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