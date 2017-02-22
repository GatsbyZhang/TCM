import React from 'react';
import {Form, Input, Select, Button} from 'antd';

export default class IdentStateInput extends React.Component {
    handleStateChange() {
        
    }
    render() {
        const { carMngTodos } = this.props;
        let state = this.props.carsDetail.identState;
        return (
            <span>
        <Select
            defaultValue={state}
            onChange={this.handleStateChange}
        >
          <Option value="已认证">已认证</Option>
          <Option value="审核中">审核中</Option>
          <Option value="未提交">未提交</Option>
        </Select>
      </span>
        );
    }
}