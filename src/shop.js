import React, { Component } from 'react';
import './shop.css';

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          id : '',
          name : '',
          address : '',
          shops: [],
          items : [], 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
      console.log("111111111111111111111",this.state)
        return (
            <div>
              <div className="jumbotron">
                <h1>Shops</h1>
              </div>
                <Shop shops={this.state.shops} />
                <form onSubmit={this.handleSubmit} className="align-webkit-center margin-30px"> 
                  <div className="form-group">
                    <div className="col-sm-3">
                      <input
                        id="shop-name"
                        onChange={this.handleChange}
                        value={this.state.name}
                        name = "name"
                        className="form-control"
                        placeholder="Name of Shop"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-3">
                      <input
                        id="shop-address"
                        onChange={this.handleChange}
                        value={this.state.address}
                        name = "address"
                        className="form-control"
                        placeholder="Address of Shop"
                      />
                    </div>
                    </div>
                    <button className="btn btn-primary">
                        Add Shop
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
      this.setState({ [e.target.name] : e.target.value, });
    }
    
    handleSubmit(e) {
        e.preventDefault();
        const newShop = {
          id : JSON.stringify(this.state.shops.length + 1),
          name : this.state.name,
          address : this.state.address,
          items : this.state.items,
        };

        this.setState(state => ({
          shops: state.shops.concat(newShop),
          id : '',
          name : '',
          address : '',
        }));
    }
}

class Shop extends React.Component  {
  constructor(props) {
      super(props);
      this.state = { 
        id : '',
        name : '',
        price : '',
        quantity : '',
        weight : '',
        items : [],
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  render() {
    console.log("$$$$$$$$$$$$",this.state)
      return (
          <div>
            {this.props.shops.map(shop => (
            <div key={shop.id}>
              <h3>{shop.name}</h3>
              <List items={this.state.items} />
              <form onSubmit={this.handleSubmit} className="align-webkit-center margin-30px">
                <div className="form-group">
                  <div className="col-sm-3">
                    <input
                      id="item-name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      name = "name"
                      className="form-control"
                      placeholder="Item Name"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-3">
                    <input
                      id="item-price"
                      onChange={this.handleChange}
                      value={this.state.price}
                      name = "price"
                      className="form-control"
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-3">
                    <input
                      id="item-quantity"
                      onChange={this.handleChange}
                      value={this.state.quantity}
                      name = "quantity"
                      className="form-control"
                      placeholder="Quantity"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-3">
                    <input
                      id="item-weight"
                      onChange={this.handleChange}
                      value={this.state.weight}
                      name = "weight"
                      className="form-control"
                      placeholder="Weight"
                    />
                  </div>
                </div>
                  <button className="btn btn-primary">
                      Add Item
                  </button>
              </form>
            </div>
            ))}
          </div>
      );
  }
  
  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value, });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id : (this.state.items.length + 1),
      name : this.state.name,
      price : this.state.price,
      quantity : this.state.quantity,
      weight : this.state.weight,
    };

    this.setState(state => ({
      items: state.items.concat(newItem),
      id : '',
      name : '',
      price : '',
      quantity : '',
      weight : '',
    }));
  }
}

  
class List extends React.Component {
    render() {
      return (
        <div>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {this.props.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
}