import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  useEffect(() => {
    alertify.set('notifier', 'position', 'top-right');
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://localhost:7055/api/User', formData);
      if (response.status === 200) {
        alertify.success('Registration successful!');
        setFormData({ userName: '', email: '', phoneNumber: '', password: '' });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        alertify.error(err.response.data);
      } else {
        alertify.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Inveon Academy'e kayıt ol</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userName">Kullanıcı adı</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Kullanıcı adı"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Telefon Numarası</Label>
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Telefon numarası"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Şifre</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Şifre"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button color="primary" block>Kayıt ol</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;

