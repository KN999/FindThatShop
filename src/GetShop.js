import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import shop from './shop.jpg'
import { getshop } from './service-layer/shops'
import { getitem } from './service-layer/inventory'
import './GetShop.css'
import add from './addSign.png'
import AddItem from './AddItem'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
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

function AddItemButton (props) {
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
    const [additem, setadditem] = useState(false);

    return (
        <div className="makeStyles-root-1 row">
            {props.items.map(Item=>(
                <Paper className={classes.paper}>
                <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="complex" src={shop} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container className="text-align-left">
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                            <legend> {Item.itemName}</legend>
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            Mass : {Item.itemMass}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1">
                            Quantity : {Item.itemQuantity}
                        </Typography>
                    </Grid>
                    </Grid>
                    <Grid item>
                    <Typography variant="subtitle1">₹{Item.itemPrice}</Typography>
                    </Grid>
                </Grid>
                </Grid>
            </Paper>
            ))} 
            {additem === true ? <AddItem onClick={ () => setadditem(false)} shopid={props.shopid}/> : <AddItemButton onClick={ () => setadditem(true) }/>}
        </div>
    );
}
  
export default class GetShop extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            shopid:'',
            shops : [],
            items : []
        }
    }

    componentDidMount() {
        var self = this

        getitem(this.props.location.state.shopid, (response) => {
            self.setState({items: response.data.item.items})
        })
    }

    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
        
    }

    render() {
        return(
            <div className="margin-top-50px">
                <ComplexGrid items={this.state.items} shopid = {this.props.location.state.shopid}/>
            </div>
        )
    }
}
