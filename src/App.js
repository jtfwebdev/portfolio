import { useEffect, useRef } from "react";
import Homepage from "./components/Homepage";
import StairTransition from "./components/StairTransition";
import { useAnimate, stagger } from 'framer-motion';

function App() {

  const homeRef = useRef();
  const projectRef = useRef();
  const contactRef = useRef();
  const bioRef = useRef();

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, []);

  const [stairsScope, animateStairs] = useAnimate();

  const handleAnimateStairs = async (target) => {
    await animateStairs("div", { height: "100%" }, { duration: 0.2, ease: [.42, 0, 1, .69], delay: stagger(0.05) });
    window.scrollTo({ top: target.current.offsetTop});
    await animateStairs("div", { top: "100%" }, { duration: 0.2, ease: [.42, 0, 1, .69], delay: stagger(0.05) });
    animateStairs("div", { height: 0, top: 0 }, { duration: 0 });
  }

  return (
    <div className="App">
      <StairTransition stairsScope={stairsScope} />
      <Homepage homeRef={homeRef} projectRef={projectRef} contactRef={contactRef} bioRef={bioRef} handleAnimateStairs={handleAnimateStairs} />
    </div>
  );
}

export default App;