export interface Props {
    fetchFamily: any;
    deleteFamily: any;
    data: any;
}
export interface State{
    columns: any;
}

export const Columns = [
    {
        dataIndex: 'familyName',
        key: 'familyName',
        title: 'Family Name',
        type: 'text',
        sorter: true
    },
    {
        dataIndex: 'count',
        key: 'members',
        title: 'No. Of Members',
        type: 'number',
        sorter: true
    }
];
