import React from 'react';
import { fetchFamily, deleteFamily } from "../../../store/actions/index";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {Props, State, Columns} from './types';
import {Table, Space, Button} from 'antd';
import {RouteComponentProps} from "react-router";

class Familylist extends React.Component<Props & RouteComponentProps, State> {
    actionColumn: any =   {
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
            <Space size="middle">
                <Button onClick={() => this.onAddMembers(record)}>Add Members</Button>
                <Button onClick={() => this.onDelete(record)}>Delete</Button>
            </Space>
        ),
    };
    constructor(props: any){
        super(props);
        this.state = {
            columns: [...Columns, this.actionColumn]
        }
    }

    componentDidMount(){
        this.props.fetchFamily();
    }

    onAddMembers = (record: any) => {
        let obj: any = {};
        obj = {...record}
        this.props.history.push({
            pathname: '/add',
            state: obj
        })
    }

    onDelete = (record: any) => {
        this.props.deleteFamily({id: record._id});
    }

    onAdd = () => {
        this.props.history.push({
            pathname: '/add'
        })
    }

    render() {
        const {family} =  this.props.data;
        return (
            <div style={{margin:'2% 50% 0% 5%'}}>
                <div style={{display: 'flex'}}>
                    <h1>Family List</h1>
                    <Button key="create"
                            type="primary"
                            style={{marginLeft: 'auto', marginTop: 10}}
                            onClick={this.onAdd}>Create</Button>
                </div>
                <Table dataSource={family}
                       pagination={false}
                       rowKey={(record: any) => record.id}
                       columns={this.state.columns} />
            </div>
        );
    }
}

const structuredSelector = createStructuredSelector({
    data: (state: any) => state.family
});

const mapDispatchToProps = { fetchFamily, deleteFamily };

export default connect(structuredSelector, mapDispatchToProps)(Familylist);