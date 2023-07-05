import ArrowTop from "../images/arrow-top-white.svg";
import React from "react";
import "./componentStyles/ArrowsComponent.css";

export const ArrowsComponent = ({
  firstArrowPos, // position of first arrow
  secondArrowPos, // position of second arrow
  valuesRef, // ref to elements
  xOffset = 4, // offset to move arrow left or right
  yOffset = 2, // offset to move arrow up and down
}) => {
  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);

  React.useEffect(() => {
    if (valuesRef.current) {
      let firstValuePos =
        valuesRef.current.children[firstArrowPos]?.getBoundingClientRect();
      if (arrowRef.current) {
        arrowRef.current.style.top = `${
          firstValuePos?.y - firstValuePos?.height / yOffset
        }px`;
        arrowRef.current.style.left = `${
          firstValuePos?.x + firstValuePos?.width / xOffset
        }px`;
        arrowRef.current.classList.add("arrowBrowserAnimate");
        arrowRef.current.style.visibility = "visible";
      }

      let secondValuePos =
        valuesRef.current.children[secondArrowPos]?.getBoundingClientRect();
      if (secondArrowRef.current) {
        secondArrowRef.current.style.top = `${
          secondValuePos?.y - secondValuePos?.height / yOffset
        }px`;
        secondArrowRef.current.style.left = `${
          secondValuePos?.x + secondValuePos?.width / xOffset
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
