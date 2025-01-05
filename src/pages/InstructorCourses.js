import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Book, Users, Edit, Plus } from 'lucide-react';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { getCourseByInstructorId } from '../services/CourseService';
import { useNavigate } from 'react-router-dom';

const InstructorPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      var id = JSON.parse(localStorage.getItem('loginUser')).id;
      if(id){
        var instructorCourse = await getCourseByInstructorId(id);
        setCourses(instructorCourse);
      }
    };

    fetchCourses();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setEditMode(false);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    setCourses(courses.map(course => 
      course.id === selectedCourse.id ? selectedCourse : course
    ));
    alertify.success('Kurs başarıyla güncellendi');
    setEditMode(false);
    toggleModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCourse({ ...selectedCourse, [name]: value });
  };

  const handleCreateCourseClick = () => {
    navigate('/CreateCourse');
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1>Eğitmenin kursları</h1>
        <Button color="primary" onClick={handleCreateCourseClick}>
          <Plus size={18} className="mr-2" />
          Yeni Kurs Oluştur
        </Button>
      </div>
      <Row>
        {courses?.map(course => (
          <Col md={4} key={course.id} className="mb-4">
            <Card onClick={() => handleCourseClick(course)} style={{ cursor: 'pointer' }}>
              <CardBody>
                <CardTitle tag="h5">{course.name}</CardTitle>
                <CardText>{course.description}</CardText>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Book size={18} className="mr-2" />
                    <span className="ml-1">{course.id}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Users size={18} className="mr-2" />
                    <span className="ml-1">{course.trainee}</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          {editMode ? 'Kurs Düzenle' : 'Kurs Detayları'}
        </ModalHeader>
        <ModalBody>
          {selectedCourse && (
            editMode ? (
              <Form>
                <FormGroup>
                  <Label for="title">Kurs Adı</Label>
                  <Input 
                    type="text" 
                    name="title" 
                    id="title" 
                    value={selectedCourse.name}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Açıklama</Label>
                  <Input 
                    type="textarea" 
                    name="description" 
                    id="description" 
                    value={selectedCourse.description}
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Form>
            ) : (
              <>
                <h5>{selectedCourse.name}</h5>
                <p>{selectedCourse.description}</p>
                <p>Kurs ID: {selectedCourse.id}</p>
                <p>Öğrenci Sayısı: {selectedCourse.trainee}</p>
              </>
            )
          )}
        </ModalBody>
        <ModalFooter>
          {editMode ? (
            <Button color="primary" onClick={handleSaveEdit}>Kaydet</Button>
          ) : (
            <Button color="primary" onClick={handleEditClick}>
              <Edit size={18} className="mr-2" />
              Düzenle
            </Button>
          )}
          <Button color="secondary" onClick={toggleModal}>Kapat</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default InstructorPage;

