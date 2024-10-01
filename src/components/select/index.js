import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Select({ onChange = (_) => {}, value, options }) {
  const onSelect = e => {
    onChange(e.target.value);
  };

  return (
    <select className="Select" value={value} onChange={onSelect}>
      {options.map(item => (
        <option key={item.value} value={item.value}>
          {item.indent} {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default memo(Select);
