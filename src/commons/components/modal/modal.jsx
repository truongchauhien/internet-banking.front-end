import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import styles from './modal.scss';

const rootModal = document.getElementById('root-modal');

export const Modal = ({ isOpen, onClickOutside, children }) => {
    const [modal] = useState(document.createElement('div'));
    const [modalOverlay] = useState(document.createElement('div'));

    // Add modal into root-modal.
    useEffect(() => {
        modal.classList.add(styles.modal);
        modalOverlay.classList.add(styles.modalOverlay);

        rootModal.appendChild(modal);
        rootModal.appendChild(modalOverlay);

        return () => {
            rootModal.removeChild(modal);
            rootModal.removeChild(modalOverlay);
        };
    }, []);

    // Handle show/hide modal.
    useEffect(() => {
        if (isOpen) {
            modal.classList.remove(styles.closed);
            modalOverlay.classList.remove(styles.closed)
        } else {
            modal.classList.add(styles.closed);
            modalOverlay.classList.add(styles.closed);
        }
    }, [isOpen]);

    // Handle click outside modal.
    useEffect(() => {
        const checkClickOutside = (event) => {
            if (modal !== event.target
                && !modal.contains(event.target)
                && isOpen
            ) {
                onClickOutside && onClickOutside();
            }
        };

        document.addEventListener('click', checkClickOutside);

        return () => {
            document.removeEventListener('click', checkClickOutside);
        }
    }, [isOpen]);

    return ReactDOM.createPortal(children, modal);
};

Modal.Content = ({ children }) => {
    return (
        <div className={styles.content}>
            {children}
        </div>
    );
};

Modal.Header = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
};

Modal.Footer = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
};

export default Modal;
