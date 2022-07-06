import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./spinner";
import Loader2 from "./spinner2";
import styles from "./form.module.css";

function BasicExample() {
  let token = "";
  token = process.env.REACT_APP_TOKEN;
  const [val, setVal] = useState("");
  const [res, setRes] = useState([]);
  const [newlength, setNewLength] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const getRepoName = async (e) => {
    e.preventDefault();
    if (!val) {
      window.alert("UserBox cant be empty");
      return;
    }
    if (!token) {
      window.alert(
        "Create Token on Git Hub Account First and paste it into .env.local file in root folder"
      );
      return;
    }

    setRes([]);
    setLoading(true);

    const headers = {
      Authorization: `Token ${token}`,
    };

    const url = `https://api.github.com/users/${val}/repos?page=${1}`;
    setPage(1);
    const data = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const newData = await data.json();
    if (newData.length === 0) {
      window.alert(" Repository Empty");
      setLoading(false);
      return;
    }

    if (newData.message === "Not Found") {
      window.alert("User Name does not Exist");
      setLoading(false);
      return;
    }
    setRes(newData);
    setLoading(false);
  };

  const fetchMoreRepo = async () => {
    const headers = {
      Authorization: `Token ${token}`,
    };
    const url = `https://api.github.com/users/${val}/repos?page=${page + 1}`;

    setPage(page + 1);
    setNewLoading(true);
    const data = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    const newData = await data.json();
    setRes(res.concat(newData));
    setNewLength(newData.length);
    setNewLoading(false);
  };

  useEffect(() => {
    setRes([]);
    setNewLength(0);
  }, [val]);

  return (
    <>
      <div className="container my-3">
        <Form onSubmit={getRepoName} className="my-3">
          <Form.Group className="mb-3 col-md-6" controlId="formBasicEmail">
            <Form.Label>Enter Repositary Owner</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Repositary Owner"
              value={val}
              onChange={(e) => setVal(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" id={styles["searchButton"]}>
            {loading ? "Searching..." : "Search"}
          </Button>
        </Form>

        {loading && <Loader />}

        {res.length !== 0 && (
          <InfiniteScroll
            dataLength={res.length}
            next={fetchMoreRepo}
            hasMore={res.length !== newlength}
          >
            <Table
              striped
              bordered
              hover
              className="container"
              id={styles["tabledesign"]}
            >
              <thead>
                <tr>
                  <th className="text-center">SNo.</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Branches</th>
                  <th className="text-center">Author Branch</th>
                  <th className="text-center">Author</th>
                  <th className="text-center">Created On</th>
                  <th className="text-center">Reviewers</th>
                  <th className="text-center">Labels</th>
                </tr>
              </thead>
              {res.length !== 0 &&
                res.map((e, index) => (
                  <tbody key={e.id}>
                    <tr>
                      <td className="text-center">{index + 1}</td>
                      <td>
                        {!e.description
                          ? e.name
                          : e.description.length > 50
                          ? e.description.substring(0, 50) + "..."
                          : e.description}
                      </td>
                      <td className="text-center">
                        <a
                          target="#"
                          href={`https://github.com/${e.full_name}/branches`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Branch
                        </a>
                      </td>
                      <td className="text-center">
                        <a
                          target="#"
                          href={`https://github.com/${e.full_name}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Author Branch
                        </a>
                      </td>
                      <td className="text-center">
                        <a target="blank" href={`https://github.com/${val}`}>
                          <img
                            src={`${e.owner.avatar_url}`}
                            alt="author"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </a>
                      </td>
                      <td className="text-center">
                        {e.created_at.toString().substring(0, 10)}
                      </td>
                      <td className="text-center">
                        <a
                          target="#"
                          href={`https://github.com/${e.full_name}/pulls `}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Reviews
                        </a>
                      </td>
                      <td className="text-center">
                        <a
                          target="#"
                          href={`https://github.com/${e.full_name}/labels`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          Labels
                        </a>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
            {newLoading && <Loader2 />}
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}

export default BasicExample;
