import DayJS from 'react-dayjs';
import { Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useAppContext } from '../../store';
import { getLocation } from '../../utils/geocodingAPI';

const { Text, Paragraph } = Typography;


function DeclaredAt({
    value,
    currentState,
    setCurrentState
}) {
    const [state] = useAppContext();

    useEffect(() => {
        getCurrentLocation()
    }, []);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            const address = state.user.address.split(' ');
            let location = address[3] + ', ' + address[4];
            setCurrentState({ ...currentState, location });
        }
    }

    const showPosition = (position) => {
        getLocation(position.coords.latitude, position.coords.longitude)
            .then((location) => {
                setCurrentState({ ...currentState, location });
            }).catch((error) => {
                const address = state.user.address.split(' ');
                let location = address[3] + ', ' + address[4];
                setCurrentState({ ...currentState, location });
            })
    }

    const changeLocation = (value) => {
        setCurrentState({ ...currentState, location: value });
    };

    return (
        <Input.Group compact>
            <Text strong>Declared at  *</Text><Paragraph strong
                value={value}
                editable={{ onChange: changeLocation }}>
                {value}
            </Paragraph><Text strong> , on {<DayJS format="DD MMMM YYYY, h:mm A.">{Date.now()}</DayJS>}</Text>
        </Input.Group>
    )
}

export default DeclaredAt;