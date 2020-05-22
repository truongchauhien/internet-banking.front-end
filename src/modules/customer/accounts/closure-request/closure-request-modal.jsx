import React from 'react';
import styles from './closure-request-modal.scss';
import Modal from '../../../../commons/components/modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { closureRequestModalOpenStatusChange, closureRequestModalInputChange } from './actions';
import AccountSelector from '../../commons/account-selector/account-selector';
import { thunkedCloseAccount } from './thunks';

export const AccountClosureRequestModal = (props) => {
    const dispatch = useDispatch();
    const { byId: accounts } = useSelector(state => state.customer.accounts);
    const { isModalOpen, closedAccountId, inputs, isFetching } = useSelector(state => state.customer.accounts.closureRequest);

    const handleClickOutsideModal = () => {
        if (isFetching) return;
        dispatch(closureRequestModalOpenStatusChange(false));
    };

    const handleAccountSelectorChange = (accountId) => {
        dispatch(closureRequestModalInputChange({
            name: 'transferredAccountId',
            value: Number.parseInt(accountId)
        }));
    };

    const handleSubmitButtonClick = () => {
        if (!confirm(`Quý khách có chắc chắn muốn đóng tài khoản "${accounts[closedAccountId].accountNumber}" hay không?`)) {
            return;
        }

        dispatch(thunkedCloseAccount({
            closedAccountId: closedAccountId,
            transferredAccountId: inputs.transferredAccountId
        }));
    };

    const handleCancelButtonClick = () => {
        dispatch(closureRequestModalOpenStatusChange(false));
    };

    return (
        <Modal isOpen={isModalOpen} onClickOutside={handleClickOutsideModal}>
            <Modal.Content>
                <div className={styles.closureRequest}>
                    <label>Chọn tài khoản để chuyển toàn bộ số dư:</label>
                    <AccountSelector selectedAccountId={inputs.transferredAccountId ?? ''}
                        onAccountSelect={handleAccountSelectorChange}
                        showedTypes={['CURRENT']}
                        skippedAccountIds={[closedAccountId]}
                    />
                    <button onClick={handleCancelButtonClick}>Hủy bỏ</button>
                    <button onClick={handleSubmitButtonClick}>Đồng ý</button>
                </div>
            </Modal.Content>
        </Modal>
    );
};
