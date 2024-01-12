import { motion } from 'framer-motion';
import '../styles/Landing.css';
import IconReact from './IconReact';

const Landing = ({landingDiv1, landingDiv2, landingDiv3, landingDiv4, landingDiv5, landingText}) => {

    return ( 
        <motion.div className="landingDiv" ref={landingDiv1}>
            <motion.div className="landingDiv2" ref={landingDiv2}>
                <motion.div className="landingDiv3" ref={landingDiv3}>
                    <motion.div className="landingDiv4" ref={landingDiv4}>
                        <div><IconReact /></div>
                        <motion.div className="landingDiv5" ref={landingDiv5}>
                            <h2>{landingText.split("").map((char, index) => 
                            <motion.span 
                            initial={{opacity: 0}} 
                            animate={{opacity: 1}}
                            transition={{delay: 0.1 * index}}>{char}</motion.span>)}
                            </h2>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
     );
}
 
export default Landing;