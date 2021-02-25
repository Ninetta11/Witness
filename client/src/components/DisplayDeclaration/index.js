import React, { useState } from 'react';
import { Typography, Spin } from 'antd';
import SaveFileButton from '../Buttons/SaveFileButton';
import SendviaEmailButton from '../Buttons/SendviaEmailButton';
import SendDeclaration from '../SendDeclaration';

const { Title, Text, Paragraph } = Typography;


function DisplayDeclaration({ title, hash, content }) {

    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    return (
        <div>
            <Text >Document Title: {title}</Text>
            <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>

            {!content ?
                <div style={{ textAlign: 'center' }}>
                    <Spin size='large'></Spin>
                </div>
                :
                content.split('#').map((section) =>
                    <Paragraph style={{ fontSize: '20px' }}>{section}</Paragraph>)
            }

            < div style={{ textAlign: 'center' }}>
                <SaveFileButton
                    title={title}
                    content={content} />
                <SendviaEmailButton
                    setModalState={setModalState} />
            </div>

            <SendDeclaration
                modalState={modalState}
                setModalState={setModalState}
                title={title}
                hash={hash}
            />
        </div >
    )
}

export default DisplayDeclaration;