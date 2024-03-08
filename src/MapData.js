import React, { Component } from "react";

class MapData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;

    // Update the search state and log the updated value using a callback
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (typeof this.props.onFilterData === "function") {
          // Pass the updated value directly from the callback
          this.props.onFilterData(this.state.search);
        } else {
          console.error("onFilterData is not a function in props");
        }
      }
    );
  };

  render() {
    return (
      <div className="text-center container mt-5">
        <input
          type="text"
          name="search"
          className="form-control border-danger"
          value={this.state.search}
          onChange={this.handleChangeInput}
          placeholder="Hãy Nhập Tên Sinh Viên Cần Tìm Vào Ô Input"
        />
      </div>
    );
  }
}

export default MapData;
