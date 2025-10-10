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
  const [containerPos, setContainerPos] = React.useState(null);

  // Get the position of the container once
  React.useEffect(() => {
    if (valuesRef.current) {
      const containerRect = valuesRef.current.getBoundingClientRect();
      setContainerPos({
        x: containerRect.left + window.scrollX,
        y: containerRect.top + window.scrollY
      });
    }
  }, [valuesRef]);

  React.useEffect(() => {
    if (valuesRef.current && containerPos) {
      // Get positions relative to the parent container
      let firstValuePos =
        valuesRef.current.children[firstArrowPos]?.getBoundingClientRect();
      if (arrowRef.current && firstValuePos) {
        const arrowWidth = arrowRef.current.offsetWidth;
        const arrowHeight = arrowRef.current.offsetHeight;
        // Position arrow at the bottom center of the node
        arrowRef.current.style.top = `${firstValuePos.top + firstValuePos.height + 5}px`;
        arrowRef.current.style.left = `${firstValuePos.left + (firstValuePos.width / 2) - (arrowWidth / 2)}px`;
        // Keep original orientation
        arrowRef.current.classList.add("arrowBrowserAnimate");
        arrowRef.current.style.visibility = "visible";
      }

      let secondValuePos =
        valuesRef.current.children[secondArrowPos]?.getBoundingClientRect();
      if (secondArrowRef.current && secondValuePos) {
        const arrowWidth = secondArrowRef.current.offsetWidth;
        const arrowHeight = secondArrowRef.current.offsetHeight;
        // Position arrow at the bottom center of the node
        secondArrowRef.current.style.top = `${secondValuePos.top + secondValuePos.height + 5}px`;
        secondArrowRef.current.style.left = `${secondValuePos.left + (secondValuePos.width / 2) - (arrowWidth / 2)}px`;
        // Keep original orientation
        secondArrowRef.current.classList.add("arrowBrowserAnimate");
        secondArrowRef.current.style.visibility = "visible";
      }
    }
  }, [firstArrowPos, secondArrowPos, containerPos]);

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
