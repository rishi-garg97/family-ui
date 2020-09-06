import React from 'react';
import {Modal, Input, Radio, Button} from 'antd';

interface State {
    member: any;
}
interface Props {
    handleOk: any;
    handleCancel: any;
}

class NewMember extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            member: {
                name: '',
                gender: ''
            }
        }
    }

    fieldUpdated = (field: string, value: string) => {
        this.setState({
            member: {...this.state.member, [field]: value}
        });
    }


    render() {
        return (
            <Modal
                title="New Member"
                visible={true}
                onCancel={this.props.handleCancel}
                footer={[
                    <Button
                        key="cancel"
                        onClick={this.props.handleCancel}
                    >
                        Cancel
                    </Button>,
                    <Button
                        onClick={() => this.props.handleOk(this.state.member)}
                        key="submit"
                        type="primary"
                        disabled={!(this.state.member.name && this.state.member.gender)}
                    >
                        Add
                    </Button>
                ]}
            >
                <div style={{margin: 20, maxWidth: 200}}>
                    <div>Member Name</div>
                    <Input value={this.state.member.name} onChange={(e: any) => {
                        this.fieldUpdated('name', e.target.value)
                    }}/>
                </div>

                <div style={{margin: 20, maxWidth: 200}}>
                    <div>Gender</div>
                    <Radio.Group onChange={(e: any) => {
                        this.fieldUpdated('gender', e.target.value)
                    }}
                                 value={this.state.member.gender}>
                        <Radio value='male'>Male</Radio>
                        <Radio value='female'>Female</Radio>
                    </Radio.Group>
                </div>

            </Modal>
        );
    }
}

export default NewMember;
