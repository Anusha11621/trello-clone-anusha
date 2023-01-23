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
    <div className=' container mt-5 pt-5'>
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
      <Stack >
        
        <Dialog open={this.state.open} onClose={this.handleClose}>
        <Typography  sx={{textAlign:'center'}} pt={1}>Create Board</Typography>
        <hr></hr>
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
          />
          {
            this.state.name == ""?<p className='mt-2 '>👋 Board title is required</p>:<></>
          }

        </DialogContent>
        <Stack direction={'column'} m={3}>
            {
                this.state.name.length < 1?<Button variant="contained" size='small' disabled onClick={this.oncreate} >Create</Button>:<Button variant="contained" size='small' onClick={this.oncreate}>Create</Button>
            }
            <br></br>
            <Button variant="outlined" size='small' onClick={this.handleClose}>Cancel</Button>
        </Stack>
      </Dialog>
      </Stack>
    </div>
    )
  }
}



