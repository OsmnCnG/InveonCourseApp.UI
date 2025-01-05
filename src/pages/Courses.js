import React, { useEffect, useState } from 'react'
import { getCourses } from '../services/CourseService';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Alert,
  Spinner,
  Button
} from 'reactstrap'


const Courses = () => {
    
  const [courses, setCourses] = useState([])
  const[loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(courses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    useEffect(()=>{
        const fetchCourses = async () => {
            try {
                const resp = await getCourses();
                setCourses(resp.data); 
                setLoading(false);
            } catch (error) {}
        }
        fetchCourses();
    },[]);

    if(loading){
      return (
        <div className="loading-container">
          <Spinner/>
        </div>
      );
    }  
    
  return (
    <div>
        {/* {courses.map((course) => (
            <a 
              key={course.id} 
              href={course.link}
              className="text-decoration-none"
            >
              <Card 
                className="flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow" 
                style={{ width: '300px' }}
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="card-img-top"
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <CardBody>
                  <CardTitle tag="h5" className="text-truncate text-dark">
                    {course.name}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted">
                    {course.instructor}
                  </CardSubtitle>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-1 fw-bold">{course.rating}</span>
                    <div className="text-warning d-flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                          className="text-warning"
                        />
                      ))}
                    </div>
                    <span className="ms-1 text-muted">({course.reviews})</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-dark">₺{course.price}</span>
                    {course.bestSeller && (
                      <span className="badge bg-warning text-dark">En çok satan</span>
                    )}
                  </div>
                </CardBody>
              </Card>
            </a>
          ))} */}
    <Container className="py-5">
      <h1 className="mb-4">Tüm Kurslar</h1>
      
      <Alert color="info" className="mb-4">
        <i className="bi bi-info-circle me-2"></i>
        Emin olamıyor musunuz? Tüm kurslarımızda 30 gün içinde para iade garantisinden yararlanabilirsiniz
      </Alert>
      <Row>
        
        <Col md={9}>
          {currentItems.map(course => (
            <a
            key={course.id} 
            href={`/course/${course.id}`}
            className="text-decoration-none"
            >
              <Card key={course.id} className="mb-4 shadow-sm">
                <CardBody className="d-flex gap-4">
                  <img
                    src={course.imageUrl}
                    alt={course.name}
                    style={{ width: '240px', height: '135px', objectFit: 'cover' }}
                    className="rounded"
                  />
                  <div className="flex-grow-1">
                    <CardTitle tag="h5" className="mb-2">
                      {course.name}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted">
                      {course.description}
                    </CardSubtitle>
                    <div className="text-muted small mb-2">{course.instructor}</div>
                    <div className="d-flex align-items-center gap-1 mb-1">
                      <span className="fw-bold">{course.rating}</span>
                    </div>
                    <div className="text-muted small">
                      Toplam {course.duration} saat • {course.lesson} ders • Tüm Düzeyler
                    </div>
                    {course.bestSeller && (
                      <span className="badge bg-warning text-dark mt-2">En çok satan</span>
                    )}
                  </div>
                  <div className="text-end">
                    <div className="h5 mb-0">₺{course.price}</div>
                  </div>
                </CardBody>
              </Card>
            </a>
          ))}
        </Col>
      </Row>
      <div className="d-flex justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <Button
            key={pageNumber + 1}
            color={currentPage === pageNumber + 1 ? 'primary' : 'secondary'}
            className="me-2"
            onClick={() => handlePageChange(pageNumber + 1)}
          >
            {pageNumber + 1}
          </Button>
        ))}
      </div>
    </Container>

    </div>
  )
}

export default Courses;




