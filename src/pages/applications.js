import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
 import 'antd/dist/antd.css';
const Applications = () => {

    return <>
        <Input prefix={<SearchOutlined/>} placeholder={'Search'}  size="small"/>
        <br/>
    </>
}

export default Applications;
