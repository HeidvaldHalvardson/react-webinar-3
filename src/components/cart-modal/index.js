import React, {useCallback, useEffect, useRef, useState} from 'react';
import Modal from "../modal";
import Head from "../head";
import Controls from "../controls";
import PropTypes from "prop-types";
import CartList from "../cart-list";
import './style.css'

const CartModal = (props) => {
  const {
    cart,
    onCloseModal = () => {},
    onDeleteFromCart = (_) => {},
    isOpen
  } = props

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

  return (
    <Modal
      onCloseModal={onCloseHandler}
      isOpen={isOpen}
      isMounted={isMounted}
      isClosing={isClosing}
    >
      <Head title="Корзина">
        <Controls onClickHandler={onCloseHandler} >
          Закрыть
        </Controls>
      </Head>
      <div className="CartModal">
        {
          cart.length > 0
          ? <CartList cart={cart} onDeleteFromCart={onDeleteFromCart} />
          : <p className="CartModal-empty">Ваша корзина пуста</p>
        }
      </div>
    </Modal>
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
  onCloseModal: PropTypes.func.isRequired,
  onDeleteFromCart: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default CartModal;
