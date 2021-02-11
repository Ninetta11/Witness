import { Link } from "react-router-dom";
import { Layout, Row, Col, Typography, Image, Button } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import './style.css'

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;


function Home() {
    return (
        <Layout className="content" style={{ backgroundColor: 'white' }}>
            <Content style={{ marginTop: '80px' }}>
                <Row>
                    <Col span={10} offset={4}>
                        <Title>Eliminate physical documents and replace in-person verification with Blockchain technology.</Title>
                        <div style={{ marginBottom: '80px' }}>
                            <Link to="/login"><Button type="primary" shape="round" icon={<RightCircleOutlined />} size="large" >
                                Create a Statutory Declaration today
                        </Button></Link>
                        </div>
                    </Col>
                    <Col span={6} offset={1}>
                        <Image src='/assets/images/doc.png' style={{ marginBottom: '50px' }} />
                    </Col>
                </Row>
                <Row >
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 15 }} lg={{ span: 15 }} style={{ backgroundColor: "#3939" }}>
                        <div style={{ margin: '75px', fontSize: '18px' }}>
                            <Row>
                                <Col span={3}>
                                    <Image src='/assets/images/pen.png' height='50px' width='50px' />
                                </Col>
                                <Col span={21} >
                                    <Title level={3} >What does Witness do?</Title>
                                    <Paragraph>Witness allows you to create a Statutory Declaration in seconds, instantaneously saving it to the IOTA blockchain creating an immutable record that cannot be doctored, deleted or edited, eliminating the need for a certified witness. </Paragraph>

                                </Col>
                            </Row>
                            <Row>
                                <Col span={3}>
                                    <Image src='/assets/images/pen.png' height='50px' width='50px' />
                                </Col>
                                <Col span={21}>
                                    <Title level={3}>How does it work?</Title>
                                    <Paragraph>Sign up and click on the 'Create a Document' link from your dashboard. Fill in the declaration and Witness will use your registered details and the declaration you have made to generate a legal statutory declaration which is immediately sent to the IOTA blockchain. Then simply download the PDF document for your records, send it via email, or log out resting assured that you can view it whenever you like on your dashboard. </Paragraph>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={3}>
                                    <Image src='/assets/images/pen.png' height='50px' width='50px' />
                                </Col>
                                <Col span={21}>
                                    <Title level={3}>How much does it cost?</Title>
                                    <Paragraph>Nothing. The IOTA blockchain does not charge any fees for utilising its distributed ledger.</Paragraph>

                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 9 }} lg={{ span: 9 }} style={{ backgroundColor: '#AA3939' }}>
                        <div style={{ margin: '75px', fontSize: '18px' }}>
                            <Image src='/assets/images/iotalogo.svg' style={{ marginBottom: '25px' }} /><br></br>
                            <Paragraph style={{ color: 'white' }}>IOTA is the first distributed ledger built for the “Internet of Everything” - a network for exchanging value and data between humans and machines.</Paragraph>
                            <Paragraph style={{ color: 'white' }}>The IOTA network is built for the Internet of Things, with tamper-proof data, feeless micro transactions and low resource requirements</Paragraph>
                            <Paragraph style={{ color: 'white' }}>The Tangle is IOTA's network. It immutably records the exchange of data and value. It ensures that the information is trustworthy and cannot be tampered with nor destroyed.</Paragraph>
                            <Link to='iota.org'><Paragraph style={{ color: 'white', fontSize: '25px' }}>iota.org</Paragraph></Link>
                        </div>
                    </Col>
                </Row>
            </Content>
            <Footer style={{
                textAlign: 'center', fontSize: '10px', width: "100%",
            }}>
                <h2>Witness ©2021 Created by Nina Welsh</h2>
            </Footer>
        </Layout >
    )
};

export default Home;