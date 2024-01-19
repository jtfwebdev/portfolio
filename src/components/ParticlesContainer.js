import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { motion } from 'framer-motion';

const ParticlesContainer = ({style, id, particleDensity}) => {

    const options = useMemo(() => {
        return {
            background: {
                color: {
                    value: "#0d47a1",
                },
            },
            fullScreen: {
                enable: false,
                zIndex: -1
            },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 50,
                        duration: 0.4,
                    },
                    grab: {
                        distance: 200,
                        lineLinked: {
                            opacity: 1
                        }
                    }
                },
            },
            particles: {
                color: {
                    value: "#ffffff",
                },
                links: {
                    color: "#ffffff",
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 4,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 600,
                    },
                    value: particleDensity,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }
    }, []);

    const particlesInit = useCallback(async engine => {
        //console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        //await console.log(container);
    }, []);

    return (
        <motion.div
        className="particleContainer"
        style={{top: style && style.top}}
        initial={{top: '200vh', opacity: 0}}
        transition={{type: 'spring', duration: (1 + (0.2*id)), delay: 1}}
        animate={{top: style && style.top, opacity: 1}}
        >
            <Particles 
            id={`tsparticles${id}`} 
            init={particlesInit} 
            loaded={particlesLoaded}
            options={options}
            />
        </motion.div>
     );
}
 
export default ParticlesContainer;