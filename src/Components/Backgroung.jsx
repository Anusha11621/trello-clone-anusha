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

let colorArray = [
    {
        key : 'Blue',
        color : 'Blue'
    },
    {
        key : 'Pink',
        color : 'Pink'
    },
    {
        key : 'Green',
        color : 'Green'
    },
    {
        key : 'Red',
        color : 'Red'
    },
    {
        key : 'Gray',
        color : 'Gray'
    },
    {
        key : 'Yellow',
        color : 'Yellow'
    },
    {
        key : 'Orange',
        color : 'Orange'
    },
    {
        key : 'DarkPink',
        color : 'rgb(205, 90, 145)'
    },
]
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
   

  render() {
   
    return (
  <>
  <Typography  sx={{textAlign:'left'}} pt={1} ml={2} mb={1} style={{color:"gray"}}><b>Background</b></Typography>
    <div className='d-flex gap-2 flex-wrap justify-content-center'> 
        {
            colorArray.map(data => 
                <div  style={{background : `${data.color}`, width:'80px', height: '40px', borderRadius:'10px'}}></div>
            )
        }    
    </div>
  </>
    )
  }
}
