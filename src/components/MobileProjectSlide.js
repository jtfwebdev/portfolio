import React from "react";

const MobileProjectSlide = ({project, id, heroImg, title, params}) => {
    return ( 
        <div ref={project}
            className="project_individ project_1"
            onClick={() => !params.dragging && params.setActiveProject(id)}>
            <div
                style={{ backgroundImage: `url(${heroImg})`, filter: "brightness(50%)" }}
            />
            <h2
                style={{ fontSize: "5rem", color: "white" }}
            >{title.map((span, idx) => {
                return <React.Fragment key={idx}>{span}<br /></React.Fragment>
            })}</h2>
        </div>
     );
}
 
export default MobileProjectSlide;