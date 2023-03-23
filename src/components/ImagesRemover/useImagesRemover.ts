import { useState } from "react";
import { ImageInStore } from "../../types/store";

export const useImagesRemover = (
  images: ImageInStore[],
  onSelect: (images: ImageInStore[]) => void
) => {
  const [selectedImages, setSelectedImages] = useState<ImageInStore[]>([]);

  const handleClick = (image: ImageInStore) => {
    const newSelectedImages = [...selectedImages, image];
    setSelectedImages(newSelectedImages);
    onSelect(newSelectedImages);
  };

  const getNotSelectedImages = () => {
    const idsOfSelectedImages = selectedImages.map(({ id }) => id);
    return images.filter(({ id }) => !idsOfSelectedImages.includes(id));
  };

  return { selectedImages, handleClick, getNotSelectedImages };
};
