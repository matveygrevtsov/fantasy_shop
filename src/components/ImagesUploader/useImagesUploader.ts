import { useState } from "react";

type SelectedImage = File & {
  src: string;
};

export function useImagesUploader(onSelect: (images: File[]) => void) {
  const [images, setImages] = useState<SelectedImage[]>([]);

  function handleSelect(selectedImages: File[]) {
    const newSelectedImages = selectedImages.map((image) =>
      Object.assign(image, {
        src: URL.createObjectURL(image),
      })
    );
    const newImages = [...images, ...newSelectedImages];
    setImages(newImages);
    onSelect(newImages);
  }

  function handleRemoveImage(src: string) {
    const newImagesArray = images.filter((image) => image.src !== src);
    setImages(newImagesArray);
    onSelect(newImagesArray);
  }

  return { handleSelect, images, handleRemoveImage };
}
