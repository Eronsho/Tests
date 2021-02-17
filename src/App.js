import React, { Component } from "react";
import load from "./components/load";
import ActiveUser from "./components/ActiveUser";
import Searchbar from "./components/SearchBar";
import Toolbar from "./components/Toolbar";
import Pagination from "./components/Pagination";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentData: null,
      active: 0,
      initialData: {},
      term: "",
      activePage: 1,
      dataType: null,
      isLoadingData: false,
      isSorted: false,
    };
  }

  switchDataType(type) {
    if (this.state.initialData.hasOwnProperty(type)) {
      this.setState({
        currentData: this.state.initialData[type],
        dataType: type,
        term: "",
      });
    } else {
      this.setState({
        currentData: null,
        isLoadingData: true,
      });

      load(type).then((users) => {
        this.setState({
          isLoadingData: false,
        });

        this.state.initialData[type] = JSON.parse(users);
        this.setState({
          currentData: this.state.initialData[type],
          dataType: type,
          term: "",
        });
      });
    }
  }

  updateData(config) {
    this.setState(config);
  }

  render() {
    return (
      <div className="app container-fluid">
        <div className="row-fluid">
          <div className="btn-group col-sm-12">
            <button
              className="btn btn-danger col-sm-6"
              onClick={() => this.switchDataType("min")}
            >
              MiniSet
            </button>
            <button
              className="btn btn-danger col-sm-6"
              onClick={() => this.switchDataType("big")}
            >
              BigSet
            </button>
          </div>

          <div className="col-sm-12">
            <Searchbar
              term={this.state.term}
              currentData={this.state.currentData}
              initialData={this.state.initialData}
              dataType={this.state.dataType}
              update={this.updateData.bind(this)}
            />
          </div>

          <div className="col-sm-12">
            <table className="user-list table table-striped table-hover">
              <Toolbar
                data={this.state.currentData}
                update={this.updateData.bind(this)}
                isSortedFlag={this.state.isSorted}
              />
              <Pagination
                data={this.state.currentData}
                currentPage={this.state.activePage}
                update={this.updateData.bind(this)}
                flagLoad={this.state.isLoadingData}
              />
            </table>
          </div>

          <div className="col-sm-12">
            <ActiveUser
              data={this.state.currentData}
              active={this.state.active}
            />
          </div>
        </div>
      </div>
    );
  }
}
