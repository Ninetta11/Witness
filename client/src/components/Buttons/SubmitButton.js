import { Form, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';

function SubmitButton({
    text
}) {
    return (
        <Form.Item
            name="Submit">
            <Button
                type="primary"
                shape="round"
                icon={<SendOutlined />}
                htmlType="submit" >{text}</Button>
        </Form.Item>
    )
}

export default SubmitButton;