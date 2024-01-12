import '../styles/StairTransition.css';
import { motion } from 'framer-motion';

const StairTransition = ({stairsScope}) => {

    const nbStairs = 7;

    return (
            <div className="stairs">
                <motion.div className="background" initial={{opacity: 0}}></motion.div>
                <div className="transition-container" ref={stairsScope}>
                    {[...Array(nbStairs)].map((stair, id) => {
                        return <motion.div initial={{top: 0, height: 0}}>

                        </motion.div>
                    })}
                </div>
            </div>
     );
}
 
export default StairTransition;