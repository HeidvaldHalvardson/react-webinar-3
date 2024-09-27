import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ translation, sum = 0, amount = 0, onOpen = () => {} }) {
  const cn = bem('BasketTool');

  const pluralVariants = {
    one: translation['товар'],
    few: translation['товара'],
    many: translation['товаров'],
  }

  return (
    <div className={cn()}>
      <div>
        <span className={cn('label')}>{translation['В корзине']}:</span>
        <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, pluralVariants)} / ${numberFormat(sum)} ₽`
          : `${translation['пусто']}`}
      </span>
        <button onClick={onOpen}>{translation['Перейти']}</button>
      </div>
    </div>
  );
}

BasketTool.propTypes = {
  translation: PropTypes.objectOf(PropTypes.string),
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
