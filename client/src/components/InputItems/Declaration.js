import { Form, Input } from 'antd';

const { TextArea } = Input;


function Declaration({
    number,
    value,
    onChange
}) {
    return (
        <Form.Item
            label={number}
            name="content"
            rules={[
                {
                    required: true,
                    message: "Enter your declaration"
                }
            ]}><TextArea
                name="content"
                placeholder="Enter Declaration Here"
                rows={5}
                value={value}
                onChange={onChange} />
        </Form.Item>
    )
}

export default Declaration;