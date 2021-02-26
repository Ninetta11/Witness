import { Form, Input } from 'antd';

function DocumentTitle({
    value,
    onChange,
    rules
}) {
    return (
        < Form.Item
            label="Save As:"
            name="title"
            rules={rules}><Input
                style={{ width: 250 }}
                name="title"
                placeholder="Enter a Title"
                value={value}
                onChange={onChange} />
        </Form.Item>
    )
}

export default DocumentTitle;