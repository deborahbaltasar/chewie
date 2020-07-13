import React, { Component } from 'react';

import MaterialTable from 'material-table';

import API from '../../../services/api';

import {
    AddBox,
    ArrowUpward,
    Check,
    ChevronLeft,
    ChevronRight,
    Clear,
    DeleteOutline,
    Edit,
    Search,
    FilterList,
    FirstPage,
    LastPage,
    Remove,
    SaveAlt,
    ViewColumn,
    
} from '@material-ui/icons';

import VerticalAlign from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTop from '@material-ui/icons/VerticalAlignTop';

const tableIcons = {
  Add: AddBox,
  Check: Check,
  Clear: Clear,
  Delete: DeleteOutline,
  DetailPanel: ChevronRight,
  Edit: Edit,
  Export: SaveAlt,
  Filter: FilterList,
  FirstPage: FirstPage,
  LastPage: LastPage,
  NextPage: ChevronRight,
  PreviousPage: ChevronLeft,
  ResetSearch: Clear,
  Search: Search,
  SortArrow: ArrowUpward,
  ThirdStateCheck: Remove,
  ViewColumn: ViewColumn,
};

class Members extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        await API.get('/projects', {})
            .then((res) => {
                console.log('DADOS PROJS', res.data);
                this.setState({
                    projects: res.data,
                });
            })
            .catch((error) => {
                console.log('Error ', error);
                return { code: 'error', message: 'Cannot get projects!' };
            });
    };

    render() {
        const { projects } = this.state;
        return (
            <div>       
                <MaterialTable
                    icons={tableIcons}
                    style={{position: 'relative', zIndex: '0'}}
                    title="Membros"
                    columns={[
                        { title: 'Nome', editable: 'always'},
                        { title: 'Email'},
                        { title: 'Sala de desenvolvimento',  editable: 'always'},
                    ]}
                />
            </div>
        );
    }
}

export default Members;
