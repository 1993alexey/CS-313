import React, {useEffect, useState} from 'react'
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
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
    const history = useHistory();

    useEffect(() => {
        getCart().then(val => {
            if (val && val.length)
                setCart(val)
            else
                history.push("/assignment3");
        })
    }, [true])

    function handleDelete(id) {
        const indexToDelete = cart.findIndex((item) => item.id == id)
        const newCart = [...cart]
        newCart.splice(indexToDelete, 1)
        setCart(newCart)
        saveCart(newCart)
    }

    return (
        <React.Fragment>
            <Button variant="contained" color="secondary" className={classes.viewCart} component={Link} to="/assignment3/checkout">	&nbsp;<CreditCardIcon />Proceed to checkout</Button>
            <Button color="primary" className={classes.viewCart} component={Link} to="/assignment3">	&nbsp;<ArrowBackIcon />Back to items</Button>
            <Items items={cart} handleDelete={handleDelete} />
        </React.Fragment>

    )
}