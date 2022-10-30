// date input, type datetime-local, with min value set to today's date, and time limited to every round hour
// styled with styled-components in glassmorphism style

import styled from "styled-components";
// type for props
type DateInputProps = {
  // onChange function
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  className?: string;
  // value for textarea
  value: string;
};
// styled input with glassmorphism effect
const StyledDateInput = styled.input`
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
// a date input components, that accepts props of type DateInputProps
export const DateInput = ({ onChange, value, ...rest }: DateInputProps) => {
  const today = new Date();
  // dateToday in string with format YYYY-MM-DDThh:mm
  const dateToday = today.toISOString().slice(0, 16);
  return (
    <StyledDateInput
      type="datetime-local"
      min={dateToday}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
};
