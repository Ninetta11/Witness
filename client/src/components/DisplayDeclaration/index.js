import { Typography } from 'antd';

const { Title, Text } = Typography;

function DisplayDeclaration({ hash, content }) {
    return (
        <div>
            <Text >{hash}</Text>
            <Title level={5}>{content}</Title>
        </div>
    )
}

export default DisplayDeclaration;