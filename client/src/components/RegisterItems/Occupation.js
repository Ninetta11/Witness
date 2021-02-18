import { Form, Input } from 'antd';


function Occupation({
    registerState,
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
                value={registerState.occupation}
                onChange={onChange}
            />
        </Form.Item>
    )
}

export default Occupation;