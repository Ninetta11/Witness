import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

function CloseButton({
    setState
}) {
    const handleCloseMessage = () => {
        let alerts = '';
        setState({ alerts });
    }

    return (
        <Button
            type="primary"
            icon={<CloseOutlined />}
            onClick={handleCloseMessage}>Close</Button>
    )
}

export default CloseButton;