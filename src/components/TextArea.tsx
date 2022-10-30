// TextArea componenet, with glassmorphism design, styled with styled-components
import styled from "styled-components";
// type for props
type TextAreaProps = {
  // onChange function
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  id: string;
  name: string;
  className?: string;
  // value for textarea
  value: string;

};
// styled textarea with glassmorphism effect
const StyledTextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 1rem;
  transition: all 0.5s ease-in-out;
  /* remove border on focus-visible */
  &:focus-visible {
    outline: none;
    border: none;
  }
`;
// a textarea components, that accepts props of type TextAreaProps
export const TextArea = ({ onChange, value, ...rest }: TextAreaProps) => {
  return <StyledTextArea onChange={onChange} value={value} {...rest} />;
};
