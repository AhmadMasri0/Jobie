import {Divider, Input, Modal, Select, Space, Typography} from "antd";
import classes from "../pages/settings.module.css";

const EditingPhone = props => {
    return <Modal
        title="Editing phone number"
        visible={props.visibleEditingPhone}
        onOk={props.handleOk}
        // confirmLoading={confirmLoading}
        onCancel={props.handleCancel}
    >
        <Select
            style={{width: '200px'}}
            placeholder="Choose a type"
            // value={props.typeHandle}
            dropdownRender={menu => (
                <>
                    {menu}
                    <Divider style={{margin: '8px 0'}}/>
                    <Space align="center" style={{padding: '0 8px 4px'}}>
                        <Input placeholder="Enter a new type" value={props.name} onChange={props.onNameChange}/>
                        <Typography.Link onClick={props.addItem} style={{fontSize: '10px', whiteSpace: 'nowrap'}}>
                            Add type
                        </Typography.Link>
                    </Space>
                </>
            )}
        >
            {props.items.map(item => (
                <Select.Option key={item}>{item}</Select.Option>
            ))}
        </Select>
        <Input pattern={'^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$'} controls={false}
               className={classes.customPhone} defaultValue={''} value={props.editingPhone.value}/>
    </Modal>
}

export default EditingPhone;
