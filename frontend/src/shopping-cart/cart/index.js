import React, {useEffect, useState} from 'react'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getCart, saveCart } from '../service'
import Items from '../items/index'

const useStyles = makeStyles((theme) => ({
    viewCart: {
        float: 'right',
        marginRight: 50
    }
}));

export default function Cart() {
    const classes = useStyles();
    const [cart, setCart] = useState([])

    useEffect(() => {
        getCart().then(val => setCart(val))
    }, [true])

    function handleDelete(id) {
        const newCart = cart.filter((item) => item.id !== id)
        setCart(newCart)
        saveCart(newCart)
    }

    return (
        <React.Fragment>
            <Button variant="contained" color="secondary" className={classes.viewCart} component={Link} to="/assignment3/checkout">	&nbsp;<CreditCardIcon />Proceed to checkout</Button>
            <Button  color="primary" className={classes.viewCart} component={Link} to="/assignment3">	&nbsp;<ArrowBackIcon />Back to items</Button>
            <Items items={cart} handleDelete={handleDelete} />
        </React.Fragment>

    )
}