import { Form, AutoComplete } from 'antd';

const { Option } = AutoComplete;


function Signature({
    value,
    currentState,
    setCurrentState,
    rules
}) {
    const onSelect = (value) => {
        setCurrentState({ ...currentState, signature: value });
    };

    return (
        <Form.Item
            label="Signature:"
            name="signature"
            rules={rules}>
            <AutoComplete
                name="signature"
                style={{ width: 250 }}
                placeholder="Sign here"
                onChange={onSelect}
            ><Option value={value}>
                    {value}
                </Option>
            </AutoComplete>
        </Form.Item>
    )
}

export default Signature;