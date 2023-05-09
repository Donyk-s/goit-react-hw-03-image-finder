import { StyledLoadMoreBtn } from './Button.styled';

export const Button = ({ loadImg }) => {
  return (
    <StyledLoadMoreBtn type="button" onClick={loadImg}>
      Load more
    </StyledLoadMoreBtn>
  );
};
