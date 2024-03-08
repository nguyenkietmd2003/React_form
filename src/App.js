import React, { Component } from "react";
import ReactForm from "./ReactForm";
import List from "./ListStudent";
import MapData from "./MapData";

export default class App extends Component {
  state = {
    arrStudents: [
      {
        id: 1,
        name: "name",
        phone: "0123456789",
        email: "hsa@gmail.com",
      },
      {
        id: 2,
        name: "name",
        phone: "0123456789",
        email: "hsb@gmail.com",
      },
    ],
    selectedStudent: null,
    dataSearch: "",
    filteredStudents: {},
  };
  handleEditClick = (student) => {
    // Sử dụng một hàm callback bên trong setState để đảm bảo hành vi đúng
    setTimeout(() => {
      this.setState({
        selectedStudent: student,
      });
    });
  };
  handleAddStudent = (newStudent) => {
    this.setState((prevState) => ({
      arrStudents: [...prevState.arrStudents, newStudent],
    }));
  };

  // handleEditStudent = (editedStudent) => {
  //   this.setState(
  //     (prevState) => ({
  //       arrStudents: prevState.arrStudents.map((student) =>
  //         student.id === editedStudent.id ? editedStudent : student
  //       ),
  //     }),
  //     console.log(this.state.arrStudents, " ArrStudent after Update")
  //   );
  // };

  handleEditStudent = (editedStudent) => {
    this.setState((prevState) => ({
      arrStudents: prevState.arrStudents.map((student) =>
        student.id === editedStudent.id ? editedStudent : student
      ),
      selectedStudent: null, // Reset selectedStudent after editing
    }));
  };

  handleDeleteStudent = (studentId) => {
    this.setState((prevState) => ({
      arrStudents: prevState.arrStudents.filter(
        (student) => student.id !== studentId
      ),
    }));
  };
  //
  handleFilterData = (data) => {
    this.setState((prevState) => {
      let arr = prevState.arrStudents;
      let result = arr.filter((user) => user.name.includes(data));

      return {
        arrStudents: result,
        // Thêm prop mới
      };
    });
  };

  render() {
    return (
      <div>
        <ReactForm
          onAddStudent={this.handleAddStudent}
          onEditStudent={this.handleEditStudent}
          onDeleteStudent={this.handleDeleteStudent}
          selectedStudent={this.state.selectedStudent}
        />

        <MapData
          students={this.state.arrStudents}
          onFilterData={this.handleFilterData}
        />

        <List
          students={this.state.arrStudents || this.state.filteredStudents}
          onEditStudent={this.handleEditClick}
          onDeleteStudent={this.handleDeleteStudent}
        />
      </div>
    );
  }
}
