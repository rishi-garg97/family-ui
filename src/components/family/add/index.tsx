import React from 'react';
import {Input, Radio, Button} from 'antd';
import {Props, State} from './types';
import {RouteComponentProps} from "react-router";
import {addFamily, updateFamily} from "../../../store/actions/index";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import _ from 'lodash';
import {Tree, TreeNode} from "react-organizational-chart";
import NewMember from "../modal/index";


class AddFamily extends React.Component<Props & RouteComponentProps, State> {
    mode: string = 'add';
    count: number = 1;
    id: string = '';
    selectedMemberKey: string = '';

    constructor(props: any) {
        super(props);
        this.state = {
            config: {
                familyName: '',
                gender: 'male',
                headName: '',
                members: []
            },
            view: {
                new: false
            }
        }
    }

    componentDidMount() {
        if (!_.isEmpty(this.props.location.state)) {
            const record: any = this.props.location.state;
            this.mode = 'edit';
            this.id = record._id;
            this.count = record.count;
            this.setState({
                config: {
                    familyName: record.familyName,
                    gender: record.gender,
                    headName: record.headName,
                    members: record.members
                }
            })
        }
    }

    fieldUpdated = (field: string, value: string) => {
        this.setState({
            config: {...this.state.config, [field]: value}
        });
    }

    onCancel = () => {
        this.props.history.push({
            pathname: '/'
        })
    }

    onSave = () => {
        this.props.addFamily({...this.state.config, count: 1});
        this.props.history.push({
            pathname: '/'
        });
    }


    onClick = (key: string) => {
        this.selectedMemberKey = key;
        this.setState({
            view: {...this.state.view, 'new': true}
        });
    }

    handleOk = (member: any) => {
        this.count = this.count + 1;
        let newMember: any = {
            key: this.count,
            name: member.name,
            gender: member.gender,
            members: []
        };
        if (this.selectedMemberKey === this.id) {
            let mem: any = [...this.state.config.members, newMember];
            this.setState({
                view: {...this.state.view, 'new': false},
                config: {...this.state.config, members: mem}
            });
        } else {
            let members: any = [...this.state.config.members];
            const iter = (a: any) => {
                if (a.key === this.selectedMemberKey) {
                    a.members.push(newMember)
                }
                Array.isArray(a.members) && a.members.forEach(iter);
            }
            members.forEach(iter);

            this.setState({
                view: {...this.state.view, 'new': false},
                config: {...this.state.config, members}
            })
        }
        return true;
    }

    handleCancel = () => {
        this.setState({
            view: {...this.state.view, 'new': false}
        });
        return true;
    }

    onTreeSave = () => {
        this.props.updateFamily({...this.state.config, id: this.id, count: this.count});
        this.props.history.push({
            pathname: '/'
        })
    }


    render() {
        const NodeComponent = ({comment}: any) => {
            const nestedComments = (comment.members || []).map((member: any, index: any) => {
                return <NodeComponent key={index} comment={member} type="child"/>
            })

            return (
                <React.Fragment>
                    <TreeNode label={<div
                        style={{padding: 5, borderRadius: 8, display: "inline-block", border: "2px solid red"}}
                        onClick={() => this.onClick(comment.key)}>{comment.name}</div>}>
                        {nestedComments}
                    </TreeNode>

                </React.Fragment>
            )
        }


        return (
            <div>
                {this.mode === 'add' ?
                    <div style={{marginLeft: "10%", marginTop:"5%"}}>
                        <div><h2 style={{margin: 20}}>Add Family</h2></div>
                        <div style={{margin: 20, maxWidth: 200}}>
                            <div>Family Name</div>
                            <Input value={this.state.config.familyName} onChange={(e: any) => {
                                this.fieldUpdated('familyName', e.target.value)
                            }}/>
                        </div>

                        <div style={{margin: 20, maxWidth: 200}}>
                            <div>Head Name</div>
                            <Input value={this.state.config.headName} onChange={(e: any) => {
                                this.fieldUpdated('headName', e.target.value)
                            }}/>
                        </div>

                        <div style={{margin: 20, maxWidth: 200}}>
                            <div>Gender</div>
                            <Radio.Group onChange={(e: any) => {
                                this.fieldUpdated('gender', e.target.value)
                            }}
                                         value={this.state.config.gender}>
                                <Radio value='male'>Male</Radio>
                                <Radio value='female'>Female</Radio>
                            </Radio.Group>
                        </div>

                        <div style={{margin: 20, maxWidth: 200}}>
                            <Button type='primary'
                                    disabled={!(this.state.config.headName && this.state.config.familyName && this.state.config.gender)}
                                    onClick={this.onSave}>Save</Button>
                            <Button style={{marginLeft: 5}}
                                    onClick={this.onCancel}>Cancel</Button>
                        </div>
                    </div> :
                    <div>
                        <div style={{paddingTop: "5%", paddingLeft: "5%"}}>
                            <Button type="primary"
                                    onClick={this.onTreeSave}>
                                Update
                            </Button>
                            <Button style={{marginLeft: 5}} onClick={this.onCancel}>
                                Cancel
                            </Button>
                        </div>
                        <Tree
                            lineWidth={'2px'}
                            lineColor={'green'}
                            lineBorderRadius={'10px'}
                            label={<div
                                style={{padding: 5, borderRadius: 8, display: "inline-block", border: "2px solid red"}}
                                onClick={() => this.onClick(this.id)}>{this.state.config.headName}</div>}
                        >
                            {
                                this.state.config.members && this.state.config.members.length ? this.state.config.members.map((member: any, index: any) => {
                                    return (
                                        <NodeComponent key={index} comment={member}/>
                                    )
                                }) : ''
                            }
                        </Tree>

                    </div>
                }
                {
                    this.state.view.new ? <NewMember handleOk={this.handleOk}
                                                     handleCancel={this.handleCancel}/> : ''
                }
            </div>
        );
    }
}


const structuredSelector = createStructuredSelector({
    data: (state: any) => state.family
});

const mapDispatchToProps = {addFamily, updateFamily};

export default connect(structuredSelector, mapDispatchToProps)(AddFamily);

