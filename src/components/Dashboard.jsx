import React, { Component } from 'react'
import "./Dashboard.css"
import { Input } from "antd";
import Grid from "@material-ui/core/Grid";
import Modalcomp from "./ModalComp/Modalcomp";
import Labelbox from '../helpers/labelbox/labelbox';


const axios = require('axios');





class Dashboard extends Component {
    state = {
    openview: false,
    updateData: false,
    Name:"",
    Phone:"",
    details:[],
    detailtab:"",
    currentid:"",

  };
   handleClickopen = () => {
    this.setState({ openview: true});
  };
  editData =()=>{
    this.setState({openview:true})
  }
  modelopen = (data) => {
    if (data === "view") {
      this.setState({ openview: true });
    }
  };
  submitFunction =(e) => {
    console.log("add_data",e)
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
            this.setData()

            
        })
    }
    setData=()=>{
      this.state.details.Name = this.state.details.Name_api
    }
    componentDidUpdate(id){
        axios.get(`https://5e81e6a3c130270016a3786e.mockapi.io/Task/${id}`)
        .then(res=>{
            const details =res.data;
            console.log(details,"detailsdet")
            this.setState({
                details
            })
        })
    }
  closemodal = () => {
    this.setState({ openview: false ,updateData: false});
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
// edit copy
update(e) {
  e.preventDefault();
  const details = [{

    Name:this.state.details[0].Name,
    Phone:this.state.details[1].Phone,
    openview: true
  }
     
  ]
  axios.put('https://5e81e6a3c130270016a3786e.mockapi.io/Task/{this.state.currentid}', details)
  console.log(this.state.currentid,"hi")
  .then(res => console.log(res.data));
}

// 








  editData =()=>{
    this.setState({openview:true,updateData:true})
  }
   changeDynamic = (data, key) => {
        var details = this.state.details;
        details[key].value = data;
        this.setState({ details });
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
                                    {/* <button onClick={this.editData}>Edit</button> */}
                                    <button onClick={this.update}>Edit</button>


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
            title={"Add details"}
            closemodal={(e) => this.closemodal(e)}
            xswidth={"xs"}
          >
            
                        <form onSubmit = {this.submitFunction}>
                          {this.state.updateData === true ? 

            <div>
              {/* <div style={{padding:"10px"}}>
                Name
                <input type="text" style={{width:"50%"}} size="15" name = "name" required/>
                </div>
                <div style={{padding:"10px"}}>
                Ph.No
                <input type="number" style={{width:"50%"}}  max="10" name = "phoneno"/>
              </div> */}
              
                   <div>
                        <Labelbox
                                    type="text"
                                    labelname="Name"
                                    valuelabel={'Name'}
                                    changeData={(data) => this.changeDynamic(data, 'Name')}
                                    // value={this.state.details.Name.value}
                                    
                                />
                            <button className="modal_add_button" type="submit">Update</button>
                    </div>
               

            </div>
            :<div>
              <div style={{padding:"10px"}}>
                Name
                <input type="text" style={{width:"50%"}} size="15" name = "name" required/>
                </div>
                <div style={{padding:"10px"}}>
                Ph.No
                <input type="number" style={{width:"50%"}}  max="10" name = "phoneno"/>
              </div>
                           <button className="modal_add_button" type="submit">Add</button>

            </div>
            }
            </form>

          </Modalcomp>
              
                    


      
                

                
            </div>
            
        )
    }
}

export default Dashboard;