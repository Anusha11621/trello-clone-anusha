import { Button, Menu, TextField } from '@mui/material'
import React, { Component } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import axios from 'axios';
import '../App.css'
const key = '44fd76c8a8185b925892a08c3b91d28e';
const token = 'ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC';

export default class CheckItems extends Component {
    constructor(props){
        super(props)
        this.state ={
            CheckItems:[],
            open:false,
            anchorEl:null,
            checkListName:'',

        }
    }
    createCheckItems = ()=>{
        axios .post(`https://api.trello.com/1/checklists/${this.props.id}/checkItems?name=${this.state.checkListName}&key=${key}&token=${token}`)
        .then(res => res.data)
        .then((res) => {
            let newCheckItems=[]
            if(this.state.CheckItems.length>0){
                newCheckItems = [...this.state.CheckItems];
            }
            newCheckItems.push(res);
            this.setState({ CheckItems: newCheckItems })
        })
    }

    getCheckItems = ()=>{
        axios
        .get(`https://api.trello.com/1/checklists/${this.props.id}/checkItems?key=${key}&token=${token}`)
        .then(data => {
            this.setState({
                CheckItems: data.data,
            })
            console.log(data);
        })
    }

    componentDidMount(){
        this.getCheckItems()
    }
    deleteCheckItems = (checkListId,checkItemId)=>{
        axios.delete(`https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${key}&token=${token}`)
        .then((res) => {
            const newChekItems = this.state.CheckItems.filter((checkItem) => {
                return checkItem.id !== checkListId && checkItem.id !== checkItemId;
            })
            this.setState({ CheckItems: newChekItems });
        })
    }
    
  render() {
    console.log(this.state);
    const open = Boolean(this.state.anchorEl);
    const handleClick = (event) => {
        this.setState({
            anchorEl:event.currentTarget
        })
    };
    const handleClose = () => {
        this.setState({
            anchorEl:null
        })
    };
    const textValue = (event)=>{
        this.setState({
            checkListName:event.target.value
        })
    }
    return (
      <div>
        {
            this.state.CheckItems ? <>
            {
              this.state.CheckItems.map((data)=>{
                return (
                    <div className='d-flex align-items-center justify-content-between gap-3 mb-2'>
                        {/* <input type={'checkbox'}></input>
                        <p className='mt-2'>{data.name}</p> */}
                        <input type="checkbox" /> <label className="strikethrough">{data.name}</label>
                        <DeleteOutlineRoundedIcon onClick={() => { this.deleteCheckItems(this.props.id, data.id) }}></DeleteOutlineRoundedIcon>
                    </div>
                )
              })  
            }
            </>:<></>
        }

        <Button 
        variant='outlined'
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        > Add CheckItems</Button>
        <Menu
            id="basic-menu"
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={handleClose}
        >
                <div className='d-flex justify-content-around'>
                    <div><p>{this.props.name}</p></div>
                    <div onClick={handleClose} style={{cursor:'pointer'}} ><CloseRoundedIcon></CloseRoundedIcon></div>
                </div>
                <hr></hr>
                <div className='m-3'>
                    <TextField 
                    label='Title'
                    size='small'
                    onChange={textValue}
                    ></TextField>
                    <br></br>
                    <Button onClick={this.createCheckItems}>Add</Button>
                </div>
            
        </Menu>
      </div>
    )
  }
}
