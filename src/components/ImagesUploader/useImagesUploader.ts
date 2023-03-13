export function useImagesUploader(onSelect: (images: File[]) => void) {
  function handleSelect(images: File[]) {
    onSelect(images);
  }

  return { handleSelect };
}
