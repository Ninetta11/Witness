import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Row, Col, Typography, Image, Button } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;


function Home() {
    return (
        <Layout style={{ backgroundColor: 'white' }}>
            <Content className="content" style={{ marginTop: '100px' }}>
                <Row>
                    <Col span={10} offset={4}>
                        <Title>Catch Phrase Here</Title>
                        <Title level={4}>some smaller text explaining the idea in a succinct way.</Title>
                        <Link to="/login"> <Button type="primary" shape="round" icon={<RightCircleOutlined />} size="large">
                            Create a Stat Dec
                        </Button></Link>
                    </Col>
                    <Col span={6} offset={1}>
                        <Image src='/assets/images/doc.png' />
                    </Col>
                </Row>
            </Content>
        </Layout >
    )
};

export default Home;