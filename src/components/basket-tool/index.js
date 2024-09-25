import { memo } from 'react';
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import { useLanguage } from "../../translations";
import './style.css';

function BasketTool({ sum = 0, amount = 0, onOpen = () => {} }) {
  const cn = bem('BasketTool');
  const { translation } = useLanguage();
  const { itemId } = useParams();

  const pluralVariants = {
    one: translation['товар'],
    few: translation['товара'],
    many: translation['товаров'],
  }

  return (
    <div className={cn()}>
      <div>
        {itemId && <Link to={`/`}>{translation['Главная'].toString()}</Link>}
      </div>
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
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
