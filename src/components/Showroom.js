import { useEffect, useState } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Spinner,
} from 'reactstrap'
import { Star } from 'lucide-react'
import { getCourses } from '../services/CourseService'
import { Link } from 'react-router-dom'



export default function BestCourses() {

    const [showAll, setShowAll] = useState(false)
    const [courses, setCourses] = useState([])
    const[loading, setLoading] = useState(true);

    useEffect(()=>{


        const fetchCourses = async () => {
          try {
            const resp = await getCourses();
            setCourses(resp.data);
            setLoading(false);
          } catch (error) {
            console.error(error)
          }
        }
        fetchCourses();
    },[]);

    const displayedCourses = showAll ? courses : courses?.slice(0, 4)

  if(loading){
    return (
      <div className="loading-container">
        <Spinner/>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <div
        className="text-decoration-none text-dark"
      >
        <h2 className="mb-4 hover:text-primary transition-colors cursor-pointer">
          En İyi Kurslar
        </h2>
      </div>
      
      <div className="position-relative">
        <div
          id="courses-container"
          className="d-flex flex-nowrap overflow-hidden gap-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {displayedCourses.map((course) => (
            <a 
              key={course.id} 
              href={`/course/${course.id}`}
              className="text-decoration-none"
            >
              <Card 
                className="flex-shrink-0 cursor-pointer hover:shadow-lg transition-shadow" 
                style={{ width: '300px' }}
              >
                <img
                  src={course.imageUrl}
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
          ))}
        </div>
      </div>

      <div className="text-center mt-4">
        <Link to={"/courses"}>
          <Button
            color="outline-primary"
            onClick={() => setShowAll(!showAll)}
          >
            {/* {showAll ? 'Daha Az Göster' : 'Tüm kursları göster'} */}
            Tüm kursları göster
          </Button>
        </Link>
      </div>
    </Container>
  )
}

