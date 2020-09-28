import React from 'react'
import Grid from '@material-ui/core/Grid';
import ShoppingItem from './item/index'
import { makeStyles } from '@material-ui/core/styles';

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

export default function Items(props) {
    const classes = useStyles();
    const items = props.items.map(item => {
        return (
            <Grid item sm={3} key={item.id}>
                <ShoppingItem handleAdd={props.handleAdd} handleDelete={props.handleDelete} item={item}></ShoppingItem>
            </Grid>
        )
    })

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems="center">
                {items}
            </Grid>
        </div>
    )
}