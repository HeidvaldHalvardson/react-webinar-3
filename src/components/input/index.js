import { memo, useCallback, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import debounce from 'lodash.debounce';

import './style.css';

function Input({ onChange = (_, __) => {}, type = 'text', theme = '', name, value: propValue, placeholder }) {
  // Внутренний стейт для быстрого отображения ввода
  const [value, setValue] = useState(propValue);

  const onChangeDebounce = useCallback(
    debounce(value => onChange(value, name), 600),
    [onChange, name],
  );

  // Обработчик изменений в поле
  const onChangeHandler = event => {
    setValue(event.target.value);
    onChangeDebounce(event.target.value);
  };

  // Обновление стейта, если передан новый value
  useLayoutEffect(() => setValue(propValue), [propValue]);

  const cn = bem('Input');
  return (
    <input
      className={cn({ theme: theme })}
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
    />
  );
}

Input.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  theme: PropTypes.string,
};

export default memo(Input);
