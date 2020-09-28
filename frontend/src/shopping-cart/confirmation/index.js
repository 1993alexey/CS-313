import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Items from '../items/index'

export default function Confirmation(props) {
    const addressItems = Object.keys(props.address).map(key => {
        return (
            <ListItem>{key}: {props.address[key]}</ListItem>
        )
    })
    return (
        <React.Fragment>
            <h1 style={{textAlign: 'center'}}>Thank you for your order</h1>
            <Items items={props.items} />
            <List style={{ margin: 38 }}>
                <ListItem><h2>Your items will be shipped to</h2></ListItem>
                {addressItems}
            </List>
        </React.Fragment>
    )
}