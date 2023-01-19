/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import modalStyles from './styles.module.scss'

function ModalContent({ children, closeHandler }) {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler()
      }
    }

    document.addEventListener('keydown', listenerHandler)

    return () => {
      document.removeEventListener('keydown', listenerHandler)
    }
  }, [closeHandler])

  return (
    <div className={modalStyles.modalContent}>
      <svg onClick={closeHandler} className={modalStyles.close} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
        <path fillRule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
      </svg>
      {children}
    </div>
  )
}

export function Modal({ closeHandler, isOpen, children }) {
  if (!isOpen) return null

  const clickHendler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return (
    createPortal(
      <div onClick={clickHendler} className={modalStyles.modalWr}>
        <ModalContent closeHandler={closeHandler}>
          {children}
        </ModalContent>
      </div>,
      document.getElementById('modal-root'),
    ))
}
