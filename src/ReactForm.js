import React, { Component } from "react";

export default class ReactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: {
        id: "",
        name: "",
        phone: "",
        email: "",
      },
      errValue: {
        id: "",
        name: "",
        phone: "",
        email: "",
      },
      isSubmit: false,
      isSubmitUpdate: false,
    };
  }

  handleChangeInput = (e) => {
    // e.target đại diện cho thẻ input

    let tag = e.target;

    let nameInput = tag.name;
    let newValue = { ...this.state.students };
    newValue[nameInput] = tag.value;
    console.log(tag.value);
    console.log(this.state.students);
    // xử lý err
    let newErrValue = { ...this.state.errValue };
    let message = "";

    if (newValue[nameInput] === "") {
      message = `${nameInput} cannot be blank !`;
    } else {
      if (nameInput) {
        switch (nameInput) {
          case "id":
            {
              let regex = /^(?:[1-9]\d{0,2}|1000000)$/;
              if (!regex.test(newValue[nameInput])) {
                message = "* Trường này chỉ nhận số";
              }
            }
            break;
          case "name":
            {
              let regex = /^[a-zA-Z\s]+$/;
              if (!regex.test(newValue[nameInput])) {
                message = "* Trường này chỉ nhập chữ";
              }
            }
            break;
          case "phone":
            {
              let regex = /^\d{10}$/;
              if (!regex.test(newValue[nameInput])) {
                message = "* Trường này chỉ nhập 10 chữ số";
              }
            }
            break;
          case "email":
            {
              let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
              if (!regex.test(newValue[nameInput])) {
                message = "* Trường này chỉ chuẩn email";
              }
            }
            break;
          default: {
          }
        }
      }
    }
    newErrValue[nameInput] = message;

    // Xử lý nút submit
    // Khi tất cả các giá trị err mà chỉ cần 1 trường có lỗi =>> lỗi
    // chỉ 1 trường students mà "" => lỗi
    let valid = true;
    for (let key in newErrValue) {
      if (newErrValue[key] !== "") {
        valid = false;
        break;
      }
    }

    for (let key in newValue) {
      if (newValue[key] === "") {
        valid = false;
        break;
      }
    }

    this.setState({
      students: newValue,
      errValue: newErrValue,
      isSubmit: valid,
      isSubmitUpdate: valid,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.isSubmit) {
      this.props.onAddStudent(this.state.students);
      this.setState({
        students: {
          id: "",
          name: "",
          phone: "",
          email: "",
        },
        errValue: {
          id: "",
          name: "",
          phone: "",
          email: "",
        },
        isSubmit: false,
        isSubmitUpdate: false,
      });
    }
  };
  // componentDidUpdate(prevProps) {
  //   // Check if props have changed
  //   if (this.props.selectedStudent !== prevProps.selectedStudent) {
  //     // Update state based on new props
  //     this.setState({
  //       students: {
  //         id: this.props.selectedStudent.id || "",
  //         name: this.props.selectedStudent.name || "",
  //         phone: this.props.selectedStudent.phone || "",
  //         email: this.props.selectedStudent.email || "",
  //       },
  //       errValue: {
  //         id: "",
  //         name: "",
  //         phone: "",
  //         email: "",
  //       },
  //       isSubmit: false,
  //       isSubmitUpdate: false,
  //     });
  //   }
  // }
  componentDidUpdate(prevProps) {
    // Check if props have changed
    if (this.props.selectedStudent !== prevProps.selectedStudent) {
      // Update state based on new props
      const { id, name, phone, email } = this.props.selectedStudent || {};
      this.setState({
        students: {
          id: id || "",
          name: name || "",
          phone: phone || "",
          email: email || "",
        },
        errValue: {
          id: "",
          name: "",
          phone: "",
          email: "",
        },
        isSubmit: false,
      });
    }
  }

  render() {
    const { id, name, phone, email } = this.state.students;
    return (
      <div>
        <h3>Bài tập react form</h3>
        <div className="container mt-5">
          <h2>Form Nhập Thông Tin Sinh viên</h2>
          <form onSubmit={this.handleSubmit} className="border rounded-2 p-4">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">ID</label>
                  <input
                    data-type="number"
                    type="text"
                    className="form-control"
                    name="id"
                    id="xinchaobc64"
                    placeholder="Nhập ID sinh viên"
                    onInput={this.handleChangeInput}
                    value={id}
                  />
                  <p style={{ height: "30px" }} className="text-danger">
                    {this.state.errValue.id}
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Tên Sinh Viên</label>
                  <input
                    type="text"
                    data-type="string"
                    className="form-control"
                    name="name"
                    placeholder="Nhập tên sinh viên"
                    onInput={this.handleChangeInput}
                    // value={this.state.students.name}
                    value={name}
                  />
                  <p style={{ height: "30px" }} className="text-danger">
                    {this.state.errValue.name}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Số Điện Thoại</label>
                  <input
                    type="string"
                    className="form-control"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    // value={this.state.students.phone}
                    value={phone}
                    onInput={this.handleChangeInput}
                  />
                  <p style={{ height: "30px" }} className="text-danger">
                    {this.state.errValue.phone}
                  </p>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    // value={this.state.students.email}
                    value={email}
                    placeholder="Nhập email sinh viên"
                    onInput={this.handleChangeInput}
                  />
                  <p style={{ height: "30px" }} className="text-danger">
                    {this.state.errValue.email}
                  </p>
                </div>
              </div>
            </div>
            <button
              disabled={!this.state.isSubmit}
              type="submit"
              className="btn btn-primary"
            >
              Thêm Sinh Viên
            </button>
            <button
              disabled={!this.state.isSubmitUpdate}
              className="btn btn-warning"
              onClick={() => this.props.onEditStudent(this.state.students)}
            >
              Sửa Sinh Viên
            </button>
          </form>
        </div>
      </div>
    );
  }
}
