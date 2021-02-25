import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';


function SendviaEmailButton({
    setModalState
}) {
    const showModal = () => {
        setModalState({
            visible: true,
        });
    };

    return (
        <Button
            type="primary"
            icon={<SendOutlined />}
            style={{ marginRight: '20px' }}
            onClick={showModal}>Send via email</Button>
    )
}

export default SendviaEmailButton;