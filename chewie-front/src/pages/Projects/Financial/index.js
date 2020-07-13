import React, { Component } from 'react';

import MaterialTable from 'material-table';

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

class Financial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            finances: [],
            invoices: [],
        };
    }

    render() {
        return (
            <div>       
                <MaterialTable
                    icons={tableIcons}
                    style={{position: 'relative', zIndex: '0'}}
                    title="Notas Fiscais" 
                    columns={[
                        { title: 'Emissor',  editable: 'always'},
                        { title: 'Valor',  editable: 'always'},
                        { title: 'Data de solicitação', editable: 'always'},
                        { title: 'Data de emissão '},
                        { title: 'Data de pagamento',  editable: 'always'},
                        { title: 'Status',  editable: 'always'},

                    ]}
                />
                <br/><br/>
                <MaterialTable
                    icons={tableIcons}
                    style={{position: 'relative', zIndex: '0'}}
                    title="Gastos" 
                    columns={[
                        { title: 'Identificação',  editable: 'always'},
                        { title: 'Valor',  editable: 'always'},
                        { title: 'Data', editable: 'always'},
                    ]}
                />
            </div>
        );
    }
}

export default Financial;
