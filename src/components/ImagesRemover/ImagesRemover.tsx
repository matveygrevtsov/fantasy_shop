import { ImageInStore } from "../../types/store";
import { useImagesRemover } from "./useImagesRemover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../constants/texts";

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
  const { handleClick, notSelectedImages } = useImagesRemover(images, onSelect);

  if (notSelectedImages.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <label className={s.label}>{texts.ImagesRemover.title}</label>
      <ul className={s.list}>
        {notSelectedImages.map((image) => (
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
    </div>
  );
};
