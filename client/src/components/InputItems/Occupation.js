import { Form, Input } from 'antd';


function Occupation({
    value,
    onChange
}) {
    return (
        <Form.Item
            name="occupation"
            label="Occupation"
            rules={[
                {
                    type: 'string',
                    required: true,
                    message: 'Please enter your occupation!',
                },
            ]}
        ><Input
                name="occupation"
                placeholder="Enter your occupation"
                value={value}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default Occupation;