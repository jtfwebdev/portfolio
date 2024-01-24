import '../styles/Bio.css';
import BioText from '../Bio.json';
import BlockTextEnter from './BlockTextEnter';
import { motion, useInView, useAnimate } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Bio = ({bioRef}) => {

    const textRef1 = useRef();
    const textRef2 = useRef();
    const textRef3 = useRef();
    const textRef4 = useRef();
    const textRef5 = useRef();

    const [braceRef, animateBraceRef] = useAnimate();

    const isInView1 = useInView(textRef1, { once: true, amount: 0.1 });
    const isInView2 = useInView(textRef2, { once: true, amount: 0.1 });
    const isInView3 = useInView(textRef3, { once: true, amount: 0.1 });
    const isInView4 = useInView(textRef4, { once: true, amount: 0.1 });
    const isInView5 = useInView(textRef5, { once: true, amount: 0.1 });
    const braceInView = useInView(braceRef, {once: true, amount: 0.9});


    useEffect(() => {
        if (braceInView) {
            animateBraceRef(braceRef.current, {y: 0, opacity: 1}, {duration: 1});
        }
    }, [braceInView]);

    return (
        <motion.div className="bioContainer" ref={bioRef}>
            <div className="braceWrap">
                <motion.hr 
                className="brace"
                initial={{ y: -50, opacity: 0 }}
                ref={braceRef}></motion.hr>
            </div>
            <div className="bioText">
                    <div className="bioParagraph" ref={textRef1}>
                        <BlockTextEnter isInView={isInView1} delay={.1}>{BioText[0].text[0]}</BlockTextEnter>
                    </div>
                    <div className="bioParagraph" ref={textRef2}>
                        <BlockTextEnter isInView={isInView2} delay={.1}>{BioText[0].text[1]}</BlockTextEnter>
                    </div>
                    <div className="bioParagraph" ref={textRef3}>
                        <BlockTextEnter isInView={isInView3} delay={.1}>{BioText[0].text[2]}</BlockTextEnter>
                    </div>
                    <div className="bioParagraph" ref={textRef4}>
                        <BlockTextEnter isInView={isInView4} delay={.1}>{BioText[0].text[3]}</BlockTextEnter>
                    </div>
                    <div className="bioParagraph" ref={textRef5}>
                        <BlockTextEnter isInView={isInView5} delay={.1}>{BioText[0].text[4]}</BlockTextEnter>
                    </div>
            </div>
        </motion.div>
     );
}
 
export default Bio;