import React from 'react';
import { motion } from 'framer-motion';

const FullScreenProjectSlide = ({ project, id, heroImg, title, params }) => {
    
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
        <motion.div ref={project} variants={projectParent}
            initial={{ opacity: 0, x: -200 }}
            className="project_individ project_1"
            onClick={() => !params.dragging && params.setActiveProject(id)}
            whileHover="hover">
            <motion.div variants={projectImg}
                style={{ backgroundImage: `url(${heroImg})` }}
            />
            <motion.h2 variants={projectHeader}
                style={{ fontSize: "2rem", color: "white" }}
                transition={{ duration: 0.4, ease: [0, 0.71, 0.2, 1.01], delay: params.activeProject ? 1 : 0 }}
            //transition={SPRING_TRANSITION}
            >{title.map((span, idx) => {
                return <React.Fragment key={idx}>{span}<br/></React.Fragment>
            })}
                </motion.h2>
        </motion.div>
     );
}
 
export default FullScreenProjectSlide;