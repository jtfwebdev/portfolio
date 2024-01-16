import { useState } from 'react';
import '../styles/MobileNav.css';
import { AnimatePresence, motion } from 'framer-motion';

const MobileNav = () => {

    const [hamOpen, setHamOpen] = useState(false);

    const toggleMenu = () => {
        setHamOpen((prev) => !prev)
    }

    const links = ["Home", "About", "Projects", "Contact"];

    const dropDownVariants = {
        initial: {
            scaleY: 0
        },
        animate: {
            scaleY: 1,
            transition: {
                duration: .5,
                ease: [0.12, 0, 0.39, 0]
            }
        },
        exit: {
            scaleY: 0,
            transition: {
                delay: 0.5,
                duration: .5,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const navLinkVariants = {
        initial: {
            y: "30vh",
            transition: {
                duration: .5,
                ease: [0.37, 0, 0.63, 1]
            }
        }, 
        open: {
            y: 0,
            transition: {
                duration: .7,
                ease: [0, 0.55, 0.45, 1]
            }
        }
    }

    const linkContainerVariants = {
        initial: {
            transition: {
                staggerChildren: 0.09,
                staggerDirection: -1
            }
        },
        open: {
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.09,
                staggerDirection: 1
            }
        }
    }

    return ( 
        <div className="mobileNav-wrap">
            <div className="hamburger" onClick={() => toggleMenu()}>
            </div>
            <AnimatePresence>
            {hamOpen && 
                <motion.div 
                className="mobileNav" 
                variants={dropDownVariants}
                initial="initial"
                animate="animate"
                exit="exit">
                    <motion.div className="navLinksContainer" variants={linkContainerVariants} initial="initial" animate="open" exit="initial">
                        {links.map((target) => {
                            return <div>
                                <motion.div variants={navLinkVariants}>
                                    <button>{target}</button>
                                </motion.div>
                            </div>
                        })}
                    </motion.div>
                </motion.div>
                }
            </AnimatePresence>
        </div>
     );
}
 
export default MobileNav;