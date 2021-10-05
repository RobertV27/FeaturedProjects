import React from 'react'

function NavButton(props){
    return (
            <div name = {props.name} onClick = {props.handleClick} style = {props.style}>
                <h2 name = {props.name}> {props.text} </h2>
            </div>
            
        )
    }

export default NavButton;