import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
// import { response } from "express";

export const ProfileComponent = () => {
  const [postId, setPostId] = useState(null);
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user, null, 2)
    };
    // test url https://jsonplaceholder.typicode.com/posts
    fetch('http://ec2-18-220-230-153.us-east-2.compute.amazonaws.com/api/login/authenticate', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id));

// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
  const { user } = useAuth0();
  const  passsitecoredata = () =>{
    // console.log(user);
   
  }
// console.log(user);
  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          {/* {postId} */}
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        {/* <button onClick={() => passsitecoredata()}>test</button> */}
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default withAuthenticationRequired(ProfileComponent, {
  onRedirecting: () => <Loading />,
});
