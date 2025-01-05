import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { XOctagon } from 'lucide-react';

const ForbiddenPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="text-center shadow">
            <CardBody className="py-5">
              <XOctagon size={64} className="text-danger mb-4" />
              <CardTitle tag="h1" className="display-4 mb-4">403 - Forbidden</CardTitle>
              <CardText className="lead mb-4">
                Oops! You don't have permission to access this page.
              </CardText>
              <Button color="primary" size="lg" onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForbiddenPage;

