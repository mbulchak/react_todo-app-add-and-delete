import cn from 'classnames';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Errors } from '../../types/Errors';

type Props = {
  errorMessage: string;
  setErrorMessage: Dispatch<SetStateAction<string>>;
};

export const ErrorNotification: React.FC<Props> = ({
  errorMessage,
  setErrorMessage,
}) => {
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => setErrorMessage(Errors.DEFAULT), 3000);
    }
  }, [setErrorMessage, errorMessage]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn('notification is-danger is-light has-text-weight-normal', {
        hidden: !errorMessage,
      })}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={() => setErrorMessage('')}
      />
      {/* show only one message at a time */}
      {errorMessage}
    </div>
  );
};
