import React, {PropTypes} from 'react';
import { Modal } from 'antd';
import RegisterAdmin from 'components/RegisterAdmin';

export default class AddEditModal extends React.Component {
    onSubmit (administrator) {
        const {fragments, actions, states} = this.props;
        if (states.isEdit) {
            actions.updateAdministratorInfo(states.selectedAdministrator._id, administrator);
        } else {
            actions.addAdministrator(fragments, {...administrator});
        }

    }
    render() {
        const {actions, states} = this.props;
        const {modalVisile, isEdit} = states;
        return (
            <Modal title={!isEdit ? "新增管理员" : "编辑管理员"}
                visible={modalVisile}
                footer={null}
                wrapClassName="vertical-center-modal"
                onCancel={actions.closeModal}
                >
                <RegisterAdmin {...this.props}  onSubmit={::this.onSubmit} />
            </Modal>
        )
    }
}
