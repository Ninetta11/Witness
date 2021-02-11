import { Typography, Button, Divider } from 'antd';
import { FilePdfFilled, SendOutlined } from '@ant-design/icons';
import { saveToPDF } from '../../utils/documentFunctions';

const { Title, Text } = Typography;


function DisplayDeclaration({ title, hash, content }) {

    const handleFileSave = () => {
        saveToPDF(title, content)
    }

    const handleFileSend = () => {

    }

    return (
        <div>
            <Text >Document Title: {title}</Text>
            <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
            {content.split('#').map((section) =>
                <div>
                    <Title level={5}>{section}</Title>
                    <Divider />
                </div>
            )}
            <div style={{ textAlign: 'center' }}>
                <Button
                    type="primary"
                    icon={<FilePdfFilled />}
                    style={{ marginRight: '20px' }}
                    onClick={handleFileSave}>
                    Save as PDF
            </Button>
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleFileSend}>Send via email</Button>
            </div>
        </div>
    )
}

export default DisplayDeclaration;