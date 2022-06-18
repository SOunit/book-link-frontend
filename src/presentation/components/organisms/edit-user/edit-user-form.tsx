import { ChangeEvent, FC, Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { User } from '../../../../domain';
import { Button } from '../../atoms';
import {
  ImageUpload,
  Buttons,
  ValidateInput,
  ValidateTextarea,
} from '../../molecules';
import { useValidateForm } from '../../../../presentation/hooks/';
import { validate, VALIDATOR_REQUIRE } from '../../../util';
import classes from './edit-user-form.module.css';
import { useUserUseCase, useUploadImage } from '../../../../application';
import { useAuthStorage } from '../../../../services';

type Props = {};

export const EditUserForm: FC<Props> = () => {
  const history = useHistory();
  const { loginUser: user } = useAuthStorage();
  const [imageFile, setImageFile] = useState<File>();
  const { uploadImage } = useUploadImage();
  const [isUpdated, setIsUpdate] = useState(false);
  const { formInputs, updateFormInputs, setFormInputs } = useValidateForm();
  const { updateUser } = useUserUseCase();

  const updateUserHandler = (userData: User) => {
    updateUser(userData);
    setIsUpdate(true);
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!formInputs || !user) {
      return;
    }

    let imageUrl = user.imageUrl;
    if (imageFile) {
      imageUrl = (await uploadImage(imageFile)) || imageUrl;
    }

    const newUser = {
      id: user.id,
      name: formInputs.name.value,
      imageUrl,
      about: formInputs.about ? formInputs.about.value : '',
    };

    updateUserHandler(newUser);
  };

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const formInputsId = 'name';
    const nameValue = e.target.value;
    const nameIsValid = validate(nameValue, [VALIDATOR_REQUIRE()]);

    updateFormInputs(formInputsId, nameValue, nameIsValid);
  };

  const changeAboutHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const formInputsId = 'about';
    const aboutValue = e.target.value;
    const aboutIsValid = validate(aboutValue, []);

    updateFormInputs(formInputsId, aboutValue, aboutIsValid);
  };

  useEffect(() => {
    if (user) {
      const { name, about } = user;

      setFormInputs({
        name: { value: name, isValid: true },
        about: { value: about ? about : '', isValid: true },
        isValid: true,
      });
    }
  }, [user, setFormInputs]);

  useEffect(() => {
    // check if updated or not here in useEffect
    // to avoid memory leak of updateState after component unmount
    if (isUpdated) {
      history.push('/home');
    }
  }, [isUpdated, history]);

  return (
    <form className={classes['edit-user-form']} onSubmit={submitHandler}>
      {user && formInputs && (
        <Fragment>
          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={user.imageUrl}
          />
          <ValidateInput
            onChange={changeNameHandler}
            initialValue={formInputs && formInputs.name.value}
            placeholder="Name"
            className={classes['edit-user-form__name-input']}
            errorMessage="Please input valid name."
          />
          <ValidateTextarea
            onChange={changeAboutHandler}
            placeholder="About"
            value={formInputs && formInputs.about && formInputs.about.value}
          />
          <Buttons>
            <Button
              title="Save"
              className={classes['edit-user-form__button']}
              disabled={!formInputs?.isValid}
            />
          </Buttons>
        </Fragment>
      )}
    </form>
  );
};
