import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { StyledGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ hits }) => {
  return (
    <StyledGalleryList className="gallery">
      {hits.map(hit => {
        return <ImageGalleryItem key={hit.id} hit={hit} />;
      })}
    </StyledGalleryList>
  );
};
