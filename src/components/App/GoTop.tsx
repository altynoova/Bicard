import React from "react";

interface GoTopProps {
    scrollStepInPx: string
    delayInMs: number
}

const GoTop = ({ scrollStepInPx, delayInMs }: GoTopProps) => {
  const [thePosition, setThePosition] = React.useState(false);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        setThePosition(true);
      } else {
        setThePosition(false);
      }
    });
  }, []);

  const onScrollStep = () => {
    if (window.pageYOffset === 0) {
      // @ts-ignore
        clearInterval(timeoutRef.current);
    }
    // @ts-ignore
      window.scroll(0, window.pageYOffset - scrollStepInPx);
  };

  const scrollToTop = () => {
    // @ts-ignore
      timeoutRef.current = setInterval(onScrollStep, delayInMs);
  };

  const renderGoTopIcon = () => {
    return (
      <div
        className={`go-top ${thePosition ? "active" : ""}`}
        onClick={scrollToTop}
      >
        <i className="icofont-hand-drawn-up"></i>
      </div>
    );
  };

  return <>{renderGoTopIcon()}</>;
};

export default GoTop;
