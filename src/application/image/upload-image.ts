import { useImageStorage } from '../../services';

export const useUploadImage = () => {
  const storage = useImageStorage();

  const uploadImage = (image: File) => {
    return storage.uploadImage(image);
  };

  return { uploadImage };
};
