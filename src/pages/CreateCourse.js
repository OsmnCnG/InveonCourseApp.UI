import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import axios from 'axios';
import { getCategories } from '../services/CategoryService';

const CreateCourse = () => {
    const [categories, setCategories] = useState([]);

    const [course, setCourse] = useState({
        name: "",
        price: "",
        categoryId: '',
        description: "",
        instructorUserId: `${localStorage.getItem("loginUser") ? JSON.parse(localStorage.getItem("loginUser")).id : ""}`,
        duration: "",
        imageUrl: "https://cdn.pixabay.com/photo/2020/12/30/14/23/waterfall-5873630_960_720.jpg",
        instructor: `${localStorage.getItem("loginUser") ? JSON.parse(localStorage.getItem("loginUser")).userName : ""}`
      });

      useEffect(() => {
        const fetchCategories = async () => {
              try {
                const response = await getCategories();
                setCategories(response.data);
                // console.log(response)
              } catch (error) {
                console.error("Kategoriler yüklenirken bir sorun oluştu");
              }
        }
    
        fetchCategories();
      }, []);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        console.log(course)
        const response = await axios.post(
          "https://localhost:7055/api/Course/CreateCourse",
          course,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

      if (response) {
        alertify.success('Kurs başarıyla oluşturuldu');
        navigate('/InstructorCourses');
      } else {
        throw new Error('Kurs oluşturma başarısız');
      }
    } catch (error) {
      alertify.error('Kurs oluşturulurken bir hata oluştu');
      console.error('Error creating course:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">Yeni Kurs Oluştur</h1>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Kurs Adı</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={course.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="price">Fiyat</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={course.price}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="categoryId">Kategori</Label>
              <Input
                type="select"
                name="categoryId"
                id="categoryId"
                value={course.categoryId}
                onChange={handleInputChange}
                required
              >
                <option value="">Kategori Seçin</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Açıklama</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={course.description}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="instructorUserId">Eğitmen ID:</Label>
              <Input
                type="number"
                name="instructorUserId"
                value={localStorage.getItem("loginUser") ? JSON.parse(localStorage.getItem("loginUser")).id : ""}
                onChange={handleInputChange}
                required
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="duration">Kurs Süresi</Label>
              <Input
                type="text"
                name="duration"
                id="duration"
                value={course.duration}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            {/* <FormGroup>
              <Label for="imageUrl">Görsel URL</Label>
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={course.imageUrl}
                onChange={handleInputChange}
                required
              />
            </FormGroup> */}
            {/* <FormGroup>
              <Label for="instructor">Eğitmen Adı</Label>
              <Input
                type="text"
                name="instructor"
                id="instructor"
                value={localStorage.getItem("loginUser") ? JSON.parse(localStorage.getItem("loginUser")).userName : ""}
                onChange={handleInputChange}
                required
              />
            </FormGroup> */}
            <Button color="primary" type="submit">Kurs Oluştur</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCourse;