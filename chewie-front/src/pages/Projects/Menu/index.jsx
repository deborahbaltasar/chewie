import React, { Component } from 'react';

import {AddCircleOutlineRounded, LaptopChromebookRounded, PersonAddRounded} from '@material-ui/icons';


import './styles.scss';

class Menu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAllProjects: false,
            projects: [],
        };
    }



    render() {
        const { handleProjects } = this.props;
        return (
            <>
                <div className="menu-component">
                    <button>
                        <AddCircleOutlineRounded style={{width: '100px', height: '100px'}}/>
                        <p>Adicionar Novo Projeto</p>
                    </button>

                    <button 
                        onClick={handleProjects}
                        // style={showAllProjects === true ? {color: '#4c7bff', transform: 'translateY(-10px)', boxShadow: '0 15px 35px rgba(0,0,0,.6)'} : {}}
                    >
                        <LaptopChromebookRounded style={{width: '100px', height: '100px'}}/>
                        <p>Ver todos os projetos</p>
                    </button>

                    <button>
                        <PersonAddRounded style={{width: '100px', height: '100px'}}/>
                        <p>Adicionar Parceiros</p>
                        
                    </button>
                </div>


            </>
        );
    }
}

export default Menu;

