import { Fragment, useContext, useState, useCallback, useEffect} from 'react';
import Modal from '../components/Modal';
import { AppContext } from '../../context';

export const useConfirmModal = function () {
    const { modals, dispatchModal } = useContext(AppContext);
    const show = () => {
      dispatchModal({ type: 'push', modal: 'confirm_modal' });
    };
    const close = () => {
      dispatchModal({ type: 'pop' });
    };
    const isConfirmModalLive = modals.length > 0 && modals[0] === 'confirm_modal';
    return {
      show,
      close,
      isConfirmModalLive
    };
  };

export default function ConfirmModal(props) {
    const { removeClick } = props;
    const { close } = useConfirmModal();

    const modalClose = e => {
        close();
    };   
    
    return (
        <Modal>
            <div className="panel">
                <div className='wrapper'>
                    <div className='wrapper_content'>
                        <Fragment>
                        <div className="content">
                            削除してもよろしいですか？
                        </div>
                        <div className="footer">
                            <button className='c-btn sm' onClick={removeClick}>はい</button>
                            <button className='c-btn sm' onClick={modalClose}>いいえ</button>
                        </div>
                        </Fragment>
                    </div>
                </div>
            </div>
        </Modal>
    );    
}