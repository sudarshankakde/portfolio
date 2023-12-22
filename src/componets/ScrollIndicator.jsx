import { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: #dadada84;
  position: fixed!important;
  top: 0!important;
  z-index: 1;
`;
const ProgressBar = styled.div`
  height: 4px;
  background: ${(props) => props.color || "#ccc"};
  width: ${(props) => props.width || 0}%;
`;
const ProgressText = styled.span`
  font-size: 1rem;
`;

const ScrollIndicator = ({ color, showText }) => {
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(() => {
    window.onscroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgressWidth(scrolled);
    };
  }, []);

  return (
    <ProgressContainer className="md:hidden">
      <ProgressBar width={progressWidth} color={color}>
        {showText && (
          <ProgressText width={progressWidth}>{`${Math.round(
            progressWidth
          )}%`}</ProgressText>
        )}
      </ProgressBar>
    </ProgressContainer>
  );
};

export default ScrollIndicator;
