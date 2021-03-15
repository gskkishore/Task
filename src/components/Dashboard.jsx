import React, { Component } from 'react'
import "./Dashboard.css"
import { Input } from "antd";
import Grid from "@material-ui/core/Grid";
import Modalcomp from "./ModalComp/Modalcomp";



class Dashboard extends Component {
    state = {
    openview: false,
  };
   handleClickopen = () => {
    this.setState({ openview: true});
  };
  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    }
  };
  closemodal = () => {
    this.setState({ openview: false });
  };
    render () {
        const { Search } = Input;
        return (
            <div>
                <div className="contacts">Contacts</div>
                
                <div className="searchbox">
                    <Search
              placeholder="Search"
              onSearch={value => console.log(value)}
              style={{ width: 150 }}
              className="search_box"
            />
             <button className="add_button" onClick={this.handleClickopen} >Add Contact</button>
            
                </div>
                <div>
                    <Grid className="contact_display">
                        <Grid container>
                            <Grid item xs={8}>
                                <div>hi</div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>hi</div>
                            </Grid>
                         </Grid>
                    </Grid>
                </div>
<Modalcomp
            visible={this.state.openview}
            title={"Edit details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          >
            <div>
              <div>
                Name
                <input type="text" />
                </div>
                <div>
                Ph.No
                <input type="number" />
              </div>
                           <button>Add</button>

            </div>

          </Modalcomp>
              
                    


      
                

                
            </div>
            
        )
    }
}

export default Dashboard;