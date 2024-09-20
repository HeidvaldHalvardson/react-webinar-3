import React, {useCallback, useEffect, useRef, useState} from 'react';
import Head from "../head";
import Controls from "../controls";
import PropTypes from "prop-types";
import CartList from "../cart-list";
import {cn as bem} from "@bem-react/classname";
import './style.css'

const CartModal = (props) => {
  const {
    cart,
    cartTotalPrice,
    onCloseModal = () => {},
    onDeleteFromCart = (_) => {},
    isOpen
  } = props

  const cn = bem('CartModal')
  const [isMounted, setIsMounted] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef(null)

  const onCloseHandler = useCallback(() => {
    setIsClosing(true)
    timerRef.current  = setTimeout(() => {
      setIsClosing(false)
      onCloseModal()
    }, 300)
  }, [onCloseModal])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onCloseHandler()
    }
  }, [onCloseModal])

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, setIsMounted, onKeyDown]);

  const onContentHandler = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className={
        cn({
          show: isMounted && !isClosing && 'open',
          unShow: isClosing && 'close'
        })
      }
    >
      <div className={cn('overlay')} onClick={onCloseModal}>
        <div className={cn('content')} onClick={onContentHandler}>
          <Head title="Корзина">
            <Controls onClickHandler={onCloseHandler}>
              Закрыть
            </Controls>
          </Head>
          <div className={cn('list')}>
            {
              cart.length > 0
                ? <CartList
                  cart={cart}
                  onDeleteFromCart={onDeleteFromCart}
                  cartTotalPrice={cartTotalPrice}
                />
                : <p className="CartModal-empty">Ваша корзина пуста</p>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      count: PropTypes.number,
    }),
  ).isRequired,
  cartTotalPrice: PropTypes.number,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteFromCart: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CartModal;
