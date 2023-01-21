import { Typography,Box, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Stack } from '@mui/system';
import React, { Component } from 'react'
import axios from 'axios';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import Cards from './Cards';
const key = '44fd76c8a8185b925892a08c3b91d28e';
const token = 'ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC';

const SytledModal = styled("div")({
    display: "flex",
    flexDirection:'row',
    flexWrap:'wrap',
    gap:"5px",   
  });
const CostumBox = styled(Box)({
    width:'320px',
    height:'100%',
    color:'black',
    padding:'10px',
    borderRadius:'4px',
    backgroundColor:'#edf5fa',
    
})
export default class Lists extends Component {
    constructor(props){
        super(props)
        this.state = {
            list : [],
            error : '',
            open: false,
            listName:'',
            
        }
    }
    handleClickOpen = () => {
        this.setState({
            open : true
        })
      };
    handleClose = () => {
        this.setState({
            open : false,
        })
    }
    textvalue = (event)=>{
        this.setState({
            listName : event.target.value
        })
    }
    createList = ()=>{
        const { id } = this.props.match.params;
        axios.post(`https://api.trello.com/1/lists?name=${this.state.listName}&idBoard=${id}&key=${key}&token=${token}`)
        .then(res => res.data)
        .then((data) => {
            const listData = [...this.state.list];
            listData.push(data);
                this.setState({
                    list: listData,
                    open: false,
                    error: false,
            })
        })

    }
    oncreate = () =>{
        this.handleClose()
        this.createList()
    }

    deleteHandeler = (id)=>{
        let value = true
        axios.put(`https://api.trello.com/1/lists/${id}/closed?value=true&key=${key}&token=${token}`)
        .then(res => res.data)
        .then((res) => {
            const newLists = this.state.list.filter((list) => {
                return list.id !== id;
            })
            this.setState({ list: newLists });
        })
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        axios.get(`https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`)
        .then(res => this.setState({
            list : res.data
        }))
        .catch((err) => {
            this.setState({
                list: [],
                error: "Failed to load lists",
            });
        })

    }

  render() {
    if (this.state.error) {
        return (
            <div className='mt-5 pt-3'>
                <h1>{this.state.error}</h1>
            </div>
        )
    }
    return (
      <div className='mt-5 p-5' style={{backgroundImage:"url('data:image/jpeg;base64,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')",backgroundSize:'cover',height:'100vh',width:'100%'}}>
        {
            this.state.list?
            <>
            <SytledModal>
                {
                    this.state.list.map((data)=>{
                        return(
                             
                            <CostumBox >
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className='mb-2'>
                                    <Typography variant='p'><b>{data.name}</b></Typography>
                                    <DeleteIcon onClick={(id) => { this.deleteHandeler(data.id) }} ></DeleteIcon>
                                </div>
                                <Cards listid = {data.id}></Cards>
                            </CostumBox> 
                        )
                    })
                }
                <Button variant="outlined" onClick={this.handleClickOpen} sx={{height:'40px'}}> + Add Another List</Button>
            </SytledModal>
            </>:<></>
        }
        <Stack >
            
            <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Add a card</DialogTitle>
            <DialogContent>
            
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter a title for this card..."
                type="text"
                fullWidth
                variant="standard"
                onChange={this.textvalue}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.oncreate}>Create</Button>
            </DialogActions>
      </Dialog>
        </Stack>
      </div>
    )
  }
}
