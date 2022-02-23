import React from 'react';

import { createPortal } from 'react-dom';

export default function ModalComponent(props) {
    const { close, children, display } = props;

    const ele = document.getElementById('modal');
    return createPortal(
        <div onClick={close} className="u-modal">
            {children}
        </div>,
        ele
    );
}
