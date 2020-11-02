import React, { FC, ChangeEvent } from 'react';
import { FieldPropsFromRedux } from '../../containers/components/Field';

const Field: FC<FieldPropsFromRedux> = ({
  type,
  placeholder,
  name,
  value,
  changeValue,
  cssClass,
  autofocus,
}) => {
  let field;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeValue(event.target.value);
  };

  switch (type) {
    case 'textarea':
      field = (
        <div className={cssClass}>
          <textarea
            id="outlined-textarea"
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={inputChangeHandler}
            maxLength={150}></textarea>
          <span>{typeof value === 'string' ? value.length : ''}</span>
          <span>/150</span>
        </div>
      );
      break;

    case 'search':
      field = (
        <input
          autoFocus={autofocus}
          autoComplete="off"
          placeholder={placeholder}
          className={cssClass}
          name={name}
          onChange={(event) => changeValue(event.target.value)}
          value={value}
        />
      );
      break;

    case 'password':
      field = (
        <input
          className={cssClass}
          type="password"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={inputChangeHandler}
        />
      );
      break;
    default:
      field = (
        <input
          autoFocus={autofocus}
          className={cssClass}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={inputChangeHandler}
        />
      );
  }

  return <>{field}</>;
};

export default Field;
