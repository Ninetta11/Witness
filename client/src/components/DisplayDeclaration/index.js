import React, { useState } from 'react';
import { Typography, Button, Space, Spin } from 'antd';
import { FilePdfFilled, SendOutlined } from '@ant-design/icons';
import { saveToPDF } from '../../utils/documentFunctions';
import SendDeclaration from '../SendDeclaration';

const { Title, Text, Paragraph } = Typography;


function DisplayDeclaration({ title, hash, content }) {

    const handleFileSave = () => {
        saveToPDF(title, content)
    }

    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    const showModal = () => {
        setModalState({
            visible: true,
        });
    };

    const handleCancel = () => {
        setModalState({ visible: false });
    };


    return (
        <div>
            <Text >Document Title: {title}</Text>
            <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
            {!content ?
                <div style={{ textAlign: 'center' }}>
                    <Space size='middle'>
                        <Spin size='large'></Spin>
                    </Space>
                </div>
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
                    onClick={showModal}>Send via email</Button>
            </div>

            <SendDeclaration
                modalState={modalState}
                setModalState={setModalState}
                handleCancel={handleCancel}
                title={title}
                hash={hash}
            />
        </div >
    )
}

export default DisplayDeclaration;