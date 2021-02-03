import { useAppContext } from '../../store';

function Document() {
    const [state, appDispatch] = useAppContext();

    return (
        <h1>document</h1>
    )
}

export default Document;