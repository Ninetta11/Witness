import { Typography } from 'antd';

const { Title, Text } = Typography;

function DisplayDeclaration({ hash, content }) {
    return (
        <div>
            <Text >Document Hash: {hash}</Text>
            <Title level={2}>Statutory Declaration</Title>
            <Title level={5}>{content}</Title>
        </div>
    )
}

export default DisplayDeclaration;