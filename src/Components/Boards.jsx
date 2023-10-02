import React, { Component } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography, Box, Input, OutlinedInput} from '@mui/material';
import axios from 'axios';
import { Stack } from '@mui/system';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Background from './Backgroung'
const SytledModal = styled("div")({
    display: "flex",
    flexDirection:'row',
    flexWrap:'wrap',
    gap:"5px",
    
  });
const CostumBox = styled(Box)({
    width:'180px',
    height:'100px',
    padding:"10px 0 0 20px",
    margin:'3px',
    color:'white',
    borderRadius:'3px',
    background:'#0680d6',
})
const Costumbox = styled(Box)({
    width:'180px',
    height:'100px',
    padding:"35px 25px 25px 25px",
    margin:'3px',
    textAlign:'center',  
    borderRadius:'3px', 
})
export default class Boards extends Component {
    constructor(props){
        super(props)
        this.state = {
            boards: [],
            isLoading: true,
            error: false,
            name: '',
            open : false
        }
    }
    handleClickOpen = () => {
        this.setState({
            open : true
        })
      };
    handleClose = () => {
        this.setState({
            open : false
        })
    }
    textvalue = (event)=>{
        this.setState({
            name : event.target.value
        })
    }
      createBoard = () => {
        axios.post(`https://api.trello.com/1/boards/?name=${this.state.name}&key=44fd76c8a8185b925892a08c3b91d28e&token=ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC`)
        .then(res => res.data)
        .then((data) => {
            const boardsData = [...this.state.boards];
                boardsData.push(data);
                this.setState({
                    boards: boardsData,
                    open: false,
            })
        }
        )
    }
    oncreate = () =>{
        this.handleClose()
        this.createBoard()
    }
    componentDidMount(){
        axios.get(`https://api.trello.com/1/members/me/boards?key=44fd76c8a8185b925892a08c3b91d28e&token=ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC`)
        
        .then(data=>this.setState({
                    boards: data.data,
                    isLoading: false,
                    error: false,

        }))
        .catch((err) => 
            this.setState({ 
                boards: [],
                isLoading: false,
                error: "Failed to load Boards",
            })
        )

    }
  render() {
    if (this.state.error) {
        return (
            <div className='mt-5 pt-3'>
                <h1>{this.state.error}</h1>
            </div>
        )
    }
    if (this.state.isLoading) {
        return (
            <div className='mt-5 pt-3'>
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
    <div className=' container mt-5 pt-5 d-flex gap-5'>
       
       
        <div>
        <p style={{backgroundColor : '#E9F2FF', color:'#0C66E4', padding:'10px 130px 10px 10px',borderRadius:'10px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#0C66E4" class="bi bi-trello" viewBox="0 0 16 16">
          <path d="M14.1 0H1.903C.852 0 .002.85 0 1.9v12.19A1.902 1.902 0 0 0 1.902 16h12.199A1.902 1.902 0 0 0 16 14.09V1.9A1.902 1.902 0 0 0 14.1 0ZM7 11.367a.636.636 0 0 1-.64.633H3.593a.633.633 0 0 1-.63-.633V3.583c0-.348.281-.631.63-.633h2.765c.35.002.632.284.633.633L7 11.367Zm6.052-3.5a.633.633 0 0 1-.64.633h-2.78A.636.636 0 0 1 9 7.867V3.583a.636.636 0 0 1 .633-.633h2.778c.35.002.631.285.631.633l.01 4.284Z"/>
       </svg> &nbsp;
       Boards</p>
        </div>

       <div>
       <Typography variant='p' color={'gray'}><b>YOUR WORKSPACES</b></Typography>
        <br></br>
        <br></br>
        <Typography variant='p' ><span className='bg-success py-2 px-3 rounded text-white'><b>T</b></span> <b>Trello Workspace</b></Typography>
        <br></br><br></br>
      {
        this.state.boards?
        <SytledModal >
            
        {
            this.state.boards.map((data)=>{
                return (   
                <>
                    <Link to={`${data.id}`} style={{textDecoration:'none',color:'black'}}>
                        <CostumBox  >
                            <Typography variant='p'>{data.name}</Typography>
                        </CostumBox>  
                    </Link> 
                </>
                )
            })
        }
        <Costumbox bgcolor={'aliceblue'}  onClick={this.handleClickOpen}>
             Create New Board
        </Costumbox>
        </SytledModal>
        :<p>loading....</p>
      }  
      <div style ={{width:'100px'}} >
        
        <Dialog open={this.state.open} onClose={this.handleClose}>
        <Typography  sx={{textAlign:'center'}} pt={1}>Create Board</Typography>
        
        <div className='d-flex justify-content-center align-items-center'>
            <div  className='d-flex justify-content-center align-items-center' style={{background:"Blue",padding:'10px',margin:'20px',borderRadius:'10px', height:'150px', width:'250px'}}>
                <img src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg" alt="Image"/>
            </div>
        </div>
       <div style={{width:'300px'}}>
       <Background></Background>
       </div>
        <DialogContent>
         
          <TextField
            autoFocus   
            id="outlined-basic"
            label="Board Title"
            type="text"
            size="small"
            fullWidth
            variant="outlined"
            placeholder='Enter Board Title.....'
            onChange={this.textvalue}
            style={{marginBottom:'0px'}}
          />
          {
            this.state.name == ""?<p className='mt-2 ' style={{marginBottom:'-10px'}}>👋 Board title is required</p>:<></>
          }

        </DialogContent>
       
            <div>
            {
                this.state.name.length < 1?<Button variant="contained" size='small' disabled onClick={this.oncreate} >Create</Button>:<Button variant="contained" size='small' onClick={this.oncreate}>Create</Button>
            }
            </div>
           
        
      </Dialog>
      </div>
       </div>
    </div>
    )
  }
}



