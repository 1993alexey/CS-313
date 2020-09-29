import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ShoppingItem(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">{props.item.title}</Typography>
                <Typography className={classes.pos} color="textSecondary">price: ${props.item.price}</Typography>
                <Typography variant="body2" component="p">{props.item.description}</Typography>
            </CardContent>
            <CardActions>
                {props.handleAdd &&
                <Button size="small" color="primary" onClick={() => props.handleAdd(props.item)}>
                    <AddShoppingCartIcon></AddShoppingCartIcon>Add to cart
                </Button>}
                
                {props.handleDelete &&
                <Button size="small" variant="contained" color="primary" onClick={() => props.handleDelete(props.item.id)}>
                    <RemoveShoppingCartIcon />Remove
                </Button>}
            </CardActions>
        </Card>
    )
}