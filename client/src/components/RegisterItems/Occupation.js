import { Form, Select } from 'antd';
import occupations from '../../data/occupationlist.json';
import './style.css';

const { Option } = Select;


function Occupation({
    onSelect
}) {
    return (
        <Form.Item
            className='step-input'
            name="occupation"
            label="Occupation"
            rules={[
                {
                    required: true,
                    message: 'Please select your occupation!',
                },
            ]}
        ><Select
            showSearch
            labelInValue
            name="occupation"
            placeholder="Select an occupation"
            onChange={onSelect}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                {occupations.map(occupation =>
                    <Option value={occupation} key={occupation}>{occupation}</Option>
                )}
            </Select>
        </Form.Item>
    )
}

export default Occupation;