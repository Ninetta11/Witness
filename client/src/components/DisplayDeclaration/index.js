import React, { useState } from 'react';
import { Typography, Spin } from 'antd';
import DocumentBorder from '../DocumentBorder';
import SaveFileButton from '../Buttons/SaveFileButton';
import SendviaEmailButton from '../Buttons/SendviaEmailButton';
import SendDeclaration from '../SendDeclaration';

const { Paragraph } = Typography;


function DisplayDeclaration({ title, hash, content }) {

    const [modalState, setModalState] = useState({
        loading: false,
        visible: false,
    })

    return (
        <DocumentBorder
            title={'Statutory Declaration - ' + title}
            colour='#1890ff' >

            {!content ?
                <div style={{ textAlign: 'center' }}>
                    <Spin size='large'></Spin>
                </div>
                :
                content.split('#').map((section) =>
                    <Paragraph style={{ fontSize: '16px' }}>{section}</Paragraph>)
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
        </DocumentBorder>
    )
}

export default DisplayDeclaration;