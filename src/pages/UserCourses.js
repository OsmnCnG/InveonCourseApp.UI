import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, CardImg, Badge, Button } from 'reactstrap';
import { getUserCourses } from '../services/CourseService';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';

const UserCourses = () => {
  const [courses, setCourses] = useState([]);
  const imageContainerStyle = {
    height: '200px',
    overflow: 'hidden',
  };
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  
  const {isLoggedIn} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const user = localStorage.getItem('loginUser');
        if (user) {
          const parsedUser = JSON.parse(user);
          const id = parsedUser?.id;

          if (id) {
            const myCourses = await getUserCourses(id);
            setCourses(myCourses);
          } else {
            navigate("/Login");
          }
        } else {
          navigate("/Login");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        navigate("/Login");
      }
    };

    if (isLoggedIn) {
      fetchCourses();
    } else {
      navigate("/Login");
    }
  }, [isLoggedIn, navigate]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       var id = JSON.parse(localStorage.getItem('loginUser')).id;
//       if(id){
//         var myCourses = await getUserCourses(id);
//         setCourses(myCourses);
//       }
//     };

//     fetchCourses();
//   }, []);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">My Courses</h1>
      <Row>
        {(courses?.length == 0) && <div>Kullanıcıya ait kurs bulunamadı!</div>}
        {courses?.map((course) => (
          <Col key={course.id} sm="6" md="4" lg="3" className="mb-4">
            <Card style={{height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out'}}
            >
              <div style={imageContainerStyle}>
                <CardImg top width="100%" src={course.imageUrl} alt={course.name} style={imageStyle} />
              </div>
              <CardBody>
                <CardTitle tag="h5">{course.name}</CardTitle>
                <CardText>Instructor: {course.instructor}</CardText>
                <div className="d-flex justify-content-between align-items-center">
                  <Badge color="primary">{course.progress}% Complete</Badge>
                  <Link to={`/course/${course.id}`}>
                    <Button className="btn btn-sm" color="primary">Continue</Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserCourses;

