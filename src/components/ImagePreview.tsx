// image preview component
import styled from "styled-components/macro";

const StyledImage = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
`;
export const ImagePreview = ({ image }: { image: string }) => {
  return (
    <div className="row">
      <StyledImage src={image} alt="image-preview" className="imagePreview" />
    </div>
  );
};
