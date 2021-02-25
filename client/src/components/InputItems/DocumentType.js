import { Form, Select } from 'antd';

const { Option } = Select;


function DocumentType({
    setState
}) {
    const onSelect = (value) => {
        setState({ document_type: value });
    };

    return (
        <Form.Item label="Type:" name="document_type">
            <Select style={{ width: 500 }} defaultValue="Select a Document Type" onChange={onSelect}>
                <Option value="Certification of Injury or Illness">Certification of Injury or Illness</Option>
                <Option value="Certification of Injury/Illness/Death of Family Member">Certification of Injury/Illness/Death of Family Member</Option>
                <Option value="Confirmation of Personal Details">Confirmation of Personal Details</Option>
                <Option value="Confirmation of Financial Expenditure">Confirmation of Financial Expenditure</Option>
                <Option value="Statement as Witness to Event">Statement as Witness to Event</Option>
                <Option value="Statement as to Involvement in an Event">Statement as to Involvement in an Event</Option>
                <Option value="Contractual Agreement">Contractual Agreement</Option>
                <Option value="Other">Other</Option>
            </Select>
        </Form.Item>
    )
}

export default DocumentType;