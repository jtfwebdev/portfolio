import { useEffect } from 'react';
import '../styles/Contact.css';
import { motion, useAnimate, useInView } from 'framer-motion';
import ContactForm from './ContactForm';
import BlockTextEnter from './BlockTextEnter';

const Contact = ({contactRef}) => {

    const title = [
        "C", "O", "N", "T", "A", "C", "T", " ", "M", "E"
    ]

    const [header, animateHeader] = useAnimate();
    const [contactPanel, animateContactPanel] = useAnimate();
    const [contactForm, animateContactForm] = useAnimate();
    const [spacer, animateSpacer] = useAnimate();
    const [contactLinks, animateContactLinks] = useAnimate();

    const isInView = useInView(header, {amount: 0.3, once: true});

    const enterTitle = async () => {
        await animateHeader(header.current, { opacity: 0.3, x: 0 }, { duration: 1, ease: [0, 0.71, 0.2, 1.01], delay: .5 });
        await animateHeader(header.current, { fontSize: "5rem", y: 30 }, { duration: .4 });
        await animateContactPanel(contactPanel.current, { opacity: 1, rotateY: 0 }, { duration: 1 });
        await animateContactForm(contactForm.current, {opacity: 1, x: 0}, {duration: .5});
        await animateSpacer(spacer.current, {opacity: 1, y: 0}, {duration: .5});
    }

    useEffect(() => {
        if (isInView) {
             enterTitle();
        }
        else { animateHeader(header.current, { opacity: 0, x: 200 }, { duration: 1 }) }
    }, [isInView]);

    return ( 
        <section className="contact" ref={contactRef}>
            <motion.h2 ref={header} initial={{fontSize: "15rem"}} className="contactHeader"
            >{title.map((char) => {return <span>{char}</span>})}</motion.h2>
            <motion.div 
                className="contactWrap" 
                ref={contactPanel}
                initial={{opacity: 0, rotateY: -50}}
                >
                <ContactForm contactForm={contactForm} />
                <motion.div className="spacer" ref={spacer} initial={{opacity: 0, y: -100}}></motion.div>
                <div className="contactLinks" ref={contactLinks}>
                    <h3>Want to discuss a project?</h3>
                    <p>Send me a message here, or contact me via the links below.</p>
                    <div>
                        <label>Email</label>
                        <BlockTextEnter isInView={isInView} delay={3.5}>jtfwebdevconsultant@hotmail.com</BlockTextEnter>
                    </div>
                    <div>
                        <label>Github</label>
                        <BlockTextEnter isInView={isInView} delay={3.5}>https://github.com/jtfwebdev</BlockTextEnter>
                    </div>
                    <div>
                        <label>linkedIn</label>
                        <BlockTextEnter isInView={isInView} delay={3.5}>joshy@linkedIn.com</BlockTextEnter>
                    </div>
                </div>
            </motion.div>
        </section>
     );
}
 
export default Contact;