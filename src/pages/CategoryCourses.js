import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCoursesWithCategory } from '../services/CourseService';
import { Alert, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row, Spinner } from 'reactstrap';

const CategoryCourses = () => {

    const { category } = useParams();

    const [courses, setCourses] = useState([]);
    const[loading, setLoading] = useState(true);

      const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;
    
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
                const resp = await getCoursesWithCategory();
                const filteredCourses = resp.data.filter(course => course.category.name === category);
                setCourses(filteredCourses);
                setLoading(false);
            } catch (error) {
                console.error("Courses fetch error:", error);
            }
        };
    
        if (category) {
            fetchCourses();
        }
    },[category]);

    if(loading){
      return (
        <div className="loading-container">
          <Spinner/>
        </div>
      );
    }

  return (
    <div>
      <Container className="py-5">
      <h1 className="mb-4">{category} kategorisindeki kurslar</h1>
      
      <Alert color="info" className="mb-4">
        <i className="bi bi-info-circle me-2"></i>
        Emin olamıyor musunuz? Tüm kurslarımızda 30 gün içinde para iade garantisinden yararlanabilirsiniz
      </Alert>
      <Row>
        <Col md={9}>
        {currentItems?.length > 0 ? (
          currentItems?.map(course => (
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
          ))
        ) : (
            <p>No courses found in this category.</p>
        )}
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

export default CategoryCourses