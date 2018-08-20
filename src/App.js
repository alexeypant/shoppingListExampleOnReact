import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      buyItems: ['bananas', 'carrots'],
      message: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearList = this.clearList.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
      message: '',
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const isOnTheList = this.state.buyItems.includes(this.state.input)
    if (isOnTheList) {
      this.setState({
      message: 'the item is already in the list',
      });
    } else {
      this.state.input !== '' && this.setState({
        input: '',
        buyItems: [this.state.input, ...this.state.buyItems],
      });
    }
  }

  removeItem = (item) => (e) => {
    e.preventDefault();
    const newBuyItems = this.state.buyItems.filter(it => it !== item);
    this.setState({
      buyItems: [...newBuyItems],
    });
    if (newBuyItems.length === 0) {
      this.setState({
        message: 'No items in your list, add some',
      });
    }
  }

  clearList = (e) => {
    e.preventDefault();
    this.setState({
      buyItems: [],
      message: 'No items in your list, add some',
    });
  }

  render() {
    const { buyItems, message } = this.state;
    return (
      <div>
        <header>
          <h1>Shopping List</h1>
          <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="sr-only" htmlFor="newItemInput">Add new item</label>
              <input value={this.state.input} type="text" className="form-control" placeholder="bread" onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </header>
        <div className="content">
          {
            (message !== '' || buyItems.length === 0 ) && <p className="message text-danger">{message}</p>
          }
          {
            buyItems.length > 0 && 
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                { buyItems.map(item => {
                    return (
                    <tr key={_.uniqueId()}>
                      <th scope="row">1</th>
                      <td>{item}</td>
                      <td className="text-right">
                        <button onClick={this.removeItem(item)} type="button" className="btn btn-info btn-sm">
                          Remove
                        </button>
                      </td>
                    </tr>
                    )
                  }) 
                }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2">&nbsp;</td>
                  <td className="text-right">
                    <button onClick={this.clearList} className="btn btn-danger btn-sm">Clear list</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          }
        </div>
      </div>
    )
  }
}

export default App;
