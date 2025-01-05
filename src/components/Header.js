import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { 
  Navbar, 
  NavbarBrand, 
  Input, 
  Button, 
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavItem,
  Nav,
  Badge,
  Dropdown,
  InputGroup,
  InputGroupText,
} from 'reactstrap';
import { Search } from 'lucide-react';
import { getCategories } from '../services/CategoryService';
import AuthContext from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { getCourses } from '../services/CourseService';
import CartContext from '../CartContext';

const Header = () => {
  
  const {isLoggedIn, setIsLoggedIn, isInstructor, setIsInstructor, setUser} = useContext(AuthContext);
  const {itemCount, setItemCount} = useContext(CartContext);

  const navigate = useNavigate();

  const [courses, setCourses] = useState([])

  const [categories, setCategories] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const timeoutRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const searchRef = useRef(null);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);


  const clearTimeoutRef = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const onMouseEnter = useCallback(() => {
    clearTimeoutRef();
    setDropdownOpen(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    clearTimeoutRef();
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
  }, []);

  const toggle = useCallback(() => {
    setDropdownOpen(prevState => !prevState);
  }, []);

  useEffect(()=> {

    const cardItems = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")).length : 0;
    setItemCount(cardItems);

    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Kurslar yüklenirken bir sorun oluştu");
      }
    }

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        // console.log(response)
      } catch (error) {
        console.error("Kategoriler yüklenirken bir sorun oluştu");
      }
    }

    setLoginUser(JSON.parse(localStorage.getItem('loginUser')));

    fetchCategories();
    fetchCourses();
  },[setItemCount]);

  
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCourses(filtered);
    setSearchDropdownOpen(filtered.length > 0);
  };

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("instructor");
    // localStorage.removeItem("loginUser");
    localStorage.clear();
    setIsLoggedIn(false);
    setIsInstructor(false);
    setUser(null);
    navigate("/Login");
    navigate(0);
  };

  return (
    <Navbar color="light" light expand="md" className="py-2 border-bottom sticky-top">
      <Container fluid className="px-4 d-flex align-items-center">

        <NavbarBrand href="/" className="me-3 p-0">
          Inveon Academy
        </NavbarBrand>

        <UncontrolledDropdown className="me-3">
          <DropdownToggle nav caret className="p-0 text-dark">
            Kategoriler
          </DropdownToggle>
          <DropdownMenu className="mt-3 p-3" >
            {categories?.map((category) => (
              <DropdownItem key={category.id} tag="div">
                <a
                  href={`/courses/${category.name}`}
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                    padding: '5px 10px',
                    display: 'block',
                    transition: '0.3s ease',
                  }}
                >
                  {category.name}
                </a>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </UncontrolledDropdown>

        {/* <div className="position-relative flex-grow-1 me-3">
          <div className="position-absolute top-50 start-0 translate-middle-y ps-2">
            <Search size={16} className="text-muted" />
          </div>
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kurs arayın"
            className="ps-4 py-1 border-dark rounded-pill"
            style={{ fontSize: '0.9rem' }}
          />
        </div> */}

        <div className="position-absolute mx-auto" ref={searchRef} style={{ width: '300px', left: '50%', transform: 'translateX(-50%)' }}>
          <InputGroup>
            <InputGroupText className="bg-white border-end-0">
              <Search size={16} className="text-muted" />
            </InputGroupText>
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Kurs arayın"
              className="border-start-0 rounded-end"
              style={{ fontSize: "0.9rem" }}
            />
          </InputGroup>
          <Dropdown isOpen={searchDropdownOpen} toggle={() => setSearchDropdownOpen(!searchDropdownOpen)}>
            <DropdownToggle tag="div"/>
            <DropdownMenu
              className="mt-6"
              style={{
                position: 'relative',
                top:'100%',
                left:'50%',
                zIndex: 1000,
                width: 'auto',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
            >
              {filteredCourses?.length === 0 && searchQuery ? (
                <DropdownItem disabled>Sonuç bulunamadı.</DropdownItem>
              ) : (
                filteredCourses?.map((course) => (
                  <DropdownItem key={course.id} onClick={() => navigate(`/course/${course.id}`)}>
                      {course.name}
                  </DropdownItem>
                ))
              )}
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* <div className="position-relative" ref={searchRef}>
      <div className="position-relative d-inline-block">
        <div className="position-absolute top-50 start-0 translate-middle-y ps-2">
          <Search size={16} className="text-muted" />
        </div>
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Kurs arayın"
          className="ps-4 py-1 border-dark rounded-pill"
          style={{ fontSize: "0.9rem" }}
        />
      </div>
      <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
        <DropdownToggle tag="div" className="d-none" />
        <DropdownMenu className="mt-1 w-100">
          {filteredCourses.length === 0 && searchQuery ? (
            <DropdownItem disabled>Sonuç bulunamadı.</DropdownItem>
          ) : (
            filteredCourses.map((course) => (
              <DropdownItem key={course.id} onClick={() => console.log(`Seçilen kurs: ${course.name}`)}>
                {course.name}
              </DropdownItem>
            ))
          )}
        </DropdownMenu>
      </Dropdown>
    </div> */}

        {isLoggedIn ? (
          <Nav className="ms-auto d-flex align-items-center" navbar>
            <NavItem className="me-3 position-relative">
              <Link to="/Card">
                <Button color="link" className="p-0 text-dark">
                  <FaShoppingCart size={20} />
                  {itemCount > 0 && (
                    <Badge
                      color="primary"
                      pill
                      className="position-absolute"
                      style={{
                        top: '-8px',
                        right: '-8px',
                        padding: '0.25em 0.4em',
                        fontSize: '0.75em'
                      }}
                    >
                      {itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </NavItem>
            <Dropdown isOpen={dropdownOpen}
              toggle={toggle}
              onMouseOver={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <DropdownToggle nav className="p-0">
                <div
                  className="rounded-circle bg-dark d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '40px', 
                    height: '40px',
                    backgroundColor: '#1C1D1F'
                  }}
                >
                  <span className="text-white" style={{ fontSize: '16px', fontWeight: '500' }}>
                    {`${loginUser?.userName[0]}`.toUpperCase()}
                  </span>
                </div>
              </DropdownToggle>
              <DropdownMenu end 
                className="mt-2 p-3" 
                style={{ 
                  minWidth: '250px',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                }}
              >
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-dark d-flex align-items-center justify-content-center me-2"
                    style={{ 
                      width: '48px', 
                      height: '48px',
                      backgroundColor: '#1C1D1F'
                    }}
                  >
                    <span className="text-white" style={{ fontSize: '20px', fontWeight: '500' }}>
                      {`${loginUser?.userName[0]}`.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }}>
                      {`${loginUser?.userName}`}
                    </div>
                    <div style={{ fontSize: '14px', color: '#6A6F73' }}>
                      {loginUser?.email}
                    </div>
                  </div>
                </div>
                <Link to="/Profile" className='text-decoration-none'>
                  <DropdownItem className="py-2">
                    Profil Bilgilerim
                  </DropdownItem>
                </Link>
                <DropdownItem divider className="my-2" />
                <Link to={"/MyCourses"} className='text-decoration-none'>
                  <DropdownItem className="py-2">
                    Öğrenim İçeriğim
                  </DropdownItem>
                </Link>
                
                {/* <Link to={"/Card"} className='text-decoration-none'>
                  <DropdownItem className="py-2">
                    Sepetim
                  </DropdownItem>
                </Link> */}
                <Link to="/Card" className="text-decoration-none">
                  <DropdownItem className="py-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="position-relative">
                        <FaShoppingCart size={20} />
                        {itemCount > 0 && (
                          <Badge
                            color="primary"
                            className="position-absolute"
                            style={{
                              top: '-8px',
                              right: '-8px',
                              padding: '0.25em 0.4em',
                              fontSize: '0.75em',
                              borderRadius: '50%'
                            }}
                          >
                            {itemCount}
                          </Badge>
                        )}
                      </div>
                      Sepetim
                    </div>
                  </DropdownItem>
                </Link>
                {isInstructor && (
                <Link to={"/InstructorCourses"} className='text-decoration-none'>
                  <DropdownItem className="py-2">
                    InveonAcademy'de Eğitim Verin
                  </DropdownItem>
                </Link>)
                }
                <DropdownItem divider className="my-2" />
                <DropdownItem className="py-2" onClick={handleLogout}>
                  Çıkış Yap
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        )
      : 
      <Nav className="ms-auto d-flex align-items-center">
        <NavItem className="me-3 position-relative">
          <Link to="/Card">
            <Button color="link" className="p-0 text-dark display-none">
              <FaShoppingCart size={20} />
              {itemCount > 0 && (
                <Badge
                  color="primary"
                  pill
                  className="position-absolute"
                  style={{
                    top: '-8px',
                    right: '-8px',
                    padding: '0.25em 0.4em',
                    fontSize: '0.75em'
                  }}
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
        </NavItem>
        <NavItem className="me-2">
          <Button onClick={() => navigate('/Login')} color="white" outline className="border-dark px-2 py-1" style={{ fontSize: '0.9rem' }}>
            Oturum aç
          </Button>
        </NavItem>
        <NavItem>
          <Button onClick={() => navigate('/Register')}  color="dark" className="px-2 py-1" style={{ fontSize: '0.9rem' }}>
            Kaydol
          </Button>
        </NavItem>
      </Nav>
      
      }
        
      </Container>
    </Navbar>
  );
};

export default Header;

