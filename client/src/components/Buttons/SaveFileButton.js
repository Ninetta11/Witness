import { Button } from 'antd';
import { FilePdfFilled } from '@ant-design/icons';
import { saveToPDF } from '../../utils/documentFunctions';


function SaveFileButton({
    title,
    content
}) {
    const handleFileSave = () => {
        saveToPDF(title, content)
    }
    return (
        <Button
            type="primary"
            icon={<FilePdfFilled />}
            style={{ marginRight: '20px' }}
            onClick={handleFileSave}>
            Save as PDF
        </Button>
    )
}

export default SaveFileButton;