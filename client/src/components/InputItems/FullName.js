import { Form, Input } from 'antd';


function FullName({
    value,
    onChange,
}) {
    return (
        <Form.Item
            label="Name"
            name="name"
            rules={[
                {
                    type: 'string',
                    required: true,
                    message: "Please enter your recipients name!"
                }
            ]}
        >
            <Input
                name="name"
                placeholder="Name"
                value={value}
                onChange={onChange} />
        </Form.Item>
    )
}

export default FullName;