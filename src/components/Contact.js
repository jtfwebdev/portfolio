import { useEffect, useContext } from 'react';
import '../styles/Contact.css';
import { motion, useAnimate, useInView } from 'framer-motion';
import ContactForm from './ContactForm';
import BlockTextEnter from './BlockTextEnter';
import { ScreenWidthContext } from '../App';

const Contact = ({contactRef}) => {

    const screenWidth = useContext(ScreenWidthContext);

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
        animateHeader(header.current, { fontSize: screenWidth < 580 ? "4rem" : "5rem", y: screenWidth > 750 ? 30 : 0 }, { duration: .4 });
        await animateContactPanel(contactPanel.current, { opacity: 1, rotateY: 0 }, { duration: 1 });
        await animateContactForm(contactForm.current, {opacity: 1, x: 0}, {duration: .5});
        await animateSpacer(spacer.current, {opacity: 1}, {duration: .5});
    }

    useEffect(() => {
        if (isInView) {
             enterTitle();
        }
        else { animateHeader(header.current, { opacity: 0, x: 200 }, { duration: 1 }) }
    }, [isInView]);

    return ( 
        <section className="contact" ref={contactRef}>
            <motion.h2 ref={header}
                initial={{
                    fontSize: `${screenWidth > 1200 ? "13rem"
                    : screenWidth > 1049 ? "11rem"
                    : screenWidth > 950 ? "10rem"
                    : screenWidth > 750 ? "8rem"
                    : screenWidth > 580 ? "6rem" : "5rem"
                }`}}
            className="contactHeader"
            >{title.map((char, idx) => {return <span key={idx}>{char}</span>})}</motion.h2>
            <motion.div 
                className="contactWrap" 
                ref={contactPanel}
                initial={{opacity: 0, rotateY: -50}}
                >
                {screenWidth < 1050 && <>
                    <h3 className="contactH3">Want to discuss a project?</h3>
                    <p className="contactp">Send me a message here, or contact me via the links below.</p>
                </>}
                <ContactForm contactForm={contactForm} />
                <motion.div className="spacer" ref={spacer} initial={{opacity: 0}}></motion.div>
                <div className="contactLinks" ref={contactLinks}>
                    {screenWidth >= 1050 && <>
                        <h3 className="contactH3">Want to discuss a project?</h3>
                        <p className="contactp">Send me a message here, or contact me via the links below.</p>
                    </>}
                    <div>
                        <label>Email</label>
                        <BlockTextEnter isInView={isInView} delay={3.5} link={true} target="mailto:jtfwebdevconsultant@hotmail.com?subject=Website%20Development%20Query">jtfwebdevconsultant@hotmail.com</BlockTextEnter>
                    </div>
                    <div>
                        <label>Github</label>
                        <BlockTextEnter isInView={isInView} delay={3.5} link={true} target="https://github.com/jtfwebdev">github.com/jtfwebdev</BlockTextEnter>
                    </div>
                    <div>
                        <label>linkedIn</label>
                        <BlockTextEnter isInView={isInView} delay={3.5} link={true} target="https://www.linkedin.com/in/josh-ford-a950452b0/">linkedin.com/josh-ford</BlockTextEnter>
                    </div>
                </div>
            </motion.div>
        </section>
     );
}
 
export default Contact;