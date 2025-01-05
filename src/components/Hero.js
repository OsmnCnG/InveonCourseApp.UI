import React from 'react';
import { Card, CardBody, Container, Button } from 'reactstrap';
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <Card className="bg-light text-dark border-0 rounded-0">
      <CardBody className="py-5">
        <Container>
          <h1 className="display-4 mb-4">Inveon Academy'de Öğren</h1>
          <p className="lead mb-4">Çeşitli konularda kursları keşfet ve bugün öğrenmeye başla!</p>
          <Link to="/courses">
            <Button color="dark" size="lg">
              Kursları Keşfet
            </Button>
          </Link>
        </Container>
      </CardBody>
    </Card>
  );
};

export default Hero;

