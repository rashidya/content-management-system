/* eslint-disable no-restricted-globals */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { useState, useEffect } from "react";
import { deletePost } from '../../services/AdminPageServices';



export default function DiaryCard(props) {

    const [text, setText] = useState("");
    const [label, setLabel] = useState("SHOW MORE");
    const [visibility,setVisibility]=useState("none");



    useEffect(() => {
        if (props.description.length < 100) {
            setText(props.description);
            setVisibility("none");
        } else {
            var textTemp=props.description.substring(0, 100);
            setText(textTemp + "...");
            setVisibility("block");
        }
    },[props.description]);

    function handleShowMore() {

        if (label === "SHOW MORE") {

            setText(props.description);

        } else {
            setText(props.description.substring(0   , 100) + "...");

        }

        var tempLabel = (label === "SHOW MORE") ? "SHOW LESS" : "SHOW MORE";
        setLabel(tempLabel);

    }

   


    return (

        <Card sx={{ maxWidth: 750,minWidth:275,minHeight:180}} style={{backgroundColor:props.color}}>
             <CardHeader
                title={props.title}
                subheader={props.subTitle}
            />
            <CardContent style={{paddingTop:'0'}}>
                <Typography>
                    {text}
                </Typography>
            </CardContent>
            <CardActions style={{display:'flex',justifyContent:'flex-end'}}>
                <Button size="small" variant='contained' style={{display:visibility}} onClick={handleShowMore} >{label}</Button>
                <Button size="small" variant='contained' style={{display:props.visible,backgroundColor:'green'}} onClick={props.edit} >Edit</Button>
                <Button size="small" variant='contained' style={{display:props.visible,backgroundColor:'red'}} onClick={props.delete} >Delete</Button>
            </CardActions>
        </Card>
    );
}

