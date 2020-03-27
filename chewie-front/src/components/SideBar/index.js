import React from 'react';
import Sidebar from "react-sidebar";

import { MdMenu } from 'react-icons/md';

import './styles.css';

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
 
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }
 
  render() {
    return (
      <div className="sidebar-container">
      <Sidebar
        sidebar={<b>AAAAAAAA</b>}
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "#FFF" } }}
      >
        <button onClick={() => this.onSetSidebarOpen(true)}>
            <MdMenu size={36} color="#333" />
        </button>   
      </Sidebar>
      </div>
    );
  }
}
 
export default SideBar;

// import React, {Component} from 'react';
// import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
// import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
// import MaterialIcon from '@material/react-material-icon';
// import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';

// includes imports for drawer, list, material icon and top app bar styles


// export default class SideBar extends Component {
//   state = {selectedIndex: 0};

//   render() {
//     return (
//       <div className='drawer-container'>
//         <Drawer>
//           <DrawerHeader>
//             <DrawerTitle tag='h2'>
//               jane.smith@gmail.com
//             </DrawerTitle>
//           </DrawerHeader>

//           <DrawerContent>
//             <List singleSelection selectedIndex={this.state.selectedIndex}>
//               <ListItem>
//                 <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
//                 <ListItemText primaryText='Mail' />
//               </ListItem>
//             </List>
//           </DrawerContent>
//         </Drawer>

//         <DrawerAppContent className='drawer-app-content'>
//           <TopAppBar
//             title='Inbox'
//             navigationIcon={<MaterialIcon icon='menu' />}
//           />

//           <TopAppBarFixedAdjust>
//             Your inbox content
//           </TopAppBarFixedAdjust>
//         </DrawerAppContent>
//       </div>
//     );
//   }
// }