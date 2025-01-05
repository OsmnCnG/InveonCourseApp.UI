import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, CardTitle, Card, CardBody } from 'reactstrap';
import alertify from 'alertifyjs';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("loginUser"));
    setUser(userData);
    
  }, []);

//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://localhost:7055/api/User/UpdateUser?id=${user.id}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alertify.success('Kullanıcı başarıyla güncellendi.');
        console.log(user)
        localStorage.setItem("loginUser", JSON.stringify(user));
        // setUpdateMessage('Kullanıcı başarıyla güncellendi.');
        setUser(user);
        setIsEditing(false)
      } else {
        alertify.error('Kullanıcı güncellenirken bir hata oluştu.');
      }
    } catch (error) {
      alertify.error('Kullanıcı güncelleme isteği sırasında bir hata oluştu.');
      console.error(error);
    }
  };

//   const togglePasswordModal = () => {
//     setIsPasswordModalOpen(!isPasswordModalOpen);
//   };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="mb-4">Profil Bilgileri</h2>
          {updateMessage && <Alert color="success">{updateMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="userName">Kullanıcı Adı</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                value={user.userName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">E-posta</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Telefon numarası</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={user.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </FormGroup>
            {isEditing ? (
              <Button color="primary"  type="submit">Kaydet</Button>
            ) : (
              <Button color="secondary" type='button' onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }} >Düzenle</Button>
            )}
            
          </Form>
        </Col>
      </Row>

    </Container>
  );
};

export default Profile;
