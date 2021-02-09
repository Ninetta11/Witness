import { Typography, Divider } from 'antd';
import { useState, useEffect } from 'react';

const { Title, Text } = Typography;

function DisplayDeclaration({ hash, content }) {
    return (
        <div>
            <Text >Document Hash: {hash}</Text>
            <Title level={2} style={{ textAlign: 'center', paddingBottom: '25px' }}>Statutory Declaration</Title>
            {content.split('#').map((section) =>
                <div>
                    <Title level={5}>{section}</Title>
                    <Divider />
                </div>
            )}
        </div>
    )
}

export default DisplayDeclaration;