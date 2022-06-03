import { useEffect, useState } from "react";
import { Form, FormCheck, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { useDispatch, useSelector } from "react-redux";
import { fetchData, sendData, checkedStatus } from "../Redux/Actions";
import './Customers.css'

function Customers() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const toggleStatus = () => setStatus(!status);
  const [isChecked, setIsChecked] = useState(false);
  const [countChecked, setCountChecked] = useState(0);

  const dispatch = useDispatch();
  const users = useSelector((state) => {
    return state.users;
  });

  const handleChange = (event) => {
    setIsChecked((current) => !current);
    if (event.target.checked) {
      setCountChecked(countChecked + 1);
    } else {
      setCountChecked(countChecked - 1);
    }
    dispatch(checkedStatus(isChecked));
  };

  useEffect(() => {
    const getRequest = async () => {
      const response = await fetch("https://kchris.users.challenge.dev.monospacelabs.com/users", {
        "Content-Type": "application/json",
      });
      const data = await response.json()
      if (response.ok) {
        return dispatch(fetchData(data)) 
      }
      if (response.status !== 200) {
        throw new Error(response);
      }
    };
    getRequest();
  }, [dispatch]);

  useEffect(() => {
    if (status === "") {
      return;
    }
    const putRequest = async () => {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ active: status }),
      };
      const response = await fetch(
        `https://kchris.users.challenge.dev.monospacelabs.com/users/${id}`,
        requestOptions,
        putRequest
      );
      if (response.ok) {
        return dispatch(sendData({ id, status })); 
      }
      if (response.status !== 200) {
        throw new Error(response);
      }
    };
    putRequest();
  }, [id, status, dispatch]);

  let classByType = (props) => {
    let newType = props;
    if (newType.includes("Employee")) {
      newType = JSON.stringify(newType).match("Employee").toString();
      newType = newType.replace("Employee", "");
      return <h6 className=" box-employee">{newType}</h6>;
    } else if (newType.includes("Guest")) {
      newType = JSON.stringify(newType).match("Guest").toString();
      newType = newType.replace("Guest", "");
      return <h6 className=" box-guest">{newType}</h6>;
    } else if (newType.includes("Stakeholder")) {
      newType = JSON.stringify(newType).match("Stakeholder").toString();
      newType = newType.replace("Stakeholder", "");
      return <h6 className=" box-stakeholder">{newType}</h6>;
    } else if (newType.includes("Supervisor")) {
      newType = JSON.stringify(newType).match("Supervisor").toString();
      newType = newType.replace("Supervisor", "");
      return <h6 className=" box-supervisor">{newType}</h6>;
    }
  };

  return (
    <Table className="position-absolute top-50 start-50 translate-middle">
      <thead>
        <tr>
          <th className="user-icon-cel">
            <FontAwesomeIcon
              icon={regular("circle-user")}
              size="2xl"
              className="user-icon"
            />
            Users
          </th>
          <th></th>
          <th></th>
          <th></th>
          <th className="question-col">
            {countChecked} selected
            <FontAwesomeIcon
              icon={regular("circle-question")}
              size="lg"
              className="question-icon"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="header">
          <td>
            <FormCheck id="flexCheckDefault" className="formchecker" />
            <h6 className="type-form">TYPE</h6>
          </td>
          <td>NAME</td>
          <td>EMAIL</td>
          <td>TELEPHONE</td>
          <td className="status-col">STATUS</td>
        </tr>
        {users.map((user) => (
          <tr key={user.id} className="user-text">
            <td>
              <FormCheck
                id="flexCheckDefault"
                value={isChecked}
                onChange={handleChange}
                className="formchecker"
              />
              {classByType(user.type)}
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <Form>
                <Form.Check
                  className="status-col"
                  type="switch"
                  onClick={() => setId(user.id)}
                  onChange={() => toggleStatus(user.active)}
                />
              </Form>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Customers;
