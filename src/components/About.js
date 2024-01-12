import { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import { motion, useAnimate, useInView, stagger, AnimatePresence } from 'framer-motion';
import BlockTextEnter from './BlockTextEnter';
import ParticlesContainer from './ParticlesContainer';
import Landing from './Landing';

const About = ({homeRef}) => {

    const particleDivStyles = [
        { top: "11vh" },
        { top: "27vh" },
        { top: "43vh" },
        { top: "59vh" },
        { top: "75vh" }
    ]

    const [titleCont, animateTitleCont] = useAnimate();
    const [aboutHeader, animateHeader] = useAnimate();
    const isInView = useInView(titleCont);
    const wrapRef = useRef();
    const [hasEntered, setHasEntered] = useState(false);

    const [landingDiv1, animateLandingDiv1] = useAnimate();
    const [landingDiv2, animateLandingDiv2] = useAnimate();
    const [landingDiv3, animateLandingDiv3] = useAnimate();
    const [landingDiv4, animateLandingDiv4] = useAnimate();
    const [landingDiv5, animateLandingDiv5] = useAnimate();

    const [devIcons, animateDevIcons] = useAnimate();

    const landingText = "Powered by React.js";

    const handleEnter = async () => {
        await animateLandingDiv5(landingDiv5.current, { height: 0 }, { duration: .6, delay: 2.5 });
        await animateLandingDiv4(landingDiv4.current, { height: 0 }, { duration: .5 });
        await animateLandingDiv3(landingDiv3.current, { height: 0 }, { duration: .4 });
        await animateLandingDiv2(landingDiv2.current, { height: 0 }, { duration: .3 });
        await animateLandingDiv1(landingDiv1.current, { height: 0 }, { duration: .2 });
        await animateTitleCont(titleCont.current, { width: '100%' }, { duration: .3, delay: .5 });
        await animateHeader(aboutHeader.current, { opacity: .4 }, { duration: .2 });
        await animateTitleCont(titleCont.current, { width: 0, x: wrapRef.current.getBoundingClientRect().width }, { duration: .3 });
        setHasEntered(true);
        await animateDevIcons("div", { opacity: 1, y: 0}, {duration: .2, delay: stagger(.1) });
    }

    useEffect(() => {
        if (isInView && !hasEntered) {
            handleEnter()
        }
        else {animateTitleCont(titleCont.current, { width: 0}, {duration: 1})}
    }, [isInView]);

    const devIconsList = [
        {
            target: "devicon-react-original colored",
            text: "React.js"
        },
        {
            target: "devicon-express-original colored",
            text: "Express"
        },
        {
            target: "devicon-mongodb-plain colored",
            text: "mongoDB"
        },
        {
            target: "devicon-nodejs-plain colored",
            text: "node.js"
        },
        {
            target: "devicon-git-plain colored",
            text: "git"
        },
        {
            target: "devicon-php-plain colored",
            text: "PHP"
        },
        {
            target: "devicon-typescript-plain colored",
            text: "Typescript"
        },
        {
            target: "devicon-wordpress-plain colored",
            text: "Wordpress"
        },
        {
            target: "devicon-woocommerce-plain colored",
            text: "WooCommerce"
        },
        {
            target: "devicon-jquery-plain colored",
            text: "jQuery"
        }
    ];

    const [activeTech, setActiveTech] = useState(null);

    const name = [
        "J", "O", "S", "H", " ", "F", "O", "R", "D"
    ]

    return ( 
        <section className="aboutSection" ref={homeRef}>
            <Landing 
            landingDiv1={landingDiv1} 
            landingDiv2={landingDiv2} 
            landingDiv3={landingDiv3}
            landingDiv4={landingDiv4}
            landingDiv5={landingDiv5}
            landingText={landingText}
            />
            <div className="titleWrap" ref={wrapRef}>
                <motion.div 
                ref={titleCont} 
                className="titleContainer"></motion.div>
                <motion.h2 ref={aboutHeader}>{name.map((char) => {
                    return <span>{char}</span>
                })}</motion.h2>
            </div>
            <div className="priorityTitleContainer">
                <BlockTextEnter isInView={isInView} priorityFont={true}>Full Stack Web Developer</BlockTextEnter>
            </div>
            <div className="aboutTextContainer">
                <BlockTextEnter isInView={isInView}>Highly responsive UIs &#x2022; Seamless UXs</BlockTextEnter>
            </div>
            <ParticlesContainer style={particleDivStyles[0]} id={1} particleDensity={200} />
            <ParticlesContainer style={particleDivStyles[1]} id={2} particleDensity={200} />
            <ParticlesContainer style={particleDivStyles[2]} id={3} particleDensity={300} />
            <ParticlesContainer style={particleDivStyles[3]} id={4} particleDensity={250} />
            <ParticlesContainer style={particleDivStyles[4]} id={5} particleDensity={200} />
            <div className="bio_container">
                <BlockTextEnter isInView={isInView}>I specialise in designing and developing full-stack websites and web apps, as well as deploying and maintaining code bases.</BlockTextEnter>
                <BlockTextEnter isInView={isInView}>My main tech proficiences are listed below:</BlockTextEnter>
            </div>
            <div className="devIcon_container" ref={devIcons}>
                {devIconsList.map((devIcon, idx) => {
                    return (
                        <motion.div initial={{ y: -100, opacity: 0 }}>
                            <motion.i onMouseEnter={() => setActiveTech(idx)}
                                onMouseLeave={() => setActiveTech(null)}
                                className={devIcon.target} key={idx}>
                                <AnimatePresence>
                                    {activeTech == idx && <motion.p 
                                        initial={{x: "50%", y: "-130%", opacity: 0}}
                                        transition={{duration: 0.3, ease: [0, 0.71, 0.2, 1.01], y: {
                                            type: "spring",
                                            damping: 10,
                                            mass: 1,
                                            stiffness: 100,
                                        }}}
                                        animate={{y: "-80%", opacity: 1}}
                                        exit={{y: "-200%", opacity: 0}}>{devIcon.text}</motion.p>}
                                </AnimatePresence>
                            </motion.i>
                        </motion.div>
                    )
                })}
            </div>
        </section>
     );
}

export default About;