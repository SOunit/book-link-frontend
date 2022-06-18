export const VALIDATOR_TYPE_REQUIRE = 'VALIDATOR_TYPE_REQUIRE';

export type validator = {
  type: string;
  value?: string;
};

export const VALIDATOR_REQUIRE = (): validator => ({
  type: VALIDATOR_TYPE_REQUIRE,
});

export const validate = (value: string, validators: validator[]) => {
  let isValid = true;

  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE: {
        isValid = isValid && value.trim().length > 0;
        break;
      }
      default:
        break;
    }
  }

  return isValid;
};
