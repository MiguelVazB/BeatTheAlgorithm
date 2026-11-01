import React from "react";
import PropTypes from "prop-types";
import ArrowTop from "../images/arrow-top-white.svg";
import { getRelativePoint } from "../utils/elementGeometry";
import "./componentStyles/ArrowsComponent.css";

export const ArrowsComponent = ({ firstArrowPos, secondArrowPos, valuesRef }) => {
  const layerRef = React.useRef(null);
  const arrowRef = React.useRef(null);
  const secondArrowRef = React.useRef(null);

  const positionArrows = React.useCallback(() => {
    const layer = layerRef.current;
    const values = valuesRef.current;
    if (!layer || !values) return;

    const layerRect = layer.getBoundingClientRect();
    const gap = window.innerWidth <= 700 ? 3 : window.innerWidth <= 860 ? 4 : 5;

    for (const [arrow, index] of [[arrowRef.current, firstArrowPos], [secondArrowRef.current, secondArrowPos]]) {
      if (!arrow) continue;
      const target = values.children[index];
      if (!target) {
        arrow.style.visibility = "hidden";
        continue;
      }

      const point = getRelativePoint(target.getBoundingClientRect(), layerRect, 0.5, 1);
      arrow.style.left = `${point.x - arrow.offsetWidth / 2}px`;
      arrow.style.top = `${point.y + gap}px`;
      arrow.style.visibility = "visible";
    }
  }, [firstArrowPos, secondArrowPos, valuesRef]);

  React.useLayoutEffect(() => {
    positionArrows();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(positionArrows);
    if (valuesRef.current) observer?.observe(valuesRef.current);
    if (layerRef.current) observer?.observe(layerRef.current);
    window.addEventListener("resize", positionArrows);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", positionArrows);
    };
  }, [positionArrows, valuesRef]);

  return (
    <div className="arrows" ref={layerRef} aria-hidden="true">
      <img src={ArrowTop} alt="" ref={arrowRef} onLoad={positionArrows} className="arrowBrowser arrowBrowserAnimate" />
      <img src={ArrowTop} alt="" ref={secondArrowRef} onLoad={positionArrows} className="arrowBrowser arrowBrowserAnimate second" />
    </div>
  );
};

ArrowsComponent.propTypes = {
  firstArrowPos: PropTypes.number.isRequired,
  secondArrowPos: PropTypes.number,
  valuesRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
};
