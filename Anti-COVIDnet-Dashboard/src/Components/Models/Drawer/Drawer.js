import React from 'react';
import classes from './Drawer.module.css'

const MyDrawer = (props) => {

    return (
        <div className={classes.drawer}>
            {props.children}
        </div>
    );
}

export default MyDrawer