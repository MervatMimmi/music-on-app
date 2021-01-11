import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Typography}  from '@material-ui/core/';
import logo from '../../Image/logo.jpg';

const useStyles = makeStyles((theme) => ({
    top: {
        paddingLeft: '500px',
        display: 'flex',
        flexDirection: 'row',
        color: '#e7e7de',
    },
    title: {
        paddingTop: '10px',
        //paddingRight: '15px'
    },
    logo: {
        maxHeight: '55px', 
        paddingLeft: '15px',
    },
}))

const Header = () => {
    const classes = useStyles();

    return (
        <Grid className = {classes.top}>
            <Typography variant = 'h6' className = {classes.title} style = {{textAlign: 'center'}}>
                SoundWave
            </Typography>
            <Grid className = {classes.logo}>
                <img src ={logo} alt = 'logo' className = {classes.logo} />
            </Grid>
        </Grid>
    )
}

export default Header;