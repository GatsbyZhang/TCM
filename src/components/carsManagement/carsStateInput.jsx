import React from 'react';
import {Form, Input, Select, Button} from 'antd';

export default class CarsStateInput extends React.Component {
    handleStateChange() {
        
    }
    render() {
        let state=this.props.carsDetail.carState
        return (
            <span>
        <Select
            defaultValue={state}
            onChange={this.handleStateChange}
        >
          <Option value="故障">故障</Option>
          <Option value="空闲">空闲</Option>
          <Option value="工作">工作</Option>
        </Select>
      </span>
        );
    }
}