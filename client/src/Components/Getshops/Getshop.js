import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import ShopImage from '../../utils/assets/shop.jpg'
import { useStyles } from '../../utils/use-style/useStyle'
import { getshop } from '../../utils/service-layer/shops'

function Shops(props) {

    const classes = useStyles();
    const shopid = props.shopid;
    let rshop = [];

    props.shops.map(shop => {
        if (shop.shopid === shopid) {
            rshop = shop;
        }
    })

    return (
        <div className="makeStyles-root-1 row">
            <Paper className={classes.paper3}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="complex" src={ShopImage} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container className="text-align-left">
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    <legend> {rshop.shopName}</legend>
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    Shop Owner : {rshop.shopOwner}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    Shop Address : {rshop.shopAddress}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    Contact No. : {rshop.shopContactNo}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default class Getshop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shopid: '',
            shops: [],
        }
    }

    componentDidMount() {
        var self = this
        getshop(this.props.location.state.shopid, (response) => {
            self.setState({ shops: response.data.shop.shops })
        })
    }

    render() {
        return (
            <div className="margin-top-50px">
                <Shops shops={this.state.shops} shopid={this.props.location.state.shopid} />
            </div>
        )
    }
}