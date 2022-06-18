import axios from 'axios';
import { ImageStorageService } from '../application/ports';
import { keys } from '../presentation/util';

export const useImageStorage = (): ImageStorageService => {
  const uploadImageToS3 = async (image: File) => {
    try {
      // get aws s3 url to upload
      const uploadConfig = await axios.get('/api/upload');

      // put data to aws s3
      await axios.put(uploadConfig.data.url, image, {
        headers: {
          'Content-Type': image.type,
        },
      });

      const imageUrl = keys.AWS_S3_URL + uploadConfig.data.key;
      return imageUrl;
    } catch (err) {
      console.log(err);
    }
  };

  return { uploadImage: uploadImageToS3 } as ImageStorageService;
};
