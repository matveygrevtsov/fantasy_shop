import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../constants/texts";
import { useImagesUploader } from "./useImagesUploader";
import cn from "classnames";

import s from "./ImagesUploader.module.css";

interface Props {
  onSelect: (images: File[]) => void;
  className?: string;
}

export function ImagesUploader({ onSelect, className }: Props) {
  const { handleSelect, images, handleRemoveImage } =
    useImagesUploader(onSelect);

  return (
    <div className={cn(s.root, className)}>
      <Dropzone onDrop={handleSelect}>
        {({ getRootProps, getInputProps }) => (
          <div className={s.dropZone} {...getRootProps()}>
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faFileImage} className={s.uploadIcon} />
            <p>{texts.ImagesUploader.placeholder}</p>
          </div>
        )}
      </Dropzone>
      <ul className={s.images}>
        {images.map(({ src }) => (
          <li key={src} className={s.imageContainer}>
            <img
              src={src}
              onLoad={() => {
                URL.revokeObjectURL(src);
              }}
              className={s.image}
            />
            <button
              onClick={() => handleRemoveImage(src)}
              className={s.removeImageButton}
            >
              <FontAwesomeIcon
                className={s.removeImageIcon}
                icon={faCircleXmark}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
