import React from 'react';
import UserProfile from './UserProfile';
import { Spinner, Container, Card, Button, Row, Col } from 'react-bootstrap';
import "./Styling/profile.css"

const Profile = () => {

  const { userInfo, loading, error } = UserProfile();

  if (loading) return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>;
  if (error) return <p>{error}</p>;

  return (
    <Container className="my-5">
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <Card className="shadow-lg p-4" >
          <Card.Img 
            className='profileImg'
            variant="top" 
            src="../../Images/profileimg.jpg"       
          />
          <Card.Header 
            as="h2" 
            className="text-center bg-dark text-white py-3 mb-4" 
          >
            User Information
          </Card.Header>
          <Card.Body>
            {userInfo && (
              <div>
                <Card.Text className="mb-3">
                  <strong>Username:</strong> {userInfo.username}
                </Card.Text>
                <Card.Text className="mb-3">
                  <strong>Role:</strong> {userInfo.role}
                </Card.Text>
                <Card.Text className="mb-4">
                  <strong>Email:</strong> {userInfo.email}
                </Card.Text>
                <Button variant="dark" className="mt-3 w-100" >
                  Edit Profile
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );

};

export default Profile;
