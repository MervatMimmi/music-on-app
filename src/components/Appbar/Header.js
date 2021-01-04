import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography  from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    title: {
        paddingLeft: '500px',
        display: 'none',
        color: '#e7e7de',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}))

const Header = ({title}) => {
    const classes = useStyles();

    return (
        <Typography className = {classes.title}
            variant = 'h6'>
            Home
        </Typography>
    )
}

export default Header;