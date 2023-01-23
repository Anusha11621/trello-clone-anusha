import React, { Component } from 'react'
import { Button, TextField, Typography ,Box, DialogTitle, Stack, DialogActions, Dialog} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import styled from '@emotion/styled';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import Checklists from './Checklists';


const key = '44fd76c8a8185b925892a08c3b91d28e';
const token = 'ATTA914c18ff4bc110c847eb2b7c989dc10c7b4e8e05d28f8845fbfe1c48bce469fc6C1771EC';
const CostumBox = styled(Box)({
    width:'100%',
    background:'white',
    padding:'4px',
    color:'gray',
    marginBottom:'10px',
    cursor:'pointer',
    borderRadius:'3px',
    boxShadow:'1px 1px  2px gray'
    
})
export default class Cards extends Component {
    constructor(props){
        super(props)
        this.state = {
            cards:[],
            cardName:'',
            addacard:false,
            add:false,
            open:false,
            error: false,
            value:'',
            cardId:''
        }
    }
    handelOpen = ()=>{
        this.setState({
            addacard:true,
        })
    }
    handleClose = () => {
        this.setState({
            addacard:false,
            add:false,
            open:false,
        })
    }
    handelModelOpen = ()=>{
        this.setState({
            open:true,
        })
    }
    handlemodelClose = ()=>{
        this.setState({
            open:false,
        })
    }
    
    onAddCard = ()=>{
        this.setState({
            add:true,
            
        })
    }
    oncardName = (event)=>{
            this.setState({
                cardName:event.target.value
            })
    }
    createCard = ()=>{
        axios.post(`https://api.trello.com/1/cards?idList=${this.props.listid}&name=${this.state.cardName}&key=${key}&token=${token}`)
        .then((res) => {
            const newCards = [...this.state.cards];
            newCards.push(res);
            this.setState({ cards: newCards,cardName:"", })
            this.gettingcards()

        })

    }
    onCreatecard =()=>{
        this.onAddCard()
        this.createCard()
        this.setState({
            cardName:'',
            addacard:false,
        })
    }
    gettingcards = ()=>{
        axios.get(`https://api.trello.com/1/lists/${this.props.listid}/cards?key=${key}&token=${token}`)
        .then(card => {
            this.setState({
                cards: card.data,
                error: false,
                cardName:""
            });
        }).catch((err) => {
            this.setState({
                cards: [],
                cardName:"",
                error: "Failed to load cards",
            });
        })
    }
    componentDidMount(){
        this.gettingcards()
    }

    deleteCard = (id)=>{
        axios.delete(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`)
        .then(res => res.data)
        .then((res) => {
            const newCards = this.state.cards.filter((card) => {
                return card.id !== id;
            })
            this.setState({ cards: newCards });
        })
}
    
  render() {
    // console.log(this.state.cardId);
    return (
      <>
            {
                this.state.cards?
                <>
                {
                    this.state.cards.map((data,index)=>{
                        return(
                            <>
                                <CostumBox >
                                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}} className='mb-2' key={data.id}>
                                        <Typography variant='p' id={data.id} onClick={()=>{
                                    this.setState({
                                        value:data.name,
                                        
                                        cardId:data.id
                                    })
                                    this.handelModelOpen()
                                }}>{data.name} </Typography>
                                        <DeleteOutlineRoundedIcon size="small" onClick={() => { this.deleteCard(data.id) }}></DeleteOutlineRoundedIcon>
                                    </div>
                                </CostumBox>
                                
                                {index==this.state.cards.length-1?<Dialog sx={{padding:'70px'}} open={this.state.open} onClose={this.handlemodelClose}>
                                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                        <DialogTitle key={data.id}>{this.state.value}</DialogTitle>
                                        <DialogActions><Button onClick={this.handlemodelClose}><CloseRoundedIcon></CloseRoundedIcon></Button></DialogActions>
                                    </div>
                                    <hr></hr>
                                    <Checklists cardId={this.state.cardId}></Checklists>
                                </Dialog>:null}
                            </>
                        )
                    })
                }
                </>:<></>
            }
           {
                this.state.addacard?
                <>
                 <TextField id="standard-basic" label="Enter Card Name" type={'textarea'} variant="standard" onChange={this.oncardName} />
                <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',marginTop:'8px'}}>
                <Button variant="contained" size='small' onClick={this.onCreatecard}>Add Card</Button>
                <CloseRoundedIcon onClick={this.handleClose}></CloseRoundedIcon>
                </div>
                </>
                : <Button variant="text" size='small' onClick={this.handelOpen} className='text-secondary'>+ Add a Card</Button>
            }
      </>
    )
  }
}
