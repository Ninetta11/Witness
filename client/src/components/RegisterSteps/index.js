import FirstName from '../InputItems/FirstName';
import LastName from '../InputItems/LastName';
import Address from '../InputItems/Address';
import Occupation from '../InputItems/Occupation';
import Email from '../InputItems/Email';
import Password from '../InputItems/Password';
import PasswordConfirm from '../InputItems/PasswordConfirm';


function RegisterSteps({
    step,
    googlevalue,
    setValue,
    registerState,
    onChange
}) {
    switch (step) {
        case "First Name":
            return (
                <FirstName
                    value={registerState.first_name}
                    onChange={onChange} />
            )
        case "Last Name":
            return (
                <LastName
                    value={registerState.last_name}
                    onChange={onChange} />
            )
        case "Address":
            return (
                <Address
                    googlevalue={googlevalue}
                    setValue={setValue} />
            )
        case "Occupation":
            return (
                <Occupation
                    value={registerState.occupation}
                    onChange={onChange} />
            )
        case "Email":
            return (
                <Email
                    value={registerState.email}
                    onChange={onChange} />
            )
        case "Password":
            return (
                <div>
                    <Password
                        value={registerState.password}
                        onChange={onChange}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a valid password'
                            },
                            {
                                pattern: '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()-]).{8,}$',
                                message: 'Your password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
                            }
                        ]}
                    />
                    <PasswordConfirm />
                </div>
            )
    }
}

export default RegisterSteps;