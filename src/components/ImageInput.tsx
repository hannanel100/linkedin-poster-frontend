//an input with type file, that accepts props of type ImageInputProps
// styled with styled components and glassmorphism effect

import styled from "styled-components";
import { Button } from "./Button";
type ImageInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  className?: string;
  isUploaded: boolean;
};
type StyledImageInputProps = {
  isUploaded: boolean;
};
const StyledLabel = styled.label<StyledImageInputProps>`
  display: inline-block;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  border: none;
  /* change color based on props */
  color: ${(props) => (props.isUploaded ? "rgba(31, 38, 135, 0.37)" : "white")};
  /* animate changing of color */
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  /* transition: all 0.5s ease-in-out; */
  transition: color 1s cubic-bezier(0.075, 0.82, 0.165, 1), all 0.5s ease-in-out;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.5);
    /* no border */
    border: none;
  }
`;
const StyledImageInput = styled.input`
  display: none;
`;
export const ImageInput = ({
  onChange,
  isUploaded,
  ...rest
}: ImageInputProps) => {
  return (
    <StyledLabel isUploaded={isUploaded}>
      <StyledImageInput onChange={onChange} type="file" {...rest} />
      {!isUploaded ? "Upload Image" : "Change Image"}
    </StyledLabel>
  );
};
