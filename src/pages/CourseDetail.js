import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  ListGroup,
  ListGroupItem,
  Collapse
} from 'reactstrap';
import { Star, Clock, Award, Book } from 'lucide-react';
import { getCourseById, getUserCourses } from '../services/CourseService';
import { useNavigate, useParams } from 'react-router-dom';
import CartContext from '../CartContext';

const CourseDetail = () => {

  const { addToCart, setItemCount } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const { courseId } = useParams();

  const [course, setCourse] = useState([])
  const [ownedCourse, setOwnedCourses] = useState([])

  useEffect(()=>{
          var userId = JSON.parse(localStorage.getItem('loginUser'))?.id;
          const fetchCourses = async () => {
              try {
                if (courseId) {
                  const response = await getCourseById(courseId);
                  console.log("response", response);
                  setCourse(response);
                }
              } catch (error) {}
          }
          const fetchOwnedCourse = async () => {
                try {
                  if(userId){
                  var myCourses = await getUserCourses(userId);
                  setOwnedCourses(myCourses);
                }
              } catch (error) {}
              };

          if(courseId){
            fetchCourses();
          }
          if(userId){
            fetchOwnedCourse();
          }
  },[courseId]);

  useEffect(()=>{
  },[ownedCourse]);

  const handleAddToCart = () => {
    addToCart(course);
    setItemCount(localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <h1 className="mb-4">{course.name}</h1>
          <p className="lead">
            {course.description}
          </p>
          <div className="d-flex align-items-center mb-3">
            <Star className="text-warning me-1" />
            <Star className="text-warning me-1" />
            <Star className="text-warning me-1" />
            <Star className="text-warning me-1" />
            <Star className="text-warning me-1" />
            <span className="ms-2">4.8 (1,234 değerlendirme)</span>
          </div>
          <p>
            <span className="fw-bold">{course.trainee}</span> kaydoldu
          </p>
          <div className="mb-4">
            <p>Oluşturan <a href="/" className="text-decoration-none">{course.instructor}</a></p>
            <p>Son güncelleme: Ocak 2025</p>
          </div>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <img src={`${course.imageUrl}`}  alt="Kurs Önizleme" className="img-fluid mb-3" style={{ height: '200px', width: '350px', objectFit: 'cover' }}/>
              <h2 className="h4 mb-3">{course.price}₺</h2>
              {ownedCourse?.some((owned) => owned.id === course.id) ?
              <Button color="primary" block className="mb-3">Bu kursu satın aldınız</Button>
              :
              <Button onClick={handleAddToCart} color="primary" block className="mb-3">Kursa Kaydol</Button>

              }
              <p className="text-muted small">30 gün para iade garantisi</p>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span><Clock size={18} className="me-2" /> {course.duration} saat video</span>
                <span><Book size={18} className="me-2" /> {course.lesson} ders</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span><Award size={18} className="me-2" /> Sertifika</span>
                <span>Ömür boyu erişim</span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8}>
          <h3 className="mb-4">Kurs İçeriği</h3>
          <div className="mb-3">
            <Button color="link" onClick={toggle} style={{ textDecoration: 'none' }}>
              Bölüm 1: Kursun detayları
            </Button>
            <Collapse isOpen={isOpen}>
              <ListGroup flush>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <span>1. Kurs Detayı</span>
                  <span className="text-muted">15:30</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <span>2. Kurs Detayı</span>
                  <span className="text-muted">20:45</span>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <span>3. Kurs Detayı</span>
                  <span className="text-muted">25:10</span>
                </ListGroupItem>
              </ListGroup>
            </Collapse>
          </div>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <h4 className="mb-3">Bu kursta öğrenecekleriniz</h4>
              <ul className="list-unstyled">
                <li className="mb-2">✅ 1.Konu</li>
                <li className="mb-2">✅ 2.Konu</li>
                <li className="mb-2">✅ 3.Konu</li>
                <li className="mb-2">✅ 4.Konu</li>
                <li className="mb-2">✅ 5.Konu</li>
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseDetail;

