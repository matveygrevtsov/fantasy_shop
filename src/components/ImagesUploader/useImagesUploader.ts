import { useState } from "react";
import { DropzoneStatus } from "./ImagesUploader";

type SelectedImage = File & {
  src: string;
};

interface State {
  status: DropzoneStatus;
  images: SelectedImage[];
}

export function useImagesUploader(onSelect: (images: File[]) => void) {
  const [state, setState] = useState<State>({
    status: DropzoneStatus.DragLeave,
    images: [],
  });

  function handleSelect(selectedImages: File[]) {
    const newSelectedImages = selectedImages.map((image) =>
      Object.assign(image, {
        src: URL.createObjectURL(image),
      })
    );
    const newImages = [...state.images, ...newSelectedImages];
    setState({
      status: DropzoneStatus.DragLeave,
      images: newImages,
    });
    onSelect(newImages);
  }

  function handleRemoveImage(src: string) {
    const newImagesArray = state.images.filter((image) => image.src !== src);
    setState((prevState) => ({ ...prevState, images: newImagesArray }));
    onSelect(newImagesArray);
  }

  function handleDragEnter() {
    setState((prevState) => ({
      ...prevState,
      status: DropzoneStatus.DragEnter,
    }));
  }

  function handleDragLeave() {
    setState((prevState) => ({
      ...prevState,
      status: DropzoneStatus.DragLeave,
    }));
  }

  return {
    state,
    handleSelect,
    handleRemoveImage,
    handleDragEnter,
    handleDragLeave,
  };
}
