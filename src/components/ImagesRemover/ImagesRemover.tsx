import { ImageInStore } from "../../types/store";
import { useImagesRemover } from "./useImagesRemover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";

import s from "./ImagesRemover.module.css";

interface Props {
  images: ImageInStore[];
  onSelect: (images: ImageInStore[]) => void;
  className?: string;
}

export const ImagesRemover: React.FC<Props> = ({
  images,
  onSelect,
  className,
}) => {
  const { selectedImages, handleClick, getNotSelectedImages } =
    useImagesRemover(images, onSelect);

  return (
    <ul className={cn(s.root, className)}>
      {getNotSelectedImages().map((image) => (
        <li key={image.id} className={s.imageContainer}>
          <button
            onClick={() => handleClick(image)}
            className={s.removeImageButton}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
          <img alt="" src={image.src} className={s.image} />
        </li>
      ))}
    </ul>
  );
};
