/**
 * 主页
 */
import React, {Component, PropTypes} from 'react'
import Header from 'VIEW/Header'
import Menu from 'VIEW/Menu'
import Main from 'VIEW/Main'
import Foot from 'VIEW/foot'
import Search from 'VIEW/Search'

export default class IndexMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false
        }
    }
    changeSearch(){
        this.setState({
            showSearch:!this.state.showSearch,
        })
    }
    render() {
        if (this.state.showSearch) {
            return (
                <div className="index-main">
                    <Header changeSearch={this.changeSearch.bind(this)}/>
                    <div id="body" className="clearfix">
                        <Search changeSearch={this.changeSearch.bind(this)}/>
                    </div>
                    <Foot/>
                </div>)
        } else {
            return (

                <div className="index-main">
                    <Header changeSearch={this.changeSearch.bind(this)}/>
                    <div id="body" className="clearfix">
                        <Menu/>
                        <Main/>
                    </div>
                    <Foot/>
                </div>
            )
        }
    }
}
