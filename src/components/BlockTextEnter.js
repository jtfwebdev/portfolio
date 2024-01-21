import { motion, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const BlockTextEnter = ({children, isInView, priorityFont, delay, link, target}) => {

    const [blockDivRef, animateBlockDivRef] = useAnimate();
    const [text, animateText] = useAnimate();
    const wrapRef = useRef();
    const [hasEntered, setHasEntered] = useState(false);

    const handleEnter = async () => {
        await animateBlockDivRef(blockDivRef.current, { width: '100%' }, { duration: .4, ease: [0, 0.71, 0.2, 1.01], delay: delay ? delay : 5 });
        await animateText(text.current, { opacity: .8 }, { duration: 0.2 });
        await animateBlockDivRef(blockDivRef.current, { width: 0, x: wrapRef.current.getBoundingClientRect().width }, { ease: [0, 0.71, 0.2, 1.01], duration: .4 });
        setHasEntered(true);
    }

    useEffect(() => {
        if (isInView && !hasEntered) { handleEnter() }
        else { animateBlockDivRef(blockDivRef.current, { width: 0 }, { duration: 1 }) }
    }, [isInView]);
    
    return ( 
        <div className="textWrap" ref={wrapRef}>
            <motion.div 
            className="blockingDiv"
            ref={blockDivRef}
            >
            </motion.div>
            {!link && <motion.h2 className={priorityFont ? "priorityFont" : ""} ref={text}>
                {children}
            </motion.h2>}
            {link && <motion.a href={target} target="_blank" className={priorityFont ? "priorityFont" : ""} ref={text}>
                {children}
            </motion.a>}
        </div>
     );
}
 
export default BlockTextEnter;