import styled from "styled-components/macro";
// type for props
type ButtonProps = {
  // text for button
  children: string;
  // onClick function optional on type submit
  onClick?: () => void;
  type: "submit" | "reset" | "button";
  disabled?: boolean | undefined;
};
// styled button with glassmorphism effect
const StyledButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  /* border: 1px solid rgba(255, 255, 255, 0.18); */
  border: none;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 1rem;
  transition: all 0.5s ease-in-out;
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.5);
    /* no border */
    border: none;
  }
  /* disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      transform: scale(1);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      /* no border */
      border: none;
    }
  }
`;
// a button components, that accepts props of type ButtonProps
export const Button = ({ children, onClick, type, disabled }: ButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  );
};
