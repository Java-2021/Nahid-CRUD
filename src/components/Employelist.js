import React from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import axios from "axios";
import { useState, useEffect } from "react";



function EmployeList(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const GetData = async () => {
      const result = await axios("http://localhost:1200/user/getallusers");
      setData(result.data);
    
    };
    GetData();
  }, []);
  const deleteeployee = (id) => {
      
    axios
      .delete ("http://localhost:1200/user/delete?id=" + id)
      .then((result) => {
        props.history.push("/user/getallusers");
      });
  };
  const editemployee = (id) => {
    props.history.push({
      pathname: "/Editemployee" + id,
    });
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i> Employee List
            </CardHeader>
            <CardBody>
              <Table hover bordered striped responsive size="sm">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>salary</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => {
                    return (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.salary}</td>
                        <td>
                          <div class="btn-group">
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                editemployee(item.Id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                deleteeployee(item.Id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EmployeList;
