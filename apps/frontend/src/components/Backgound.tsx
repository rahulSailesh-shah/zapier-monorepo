import React from "react";
import backgroundSvg from "../assets/background.svg";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({
  children,
  className = "",
}) => {
  return (
    <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="relative">
          <div className="tools absolute left-0 bottom-0 z-10 flex flex-col ">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            <section
              className={`bg-cover bg-center bg-no-repeat flex items-center justify-center ${className}`}
              style={{ backgroundImage: `url(${backgroundSvg})` }}
            >
              <div>{children}</div>
            </section>
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};

export default Background;
