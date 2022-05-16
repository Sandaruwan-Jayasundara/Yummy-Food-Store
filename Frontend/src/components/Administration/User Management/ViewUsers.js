import React, {useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Button, IconButton, Tooltip } from "@material-ui/core";
// import Modal from "./Modal";
import "../../../stylesheets/formTitle.css";
import axios from "axios";
import { Modal, Form, ToggleButton, Dropdown } from "react-bootstrap";
import { Card, Container, Table } from "react-bootstrap";
import {
  FaEdit,
  FaEye,
  FaTrash,
  IoMdAddCircleOutline,
  MdEmail,
} from "react-icons/all";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function ViewUsers(props) {

  const [model, setModelView] = useState(false);
  const [Users, setUsers] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const [Notification, setNotification] = useState("");
  // const openPop = () => {
  //   setShowPop((prev) => !prev);
  // };

  //   const handleClose = () => setModelView(false);
  // const handleShow = () => setModelView(true);

useEffect(() => {
  axios
  .get("http://localhost:8070/user-management/display")
  .then((response) => {
    setUsers( response.data );

    console.log(response.data);
  })
  .catch(function (err) {
    console.log(err);
  });
},[]);
  
function onDelete(id,Email){
const data={
  Email
}

  axios.post(`http://localhost:8070/user-management/delete/${id}`,data).then(response =>{

    NotificationManager.success("Success", "Deleted");
    setTimeout(
        function () {
          window.location.href="/admin/um/view-users"
        }.bind(this),
        1000
    );
  })
  .catch(function(err){
      console.log(err);
  })
 
}


  return (
    <div>
      <Container className={"pt-3"}>
      <NotificationContainer />
        <Card className={"p-5 mb-3"}>
          <div className="text-center mb-2">
            <h1 className="form-titles ">USER MANAGEMENT</h1>
            <hr className="divide" />
          </div>
          <div>
            <Table
              striped
              bordered
              hover
              variant="dark"
              className={"text-center"}
            >
              <thead>
                <tr>
                  <th className={"table-data"}>Profile</th>
                  <th className={"table-data"}>User Name</th>
                  <th className={"table-data"}>Role</th>
                  <th className={"table-data"}>Branch</th>
                  <th>
                    <Tooltip title="Add" placement="top">
                      <IconButton aria-label="delete" href={"/admin/um/add-user"}>
                        <IoMdAddCircleOutline color={"white"} />
                      </IconButton>
                    </Tooltip>
                  </th>
                </tr>
              </thead>
              {
                Users.map((data, key) => (
              
              <tbody>
                <tr>
                

                  <td className={"table-data"}>
                    <Avatar
                      style={{
                        width:'80px', height:'80px'
                      }}
                      alt="Remy Sharp"
                      src={`http://localhost:3000/Profile/${data.Profile}`}
                      className={"table-avatar"}
                    />
                  </td>
                  <td className={"table-data"}>{data.FirstName}</td>
                  <td className={"table-data"}>{data.Role}</td>
                  <td className={"table-data"}>{data.Branch}</td>
                  <td>
                    {" "}
                    <Tooltip
                      title="Edit"
                      className="table-icon"
                      style={{
                        color: "red",
                      }}
                    >
                      <Link to={`/admin/um/update-user/${data._id}`}>
                        <FaEdit color={"white"} />
                      </Link>
                    </Tooltip>

                    <Tooltip
                      title="Delete"
                      className="table-icon"
                      style={{
                        color: "red",
                      }}
                    >
                      <Link type="submit" onClick={() => onDelete(data._id, data.Email)} >
                 
                        <FaTrash color={"white"} />
                      </Link>
                    </Tooltip>


                    <Tooltip
                      title="View"
                      className="table-icon"
                      style={{
                        color: "red",
                      }}
                    >
                      <Link to={`/admin/um/view-user-details/${data._id}`}>
                        <FaEye color={"white"} />
                      </Link>
                    </Tooltip>

                    <Tooltip
                      title="Contact"
                      className="table-icon"
                      style={{
                        color: "red",
                      }}
                    >
                      <Link to={`/admin/um/contact-user/${data._id}`}>
                        <MdEmail color={"white"} />
                      </Link>
                    </Tooltip>

                  </td>
                </tr>
              </tbody>
            ))}
            </Table>
          </div>
        </Card>
      </Container>





{/* 

      <Modal show={model} onHide={handleClose} animation={true}>
        <Modal.Header className={"d-flex justify-content-center"}>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label> When you delete this user, all user details are removed. User
                  does not allow to login to the system.</Form.Label>
        </Modal.Body>
        <Modal.Footer className={"d-flex justify-content-center"}>
          <Button
            variant="primary"
            // startIcon={<MdAddShoppingCart />}
            type={"submit"}
            onClick={onDelete}
            style={{ backgroundColor: "#e13340", color: "white" }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal> */}










    </div>
  );
}

export default ViewUsers;
