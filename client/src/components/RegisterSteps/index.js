import FirstName from '../RegisterItems/FirstName';
import LastName from '../RegisterItems/LastName';
import Address from '../RegisterItems/Address';
import Occupation from '../RegisterItems/Occupation';
import Email from '../RegisterItems/Email';
import Password from '../RegisterItems/Password';


function RegisterSteps({
    step,
    googlevalue,
    setValue,
    registerState,
    onChange,
    onSelect
}) {
    switch (step) {
        case "First Name":
            return (
                <FirstName
                    registerState={registerState}
                    onChange={onChange} />
            )
        case "Last Name":
            return (
                <LastName
                    registerState={registerState}
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
                    onSelect={onSelect} />
            )
        case "Email":
            return (
                <Email
                    registerState={registerState}
                    onChange={onChange} />
            )
        case "Password":
            return (
                <Password
                    registerState={registerState}
                    onChange={onChange} />
            )
    }
}

export default RegisterSteps;