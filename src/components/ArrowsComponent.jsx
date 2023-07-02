import ArrowTop from "../images/arrow-top-white.svg";
import React from "react";
import "./componentStyles/ArrowsComponent.css";

export const ArrowsComponent = ({
  firstArrowPos,
  secondArrowPos,
  valuesRef,
}) => {
  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);

  React.useEffect(() => {
    if (valuesRef.current) {
      let firstValuePos =
        valuesRef.current.children[firstArrowPos]?.getBoundingClientRect();
      if (arrowRef.current) {
        arrowRef.current.style.top = `${
          firstValuePos?.y - firstValuePos?.height / 1.8
        }px`;
        arrowRef.current.style.left = `${
          firstValuePos?.x + firstValuePos?.width / 6
        }px`;
        arrowRef.current.classList.add("arrowBrowserAnimate");
        arrowRef.current.style.visibility = "visible";
      }

      let secondValuePos =
        valuesRef.current.children[secondArrowPos]?.getBoundingClientRect();
      if (secondArrowRef.current) {
        secondArrowRef.current.style.top = `${
          secondValuePos?.y - secondValuePos?.height / 1.8
        }px`;
        secondArrowRef.current.style.left = `${
          secondValuePos?.x + secondValuePos?.width / 6
        }px`;
        secondArrowRef.current.classList.add("arrowBrowserAnimate");
        secondArrowRef.current.style.visibility = "visible";
      }
    }
  }, [firstArrowPos, secondArrowPos]);

  return (
    <div className="arrows">
      <img src={ArrowTop} ref={arrowRef} className="arrowBrowser" />
      <img
        src={ArrowTop}
        ref={secondArrowRef}
        className="arrowBrowser second"
      />
    </div>
  );
};
