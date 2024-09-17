import React from 'react'
import PropTypes from "prop-types";
import {Portal} from "../../utils/portal";
import {cn as bem} from '@bem-react/classname';
import 'style.css'

const Modal = (props) => {
  const {
    children,
    onCloseModal = () => {},
    isOpen,
    isMounted,
    isClosing
  } = props

  const cn = bem('Modal')

  const onContentHandler = (e) => {
    e.stopPropagation()
  }

  return (
    <>
      {isOpen &&
        <Portal>
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
                {children}
              </div>
            </div>
          </div>
        </Portal>
      }
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func,
  isOpen: PropTypes.bool,
  isMounted: PropTypes.bool,
  isClosing: PropTypes.bool,
};

export default React.memo(Modal);
