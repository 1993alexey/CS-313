import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuIcon from '@material-ui/icons/Menu';
import range from 'lodash/range';
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    stickyMenu: {
        position: 'fixed',
        top: 10,
        left: 10
    }
});

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {range(3, 12).map(item => (
                    <ListItem button key={`Assignment ${item}`} component={Link} to={`/assignment${item}`}>
                        <ListItemIcon><AssignmentIcon /></ListItemIcon>
                        <ListItemText primary={`Assignment ${item}`} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key="left">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer('left', true)}
                    edge="end"
                    className={clsx(classes.menuButton), clsx(classes.stickyMenu)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="left" open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
