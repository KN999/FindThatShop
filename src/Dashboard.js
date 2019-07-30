import React, { Component }from 'react';
import { useState } from 'react'
import { getshop } from './service-layer/shops'
import { connect } from 'react-redux';
import './Dashboard.css'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Shop from './shop.jpg'
import add from './addSign.png'
import AddShop from './AddShop'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000
    },
    paper2: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 160
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    
}));

function AddShopButton (props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper2}>
            <Grid container spacing={1} >
                <Grid item>
                    <ButtonBase className={classes.image} onClick={props.onClick}>
                        <img className={classes.img} alt="complex" src={add} />
                    </ButtonBase>
                </Grid>
            </Grid>
        </Paper>
    )
}


function ComplexGrid(props) {

    const classes = useStyles();
    const [addshop, setaddshop] = useState(false);
    const FetchShopDetails = (shopid)=> {
        
        console.log("Clicked",shopid);
        {props.redirect(shopid)};
    }

    return (
        <div className={classes.root}>
            {props.shops.map(shop => (
                <Paper className={classes.paper}>
                    <Grid container spacing={2} >
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={Shop} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container className="text-align-left">
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        <legend>
                                            {shop.shopName}
                                        </legend>
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Owner : {shop.shopOwner}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Address : {shop.shopAddress}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1">
                                        Contact Number : {shop.shopContactNo}
                                    </Typography>
                                </Grid>
                                <Button onClick={ ()=> {FetchShopDetails(shop.shopid)}} >View Details</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
            {addshop === true ? <AddShop onClick={ () => setaddshop(false)}/> : <AddShopButton onClick={ () => setaddshop(true) }/>}
        </div>
    );
}

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shops: [],
        }
    }

    componentDidMount() {
        var self = this
        getshop('KN99', (response) => {
            self.setState({ shops: response.data.shop.shops })
        })

    }

    render() {

        const Redirect = (shopid) => {
            console.log("$$$$$$$$$",shopid)
            const { history } = this.props;
            history.push({
                    pathname: '/Dashboard/getshop/',
                    search: '?shopid='+{shopid},
                    state: { shopid: shopid }
                  })
        }

        console.log(this.props.user)
        console.log(this.state.shops)
        return (
            <div className="margin-100px">
                <h1>Shops</h1>
                <ComplexGrid shops={this.state.shops} redirect = {Redirect}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state
    }
};

export default connect(mapStateToProps)(Dashboard);