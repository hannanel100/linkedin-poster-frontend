import styled from "styled-components";
type LoadingSpinnerProps = {
  width?: string;
  height?: string;
};
const StyledLoadingSpinner = styled.div<LoadingSpinnerProps>`
  display: inline-block;
  width: ${(props) => Number(props.width) + 16}px;
  height: ${(props) => Number(props.height) + 16}px;
  &::after {
    content: " ";
    display: block;
    /* width from props */
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin: 2px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({
  width = "64",
  height = "64",
}: LoadingSpinnerProps) => {
  return <StyledLoadingSpinner height={height} width={width} />;
};

export default LoadingSpinner;
