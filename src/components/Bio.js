import '../styles/Bio.css';
import BioText from '../Bio.json';
import BlockTextEnter from './BlockTextEnter';
import { motion, useInView } from 'framer-motion';

const Bio = ({bioRef}) => {

    const isInView = useInView(bioRef, {once: true, amount: 0.3});

    return (
        <motion.div className="bioContainer">
            <div className="braceWrap"><hr className="brace"></hr></div>
            <div className="bioText" ref={bioRef}>
                {BioText[0].text.map((paragraph) => {
                    return <BlockTextEnter isInView={isInView} delay={.5}>{paragraph}</BlockTextEnter>
                })}
            </div>
        </motion.div>
     );
}
 
export default Bio;