import { ChangeEvent, FC, Fragment, SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCreateItem } from '../../../application';
import { Button } from '../../components/atoms';
import {
  ImageUpload,
  SectionTitle,
  ValidateInput,
} from '../../components/molecules';
import { useAuthStorage } from '../../../services';
import { validate, VALIDATOR_REQUIRE } from '../../util';
import classes from './create-item.module.css';

type Inputs = {
  title: { value: string; isValid: boolean };
  author: { value: string; isValid: boolean };
  isValid: boolean;
};

export const CreateItem: FC = () => {
  const [inputs, setInputs] = useState<Inputs>({
    title: { value: '', isValid: false },
    author: { value: '', isValid: false },
    isValid: false,
  });
  const [imageFile, setImageFile] = useState<File>();
  const history = useHistory();
  const { loginUser } = useAuthStorage();
  const { createItem } = useCreateItem();
  const { title, author } = inputs;

  const getFormIsValid = (inputs: Inputs) => {
    let formIsValid = true;

    for (const value of Object.values(inputs)) {
      if (typeof value === 'object') {
        formIsValid = formIsValid && value.isValid;
      }
    }

    return formIsValid;
  };

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTitle = event.target.value;
    const titleIsValid = validate(inputTitle, [VALIDATOR_REQUIRE()]);

    const formIsValid = getFormIsValid({
      ...inputs,
      title: { ...title, isValid: titleIsValid },
    });

    setInputs((prevState) => ({
      ...prevState,
      title: {
        value: inputTitle,
        isValid: titleIsValid,
      },
      isValid: formIsValid,
    }));
  };

  const changeAuthorHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputAuthor = event.target.value;
    const authorIsValid = validate(inputAuthor, [VALIDATOR_REQUIRE()]);

    const formIsValid = getFormIsValid({
      ...inputs,
      author: { ...author, isValid: authorIsValid },
    });

    setInputs((prevState) => ({
      ...prevState,
      author: {
        value: inputAuthor,
        isValid: authorIsValid,
      },
      isValid: formIsValid,
    }));
  };

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();

    if (!loginUser || !loginUser.Items) {
      return history.push('/users/items/edit');
    }

    createItem(loginUser, title.value, author.value, imageFile);

    history.push('/users/items/edit');
  };

  return (
    <Fragment>
      <SectionTitle>New Item</SectionTitle>
      <form className={classes['create-item__form']} onSubmit={submitHandler}>
        <ValidateInput
          placeholder="Title"
          initialValue={title.value}
          onChange={changeTitleHandler}
          className={classes['create-item__form-input']}
          errorMessage="Please put valid title."
        />
        <ValidateInput
          placeholder="Author"
          initialValue={author.value}
          onChange={changeAuthorHandler}
          className={classes['create-item__form-input']}
          errorMessage="Please put valid Author."
        />
        <ImageUpload setImageFile={setImageFile} imageFile={imageFile} />
        <Button title="Create" disabled={!inputs.isValid} />
      </form>
    </Fragment>
  );
};
