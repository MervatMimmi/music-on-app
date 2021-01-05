import React from 'react';
import {Dialog, DialogTitle, DialogContent,} from '@material-ui/core';

const DialogFavorit =({selected, dialogOpen}) => {

    console.log(selected);

    return(
        <div>
        <Dialog open = {dialogOpen}>
            <DialogTitle>
                hej
            </DialogTitle>
        </Dialog>
        </div>
    )
}

export default DialogFavorit;


