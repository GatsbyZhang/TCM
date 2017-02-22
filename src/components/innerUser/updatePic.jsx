import React from 'react';
import {Upload, Icon, message} from 'antd';

export default class UpdatePic extends React.Component {

     getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

     beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        if (!isJPG) {
            message.error('请上传图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片必须 < 2MB!');
        }
        return isJPG && isLt2M;
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl}));
        }   
    }

    render() {
        const imageUrl = '/static/img/header.png';
        return (
            <Upload
                className="avatar-uploader"
                name="avatar"
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" style={{verticalAlign:"middle"}}/> :
                        <Icon type="plus" className="avatar-uploader-trigger"/>
                }
            </Upload>
        );
    }
}