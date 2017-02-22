/*
 * 个人信息
 * */
import React, {Component, PropTypes} from 'react'
import {Modal,Row, Col, Button} from 'antd'
import severRoot from 'CONSTANTS'
import './person.scss';

export  default class Person extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personIsShow: false,
        }
    }
    changeVisible(){
        this.setState({
            personIsShow:!this.state.personIsShow
        })
    }
    handleCancel() {
       this.changeVisible();
    }


    showSelectPic() {
        this.changeVisible();
    }
    render() {
        const imageUrl = severRoot + sessionStorage.UHeadImg;
        const preImgUrl=this.props.header.preImgUrl;
        return (
            <div className="set-person">
                <div className="person-top clearfix">
                    <div className="img left">
                        <div  style={{width:'100px',height:'100px'}}
                            className="avatar-uploader"
                           
                            name="avatar" onClick={this.showSelectPic.bind(this)}>
                            {
                                preImgUrl ? <img  src={preImgUrl}/> : <img src={imageUrl} className="avatar"/>
                            }
                        </div>
                        用户头像
                    </div>
                    <div className="info left">
                        <p>姓名：{sessionStorage.UName}</p>
                        <p>电话：{sessionStorage.UPhone}</p>
                        <p>创建时间：{sessionStorage.RegisterTime}</p>
                        <p>累计在线时长：{sessionStorage.OnlineTime}(小时)</p>
                    </div>
                </div>
                <Modal title="头像上传" visible={this.state.personIsShow} footer={false}
                        onCancel={this.handleCancel.bind(this)}
                       width="980px">
                   <SelectUploadPic {...this.props} changeVisible={this.changeVisible.bind(this)}/>
                </Modal>
            </div>
        )
    }
}


class SelectUploadPic extends Component {
    componentDidMount() {
        $('.image-editor').cropit({
            imageBackground: true,
        });
        $('.rotate-cw').click(function () {
            $('.image-editor').cropit('rotateCW');
        });
        $('.rotate-ccw').click(function () {
            $('.image-editor').cropit('rotateCCW');
        });

        $('.export').click(function () {
            var imageData = $('.image-editor').cropit('export');
            this.props.actions.getPreViewPic(imageData);
           this.props.changeVisible();
           
        }.bind(this));
    }
    render() {
        return <div id="upload-pic">
            <div className="image-editor">
                <Row>
                    <div style={{width: '250px', margin: '0 auto', padding: '25px'}}>
                      
                        <input type="file" className="cropit-image-input" />
                    </div>
                    <div className="cropit-preview">
                        <div className="cropit-preview-background-container">
                            <img className="cropit-preview-background" />
                        </div>
                        <div className="cropit-preview-image-container">
                            <img className="cropit-preview-image" />
                        </div>
                    </div>
                </Row>
                <Row style={{width: '60%', margin: '0 auto'}}>
                    <div className="image-size-label">
                        图片缩放
                    </div>
                    <input type="range" className="cropit-image-zoom-input"/>
                </Row>
                <Row style={{width: '250px', margin: '0 auto'}}>
                    <Button type="primary" className="rotate-ccw" style={{margin: '0 20px 0 0 '}}>逆时针旋转</Button>
                    <Button type="primary" className="rotate-cw">顺时针旋转</Button>
                </Row>
            </div>
                <Row>
                    <Col span={20}>

                    </Col>
                    <Col span={4}>
                        <Button className="export" type="primary">确定</Button>
                    </Col>
                </Row>
        </div>
    }
}

