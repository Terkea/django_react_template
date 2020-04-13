import React, { useState } from 'react'

import { Modal, Row, Col } from 'antd';
import { Fragment } from 'react';


const CustomModal = props => {
    const [visible, setVisibility] = useState(false);
    const hideModal = () => {
        setVisibility(false);
    }

    const onFinish = () => {
        console.log('button clicked')
    }

    const onFail = () => {
        console.log('button clicked')
    }

    return (
        <Row>
            <Col onClick={() => setVisibility(true)}>
                {props.clickComponent}
            </Col>
            <Col>
                <Modal
                    title="Modal"
                    visible={visible}
                    onOk={onFinish}
                    onCancel={onFail}
                    okText="OK"
                    cancelText="Cancel"
                >
                    {props.children}
                </Modal>
            </Col>
        </Row>
    )
}
export default CustomModal