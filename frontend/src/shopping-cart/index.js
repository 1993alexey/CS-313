import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import ShoppingItem from './items/item/index'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Items from './items/index'
import { getCart, getItems } from './service'
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 50
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    viewCart: {
        float: 'right',
        marginRight: 50
    }
}));

export default function ShoppingCart() {
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const [items, setItems] = useState([])

    function handleAdd(item) {
        setCart([...cart, item])
    }

    useEffect(() => {
        getItems().then(val => {
            setItems(val)
        })

        getCart().then(val => {
            setCart(val)
        })
    }, [true])
    
    return (
        <React.Fragment>
            <Button variant="contained" color="secondary" className={classes.viewCart} component={Link} to="/assignment3/cart" disabled={!cart.length}>
                {cart.length ? cart.length : ''} 	&nbsp;<ShoppingCartIcon />View Cart
            </Button>
            <Items handleAdd={handleAdd} items={items}/>
        </React.Fragment>
        
    )
}