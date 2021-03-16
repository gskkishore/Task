import React, { Component } from 'react'
import "./Dashboard.css"
import { Input } from "antd";
import Grid from "@material-ui/core/Grid";
import Modalcomp from "./ModalComp/Modalcomp";
const axios = require('axios');




class Dashboard extends Component {
    state = {
    openview: false,
    Name:"",
    Phone:"",
    details:[],
    detailtab:"",
    currentid:"",

  };
   handleClickopen = () => {
    this.setState({ openview: true});
  };
  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    }
  };
  submitFunction =(e) => {
    e.preventDefault();
    var Name_api = e.target.name.value;
    var Phone_api =e.target.phoneno.value;
    axios({
      method:"post",
      url:"https://5e81e6a3c130270016a3786e.mockapi.io/Task",
      headers:{'content-type':'application/json'},
      data:{
        Name_api,
        Phone_api,

      }
    })
    this.setState({
      Name:Name_api,
      Phone:Phone_api,
      openview: false
    })
    setTimeout(()=>{
            this.props.history.push("/")
        },1000)
  }
   componentDidMount(){
        axios.get("https://5e81e6a3c130270016a3786e.mockapi.io/Task")
        .then(res=>{
            const details =res.data;
            console.log(details,"details")
            this.setState({
                details
            })

            
        })
    }
    componentDidUpdate(){
        axios.get("https://5e81e6a3c130270016a3786e.mockapi.io/Task")
        .then(res=>{
            const details =res.data;
            console.log(details,"detailsdet")
            this.setState({
                details
            })
        })
    }
  closemodal = () => {
    this.setState({ openview: false });
  };
 moreDetails=(id)=>{
       console.log("checking",id)
    this.setState({
        currentid:id
    })

   }
   deleteFunction=(id)=>{
      var result = window.confirm("Are you sure you want to delete ?");
      if(result)
        axios.delete(`https://5e81e6a3c130270016a3786e.mockapi.io/Task/${id}`)
                this.setState({                
                })        
  }
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
                                <div>
                                  {this.state.details.map((val)=>{
                                  return(
                                    <div className="getdetails">
                                      <h2>{val.Name_api}</h2>
                                      <div className="button">
                                     
                                      <button className="add_button"
                                      onClick={() => this.moreDetails(val.id)}
                                      >More</button>
                                      <button className="add_button" type = "reset" 
                                       onClick={() =>this.deleteFunction(val.id)}
                                       >Delete</button>  
                                       </div>              

                                    </div>
                                  )
                                  }
                                  )}
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div>
                                  {this.state.details.map((val)=>{
                                  return(this.state.currentid===val.id &&
                                    <div className="">Name
                                      <h2>{val.Name_api}</h2>
                                      Phone.No
                                      <h3>{val.Phone_api}</h3>
                                    </div>
                                  )
                                  }
                                  )}
                                </div>
                            </Grid>
                         </Grid>
                    </Grid>
                </div>
<Modalcomp
            visible={this.state.openview}
            title={"View details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          >
                        <form onSubmit = {this.submitFunction}>

            <div>
              <div>
                Name
                <input type="text" size="15" name = "name" required/>
                </div>
                <div>
                Ph.No
                <input type="number"  max="10" name = "phoneno"/>
              </div>
                           <button type="submit">Add</button>

            </div>
            </form>

          </Modalcomp>
              
                    


      
                

                
            </div>
            
        )
    }
}

export default Dashboard;