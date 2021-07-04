
import { useEffect,useState } from 'react';
import './App.css'
import Navbar from "./Component/Nav";
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#2a3958",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    table: {
      minWidth: 700,
    },
  }),
);


function App() {

  const classes = useStyles();

  var [callEmpdata,setcallEmpdata]:any=useState([]);
  
useEffect(()=>{


    fetch(`/.netlify/functions/calldata`)
    .then(response=>response.json())
    .then(data=>{
      setcallEmpdata(data)
      
    })

  },[])

  // const rows = [

  //   callEmpdata.map((value:any,index:any)=>
  //     {
       
  //     createData('Frozen yoghurt', 159, 6.0, <EditIcon style={{color:"#129cb0"}}/>, <DeleteIcon style={{color:"#db303f"}}/>)
  
  //     }
     
  //   )
  
  // ];

 var [Empdata,setEmpData]:any=useState({
   name:"",
   id:"",
   salary:0
 });
var[nameclass,setnameclass]:any=useState('');
var[idclass,setidclass]:any=useState('');
var[salaryclass,setSalaryclass]:any=useState('');

var[updatenameclass,updatesetnameclass]:any=useState('');
var[updateidclass,updatesetidclass]:any=useState('');
var[updatesalaryclass,updatesetSalaryclass]:any=useState('');

let senddata=():any=>{
    
  if(!Empdata.name || !Empdata.id || !Empdata.salary ){

    if(!Empdata.name ){
      setnameclass('eName');
    }
    else{
      setnameclass('');
    }
    if(!Empdata.id ){
      setidclass('eName');
    }
    else{
      setidclass('');
    }
    if(!Empdata.salary ){
      setSalaryclass('eName');
    }
    else{
      setSalaryclass('');
    }

    return 0; 

  }

  console.log("Before Send Data : ",Empdata);

  fetch(`/.netlify/functions/addemployee`, {
    method: 'post',
    body: JSON.stringify(Empdata)
  })
.then(response => response.json())
.then(data => {
 
  console.log("Data Key: " +JSON.stringify( data));
  fetch(`/.netlify/functions/calldata`)
    .then(response=>response.json())
    .then(data=>{
      console.log("New Data",data)
      setcallEmpdata(data)
      
    })
});
setEmpData({
  name:"",
  id:"",
  salary:0
})


  
  }

 let [empupdate,setempupdate]:any=useState(-1);

 
 var [updateEmpdata,setupdateEmpData]:any=useState({
  name:"",
  id:"",
  salary:0,
  keys: 0 
});





  return (
    <div>
     <Navbar />
    
 


    <div style={{padding:"2%",overflow:"hidden"}} className={classes.root}>
      <Grid container spacing={3}>
       
      
        <Grid item xs={12} sm={4}>
          <Paper className={`${classes.paper} ${nameclass}`}>


          <TextField  required id="standard-required" onChange={(event)=>
              setEmpData({
                ...Empdata,
                name:event.target.value
              })
        }  
          
          label="Employee Name" color="secondary" value={Empdata.name} style={{width:"95%"}} />
          
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={`${classes.paper} ${idclass}`}>

          <TextField required id="standard-required"
          
          onChange={(event)=>
            setEmpData({
              ...Empdata,
              id:event.target.value
            })
      }  

          label="Employee ID" color="secondary" style={{width:"95%"}} value={Empdata.id}  /> 
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={`${classes.paper} ${salaryclass}`}>

          <TextField required id="standard-required" 
          
          onChange={(event)=>
            setEmpData({
              ...Empdata,
              salary:event.target.value
            })
      }  
          type="number"
          label="Employee Salary"  color="secondary" style={{width:"95%"}}  value={Empdata.salary}  /> 

          </Paper>
        </Grid>
       


        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <Button variant="contained" onClick={senddata} color="secondary">
       Save Employee Data
      </Button>
          </Paper>
        </Grid>

      </Grid>
    </div>


<div style={{padding:"2%",overflow:"hidden"}} >
<TableContainer style={{width:"100%"}} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Employee Name</StyledTableCell>
            <StyledTableCell align="right">ID</StyledTableCell>
            <StyledTableCell align="right">Salary</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {callEmpdata.map((value:any,index:any) => {
          
            return(
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
               {empupdate===index?  <TextField className={updatenameclass} required id="standard-required" onChange={(event)=>
                    setupdateEmpData({
                      ...updateEmpdata,
                      name:event.target.value
                    })
              }  
                
                label="Name" color="secondary" value={updateEmpdata.name} style={{width:"55%"}}  />
                
                :value.data.name}



              </StyledTableCell>
              <StyledTableCell align="right">
              {empupdate===index?  <TextField className={updateidclass} required id="standard-required"
          
                    onChange={(event)=>
                      setupdateEmpData({
                        ...updateEmpdata,
                        id:event.target.value
                      })
                }  

                    label="ID" color="secondary" style={{width:"55%"}} value={updateEmpdata.id}  /> 
                
                :value.data.id} 
              
              </StyledTableCell>
              <StyledTableCell align="right">
              {empupdate===index?        <TextField className={updatesalaryclass} required id="standard-required" 
          
                    onChange={(event)=>
                      setupdateEmpData({
                        ...updateEmpdata,
                        salary:event.target.value
                      })
                }  
                    type="number"
                    label="Salary"  color="secondary" style={{width:"55%"}}  value={updateEmpdata.salary}  />
              
              :value.data.salary} 
                      
              
              </StyledTableCell>
              <StyledTableCell align="right">{empupdate===index?
              
              <Button variant="contained" onClick={()=>{

               
                                        if(!updateEmpdata.name || !updateEmpdata.id || !updateEmpdata.salary ){

                                          if(!updateEmpdata.name ){
                                            updatesetnameclass('eName');
                                          }
                                          else{
                                            updatesetnameclass('');
                                          }
                                          if(!updateEmpdata.id ){
                                            updatesetidclass('eName');
                                          }
                                          else{
                                            updatesetidclass('');
                                          }
                                          if(!updateEmpdata.salary ){
                                            updatesetSalaryclass('eName');
                                          }
                                          else{
                                            updatesetSalaryclass('');
                                          }
                                      
                                          return 0; 

                                        }
                                  
                                        var dataupdate={
                                          name:updateEmpdata.name,
                                          id:updateEmpdata.id ,
                                          salary:updateEmpdata.salary,
                                          keys:value.ref['@ref'].id
                                        }
                                        console.log("Before Update Send Data : ",dataupdate);

                                        fetch(`/.netlify/functions/updateemp`, {
                                          method: 'post',
                                          body: JSON.stringify(dataupdate)
                                        })
                                      .then(response => response.json())
                                      .then(data => {
                                      
                                        console.log("Data Key: " +JSON.stringify( data));
                                        fetch(`/.netlify/functions/calldata`)
                                          .then(response=>response.json())
                                          .then(data=>{
                                            console.log("New Data",data)
                                            setcallEmpdata(data)
                                            
                                          })
                                      });

                                      setempupdate(-1);

              }} color="secondary">
                           Update
                            </Button>

              :<EditIcon  className="Delete" onClick={()=>{

                 setupdateEmpData({
                  name:value.data.name,
                  id:value.data.id,
                  salary:value.data.salary,
                  keys: 0 
                })
              setempupdate(index);
              }} style={{color:"#db303f",cursor:"pointer"}}/>}</StyledTableCell>
              
              
              <StyledTableCell align="right">{<DeleteIcon className="Delete" onClick={()=>{
               var deletedataid={
                 id:value.ref['@ref'].id
               }

               console.log("DATA ",deletedataid.id)
               
                
               fetch(`/.netlify/functions/deleteemp`, {
                method: 'post',
                body: JSON.stringify(deletedataid)
              })
            .then(response => response.json())
            .then(() => {
             
              fetch(`/.netlify/functions/calldata`)
              .then(response=>response.json())
              .then(data=>{
                console.log("New Data",data)
                setcallEmpdata(data)
                
              })
              

                    
                                       
                                        
              setupdateEmpData({
                name:"",
                id:"",
                salary:0,
                keys: 0 
              })
            });
              
              }} style={{color:"#db303f",cursor:"pointer"}}/>}</StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>

</div>
    </div>
  );
}

export default App;
