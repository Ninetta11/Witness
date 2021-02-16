import { Form } from 'antd';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import './style.css';

function Address({ googlevalue, setValue }) {
    return (
        <Form.Item
            className="step-input"
            name="address"
            label="Address"
            rules={[
                {
                    required: true,
                    message: 'Please enter your address!',
                },
            ]}
        ><GooglePlacesAutocomplete
                apiKey="AIzaSyCHR4pzxUoksFuNAA1Wkp0Xs7qmdn9wlKI&callback=initAutocomplete&libraries=places&v=weekly"
                selectProps={{
                    googlevalue,
                    onChange: setValue
                }}
                autocompletionRequest={{
                    componentRestrictions: {
                        country: ['aus'],
                    }
                }}
            />
        </Form.Item>
    )
}

export default Address;