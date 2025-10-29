import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser, createUser } from "../api/userApi";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
// import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";

import { MdDelete } from "react-icons/md";

function MyVerticallyCenteredModal(props) {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", isActive: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return; 
    }

    try {
      await createUser(user);
      alert("User created successfully!");
      setUser({ name: "", email: "", isActive: true }); 
      props.onHide(); 
    } catch (error) {
      console.error(error);
      alert("Failed to create user. Please try again.");
    } finally {
      setValidated(true);
    }
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Cancel</Button>
          <Button type="submit">Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    console.log("fetch");

    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div className="container">
      <h2>User Management</h2>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        + Add User
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>{user.isActive ? "Yes" : "No"}</td>
                <td>
                  <Stack direction="horizontal" gap={2}>
                    <Link to={`/users/${user._id}`}>
                      <Button variant="secondary">view</Button>
                    </Link>

                    <Link to={`/users/${user._id}/edit`}>
                      <Button variant="warning">edit</Button>
                    </Link>

                    <Button
                      variant="danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDelete />
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default UserList;