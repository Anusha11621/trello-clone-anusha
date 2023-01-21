import { Button, Menu, MenuItem, TextField } from '@mui/material'
import React, { Component } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckItems from './CheckItems';
import axios from 'axios';

const key = '44fd76c8a8185b925892a08c3b91d28e';
const token = 'ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC';

export default class Checklists extends Component {
    constructor(props){
        super(props)
        this.state = {
            checkList:[],
            open:false,
            anchorEl:null,
            cardName:'',
            error:false
        }
    }
    createChecklist = ()=>{
        axios.post(`https://api.trello.com/1/checklists?name=${this.state.cardName}&idCard=${this.props.cardId}&key=${key}&token=${token}`)
        .then(res => res.data)
        .then((res) => {
            let newCheckLists=[]
            if(this.state.checkList.length>0){
             newCheckLists = [...this.state.checkList];
            }
            newCheckLists.push(res);
            this.setState({ checkList: newCheckLists, checkListName: '',open:false })
        })
    }
    getChecklist = ()=>{
        axios.get(`https://api.trello.com/1/cards/${this.props.cardId}/checklists?key=${key}&token=${token}`)
        .then(checkList => {
            this.setState({
                checkList: checkList.data,
                error: false,
            });
        }).catch((err) => {
            this.setState({
                checkList: [],
                error: "Failed to load checklist",
            });
        })
    }
    componentDidMount(){
        this.getChecklist()
    }

    deleteChecklist = (id)=>{
        axios.delete(`https://api.trello.com/1/checklists/${id}?key=${key}&token=${token}`)
        .then((res) => {
            const newLists = this.state.checkList.filter((checkList) => {
                return checkList.id !== id;
            })
            this.setState({ checkList: newLists });
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
    const textValue = (event) =>{
        this.setState({
            cardName:event.target.value
        })
    }
    return (
      <div className='d-flex flex-column align-items-center gap-3'>
        {
            this.state.checkList?<>
            {
            this.state.checkList.map((data)=>{
                return (
                    // <p style={{width:'400px',marginLedt:'10px'}}>{data.name}</p>
                    <>
                        <div className='d-flex justify-content-between mx-3 bg-light p-1 rounded' style={{width:'300px'}}>
                        <div>{data.name}</div>
                        <div onClick={() => { this.deleteChecklist(data.id) }}><DeleteOutlineRoundedIcon></DeleteOutlineRoundedIcon></div>
                    </div>
                    <CheckItems name={data.name} id={data.id}></CheckItems>
                    </>
                )
            })

            }
            </>:<></>
        }
        <Button variant="contained" size='small' className='m-3'
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >Checklists</Button>
        <Menu
            id="basic-menu"
            anchorEl={this.state.anchorEl}
            open={open}
            onClose={handleClose}
        >
                <div className='d-flex justify-content-around'>
                    <div><p>Add Checklist</p></div>
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
                    <Button onClick={this.createChecklist} >Add</Button>
                </div>
            
        </Menu>
      </div>
    )
  }
}
