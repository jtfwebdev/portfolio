import { useState } from 'react';
import '../styles/MobileNav.css';
import { AnimatePresence, motion } from 'framer-motion';

const MobileNav = ({homeRef, projectRef, contactRef, bioRef, handleAnimateStairs}) => {

    const [hamOpen, setHamOpen] = useState(false);

    const toggleMenu = () => {
        if (hamOpen) {
            setBurgerClass("burger-bar unclicked");
        } else setBurgerClass("burger-bar clicked");
        setHamOpen((prev) => !prev);
    }

    const handleNavigate = (target) => {
        if (target.current) {
            handleAnimateStairs(target)
        }
        setHamOpen(false);
    }

    const links = [
        {
            text: "Home",
            target: homeRef
        }, 
        {
            text: "About",
            target: bioRef
        }, 
        {
            text: "Projects",
            target: projectRef
        }, 
        {
            text: "Contact",
            target: contactRef
        }
    ];

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
                duration: .4,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    const navLinkVariants = {
        initial: {
            y: "30vh",
            transition: {
                duration: .4,
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

    const burgerMenuVariants = {
        initial1: {

        },
        open1: {
            rotate: "45deg",
            y: "185%"
        },
        initial2: {
            opacity: 1
        },
        open2: {
            opacity: 0
        },
        initial3: {

        },
        open3: {
            rotate: "-45deg",
            y: "-185%"
        }
    }

    const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");

    return ( 
        <div className="mobileNav-wrap">
            <div className="hamburger" onClick={() => toggleMenu()}>
                <motion.div className={burgerClass} variants={burgerMenuVariants} initial="initial1" animate={hamOpen ? "open1" : "initial1"}></motion.div>
                <motion.div className={burgerClass} variants={burgerMenuVariants} initial="initial2" animate={hamOpen ? "open2" : "initial2"}></motion.div>
                <motion.div className={burgerClass} variants={burgerMenuVariants} initial="initial3" animate={hamOpen ? "open3" : "initial3"}></motion.div>
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
                        {links.map((link) => {
                            return <div>
                                <motion.div variants={navLinkVariants}>
                                    <button onClick={() => handleNavigate(link.target)}>{link.text}</button>
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