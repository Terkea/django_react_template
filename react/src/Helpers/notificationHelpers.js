import React from 'react';
import { notification } from 'antd';
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';

const showNotification = (props, notificationKey) => {
    closeNotification(notificationKey);
    const notificationProps = {
        ...props, key: notificationKey
    }
    notification.open(notificationProps);
}

export const clearNotifications = () => {
    notification.destroy();
}

export const closeNotification = (notificationKey) => {
    notification.close(notificationKey);
}


export const runNotifications = (notificationMessage = "", outcome = "") => {
    let notificationProps;
    switch (outcome) {
        case "SUCCESS":
            notificationProps = {
                message: "Success",
                duration: 10,
                icon: <CheckCircleOutlined style={{ color: "green" }} />
            }
            break;
        case "ERROR":
            notificationProps = {
                message: "Error",
                duration: 10,
                icon: <CloseCircleOutlined style={{ color: "red" }} />
            }
            break;
        default:
            notificationProps = {
                duration: 10,
            }
    }
    if (Array.isArray(notificationMessage)) {
        for (let i in notificationMessage) {
            showNotification({ ...notificationProps, description: notificationMessage[i] }, notificationMessage[i]);
        }
    } else {
        showNotification({ ...notificationProps, description: notificationMessage }, notificationMessage);
    }
};
