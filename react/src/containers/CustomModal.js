import React, { useState } from 'react'

import { Modal } from 'antd';


const CustomModal = props => {
    const [visible, setVisibility] = useState(false);
    const hideModal = () => {
        setVisibility(false);
    }
    const dispatchOk = () => {
        props.onOk()
        if (props.validated !== false) { //if true then hide // if undefined then hide // if false then don't do anything
            hideModal()
        }
    }
    return (
        <div>
            <div onClick={() => setVisibility(true)}>
                {props.clickComponent}
            </div>
            <Modal
                title="Modal"
                visible={visible}
                onOk={dispatchOk}
                onCancel={hideModal}
                okText="OK"
                cancelText="Cancel"
            >
                <p>{props.children}</p>
            </Modal>
        </div>
    )
}
export default CustomModal