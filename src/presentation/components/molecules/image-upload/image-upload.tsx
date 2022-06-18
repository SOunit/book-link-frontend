import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { Image } from '../../atoms';
import classes from './image-upload.module.css';

type Props = {
  imageFile?: File;
  imageUrl?: string;
  setImageFile: any;
};

export const ImageUpload: FC<Props> = ({
  imageFile,
  imageUrl = '',
  setImageFile,
}) => {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>();

  const selectFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.files &&
      event.target.files[0].type.substring(0, 5) === 'image'
    ) {
      setImageFile(event.target.files[0]);
    }
  };

  const imageClickHandler = () => {
    imagePickerRef.current?.click();
  };

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);

  return (
    <div className={classes['image-upload']} onClick={imageClickHandler}>
      <input
        className={classes['image-upload__image-picker']}
        type="file"
        onChange={selectFileHandler}
        ref={imagePickerRef}
        accept="image/*"
      />
      <Image
        src={preview ? preview : imageUrl}
        alt="preview"
        imageStyle={classes['image-upload__image']}
      />
      <p>Update</p>
    </div>
  );
};
