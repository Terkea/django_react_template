import React from 'react'
import { connect } from 'react-redux';
import { Modal, Row, Col } from 'antd';
import * as actions from '../store/actions/userInterface';


class CustomModal extends React.Component {
    componentDidMount() {
        this.props.addModal(this.props.id)
    }

    getVisibilityForSelf = (modalArray) => {
        let visibility;
        modalArray.map(modal => {
            const { id, visible } = modal;
            if (id === this.props.id) {
                visibility = visible;
            }
        })
        return visibility;
    }

    componentWillUnmount() {
        this.props.deleteModal(this.props.id);
    }

    render() {
        return (
            <Row>
                <Col
                    onClick={() => this.props.show(this.props.id)}
                >
                    {this.props.clickComponent}
                </Col>
                <Col>
                    <Modal
                        title={this.props.title}
                        visible={this.getVisibilityForSelf(this.props.modalArray)}
                        footer={null}
                        onCancel={() => this.props.hide(this.props.id)}
                    >
                        {this.props.children}
                    </Modal>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalArray: state.userInterface.Modal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addModal: (id) => dispatch(actions.addModal(id)),
        deleteModal: (id) => dispatch(actions.deleteModal(id)),
        show: (id) => dispatch(actions.showModal(id)),
        hide: (id) => dispatch(actions.hideModal(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
