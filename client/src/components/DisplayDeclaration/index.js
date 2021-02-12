import { Typography, Button, Space, Spin } from 'antd';
import { FilePdfFilled, SendOutlined } from '@ant-design/icons';
import { saveToPDF } from '../../utils/documentFunctions';

const { Title, Text, Paragraph } = Typography;


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
            {!content ?
                <Space size='middle'>
                    <Spin size='large'></Spin>
                </Space>
                :
                content.split('#').map((section) =>
                    <Paragraph style={{ fontSize: '20px' }}>{section}</Paragraph>)
            }
            < div style={{ textAlign: 'center' }}>
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
        </div >
    )
}

export default DisplayDeclaration;