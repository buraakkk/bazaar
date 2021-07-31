import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Profile = ({ user }) => {
  let addresses = [];
  if (user.addresses) {
    addresses = user.addresses.map((address) => {
      return (
        <Row key={address.street_name + address.building_number + address.first_name}>
          <Card style={{ borderColor: 'var(--color-main)' }}>
            <Card.Body>
              <Row>
                <Col>
                  <Card.Title>
                    {address.first_name} {address.last_name}
                  </Card.Title>
                  <Card.Text>
                    {address.city} - {address.country}
                  </Card.Text>
                  <Card.Text>
                    {address.street_name} {address.building_number} {address.extension}
                  </Card.Text>
                  <Card.Text>Postal code: {address.post_code}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      );
    });
  }
  return (
    <Container>
      <Row>
        <Col>
          <h4>My profile data</h4>
        </Col>
        <Col>
          <a
            className="btn btn-primary"
            href="/edit-profile"
            role="button"
            style={{ background: 'var(--color-main)' }}
          >
            Edit my profile data
          </a>
        </Col>
      </Row>
      <Row>
        <Card style={{ borderColor: 'var(--color-main)' }}>
          <Card.Body>
            <Row>
              <Col>
                <Card.Img style={{ minWidth: '250px' }} src={user.avatar} alt="profile pic" />
              </Col>
              <Col>
                <Card.Title>
                  {user && user.first_name} {user && user.last_name}
                </Card.Title>
                <Card.Text>
                  <li> Phone number: {user && user.phone}</li>
                  <li>Email: {user && user.email}</li>
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
      <Row>
        <Col>
          {user.addresses && user.addresses.length > 0 ? (
            <h4>My addresses</h4>
          ) : (
            <h4>You don&apos;t have addresses yet.</h4>
          )}
        </Col>
      </Row>
      {addresses}
    </Container>
  );
};

export default Profile;