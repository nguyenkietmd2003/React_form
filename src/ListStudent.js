import React, { Component } from "react";

export default class List extends Component {
  render() {
    const { students, onEditStudent, onDeleteStudent } = this.props;
    if (!Array.isArray(students)) {
      return <div>Error: không có dữ liệu </div>;
    }
    return (
      <table className="table container mt-4 border border-danger border-2">
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>phone</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((sinhVien) => (
            <tr key={sinhVien.id}>
              <td>{sinhVien.id}</td>
              <td>{sinhVien.name}</td>
              <td>{sinhVien.phone}</td>
              <td>{sinhVien.email}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => onEditStudent(sinhVien)}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteStudent(sinhVien.id)}
                  className="btn btn-success"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
