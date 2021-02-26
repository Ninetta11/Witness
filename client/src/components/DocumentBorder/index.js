import { Card } from 'antd';
import './style.css';


function DocumentBorder(props) {
    return (
        <div className="site-card-border-less-wrapper" >
            <Card title={props.title} {...props} style={{ border: '1px solid #a5a4a4' }} headStyle={{ color: 'white', fontSize: '20px', backgroundColor: props.colour }} bodyStyle={{ backgroundColor: '#f5f5f5' }} />
        </div>
    )
}

export default DocumentBorder;