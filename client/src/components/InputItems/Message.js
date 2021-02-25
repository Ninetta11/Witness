import { Form, Input } from 'antd';

const { TextArea } = Input;

function Message({
    label,
    value,
    onChange
}) {
    return (
        <Form.Item label={label} name="message">
            <TextArea
                name="message"
                style={{ width: 500 }}
                row={5}
                value={value}
                onChange={onChange} />
        </Form.Item>

    )
}

export default Message;