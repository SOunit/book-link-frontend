import { FC } from 'react';
import { ErrorText, Textarea } from '../../atoms';

type Props = {
  onChange: any;
  value?: string;
  className?: string;
  placeholder?: string;
};

export const ValidateTextarea: FC<Props> = ({
  onChange,
  value,
  className,
  placeholder,
}) => {
  return (
    <div className={`${className}`}>
      <Textarea
        onChange={onChange}
        value={value}
        className={className}
        placeholder={placeholder}
      />
      {false && <ErrorText errorMessage="Please input valid message" />}
    </div>
  );
};
