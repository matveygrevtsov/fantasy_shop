import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { texts } from "../../constants/texts";
import { useImagesUploader } from "./useImagesUploader";
import cn from "classnames";

import s from "./ImagesUploader.module.css";

export enum DropzoneStatus {
  DragEnter = "DragEnter",
  DragLeave = "DragLeave",
}

interface Props {
  onSelect: (images: File[]) => void;
  className?: string;
}

const CONFIG = {
  accept: { "image/*": [] },
};

export function ImagesUploader({ onSelect, className }: Props) {
  const {
    state,
    handleSelect,
    handleRemoveImage,
    handleDragEnter,
    handleDragLeave,
  } = useImagesUploader(onSelect);
  const dropZoneClassName =
    state.status === DropzoneStatus.DragEnter ? s.dropZoneActive : s.dropZone;

  return (
    <div className={cn(s.root, className)}>
      <Dropzone
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDropRejected={console.log}
        onError={console.log}
        onDrop={handleSelect}
        {...CONFIG}
      >
        {({ getRootProps, getInputProps }) => (
          <div className={dropZoneClassName} {...getRootProps()}>
            <input {...getInputProps()} />
            <FontAwesomeIcon icon={faFileImage} className={s.uploadIcon} />
            <p>{texts.ImagesUploader.placeholder}</p>
          </div>
        )}
      </Dropzone>
      <ul className={s.images}>
        {state.images.map(({ src }) => (
          <li key={src} className={s.imageContainer}>
            <img
              alt=""
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
                icon={faTrashCan}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
