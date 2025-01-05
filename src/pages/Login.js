import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import alertify from "alertifyjs";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setIsLoggedIn, setIsInstructor, setUser} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alertify.error('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
        const response = await axios.post('https://localhost:7055/api/Auth/Login', {
            email,
            password
          });

        console.log(response)
  
        if (response.data.isSuccess) {
          alertify.success('Giriş başarılı!');
          localStorage.setItem('token', response.data.token.accessToken.replace(/"/g, ""));
          setIsLoggedIn(true);
          setUser(response.data.data);
          localStorage.setItem('loginUser', JSON.stringify(response.data.data));
          if(response.data.data.authority?.includes('Instructor')){
            localStorage.setItem('instructor', 'Instructor')
            setIsInstructor(true);
          }
          navigate('/');
          navigate(0);
        }else{
          alertify.error('E-posta veya şifre yanlış.');
        }
      } catch (error) {
          alertify.error('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow">
            <CardBody>
              <h2 className="text-center mb-4">Giriş Yap</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="email">E-posta</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-posta adresiniz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Şifre</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Şifreniz"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button color="dark" block>Giriş Yap</Button>
              </Form>
              <div className="text-center mt-3">
                <a className='text-decoration-none' href="/forgot-password">Şifremi Unuttum</a>
              </div>
              <hr />
              <p className="text-center">
                Hesabınız yok mu? <a className='text-decoration-none' href="/register">Kayıt Ol</a>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

