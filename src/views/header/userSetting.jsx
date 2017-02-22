import React, {Component, PropTypes} from 'react'
import {Modal, Tabs, Icon,} from 'antd'
const TabPane = Tabs.TabPane
import Person from './person'
import UpdatePwd from './updatePwd'
import UserOption from './userOption'
export  default class UserSetting extends Component {
    onOk() {
        let that = this;
        this.props.changeState({visible: false});
        let imageData = this.props.header.preImgUrl;
        if (imageData) {
            imageData = imageData.split(',')[1];
            imageData = window.atob(imageData);
            var ia = new Uint8Array(imageData.length);
            for (var i = 0; i < imageData.length; i++) {
                ia[i] = imageData.charCodeAt(i);
            }
            //canvas.toDataURL 返回的默认格式就是 image/png
            var blob = new Blob([ia], {type: "image/png"});
            let formData = new FormData();
            formData.append("UserId", sessionStorage.UserId);
            formData.append("TYPE", 1);
            formData.append("file", blob,'blob.png');
            formData.append("filePath", imageData);
            fetch(`http://192.168.1.67:8889/FileUploadManage/UploadFile`,
                {
                    method: 'POST',
                    body: formData,
                    mode: 'on-cors',
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                }
            ).then((json) => {
                    if (json.status == '1000') {
                        sessionStorage.UHeadImg=json.resultData.filePath;
                    }
                    else {
                        message.info(json.messages)
                    }
                }
            ).catch((error) => {
                    console.error(error);
                }
            );
        }
    }


    onCancel() {
        this.props.changeState({visible: false})
        this.props.actions.clearPreImgUrl();
    }

    render() {
        return (
            <div id="user-setting">
                <Modal className = "user-modal"
                    title="用户中心"
                    style={{top: 20}}
                    visible={this.props.visible}
                    onOk={() => this.onOk()}
                    onCancel={() => this.onCancel()}
                >
                   <div className="user-menu">
                       <Tabs type="card">
                           <TabPane tab={<span><Icon type="appstore" />个人信息</span>} key="1">
                               <Person  {...this.props}/>
                           </TabPane>
                           <TabPane tab={<span><Icon type="video-camera" />修改密码</span>} key="2">
                               <UpdatePwd/>
                           </TabPane>
                           <TabPane tab={<span><Icon type="setting" />操作记录表</span>} key="3">
                               <UserOption/>
                           </TabPane>
                       </Tabs>
                   </div>
                </Modal>
            </div>
        )
    }
}
