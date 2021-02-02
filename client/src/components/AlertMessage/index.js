import { Alert } from 'antd';

function AlertMessage({
    type,
    message
}) {
    return (
        <Alert
            message={message}
            type={type}
            showIcon
        />
    )
}

export default AlertMessage;