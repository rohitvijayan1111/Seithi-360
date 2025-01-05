import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import moment from "moment";
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import "../NavBar/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setQuery,
  setSource,
  fetchArticles,
  setDate,
  setCategory,
} from "../../store/slices/articlesSlice";
import { sources, categories, capitaLize } from "../../config/config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoogleTranslate from "../GoogleTranslate";

function NavBar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const isPagePersonalized = /\/personalized/.test(currentPath);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState(sources[0]);
  const [startDate, setStartDate] = useState(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const isSearchButtonDisabled = searchInputValue.trim() === "";

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInputValue));
    dispatch(
      fetchArticles({
        query: searchInputValue,
        source: selected.key,
        date: startDate,
      })
    );
    setSearchInputValue("");
  };

  const handleSelectSource = (eventKey) => {
    const selectedSource = sources.find((source) => source.key === eventKey);
    setSelected(selectedSource);
    dispatch(setSource(selectedSource));
  };

  const handleSelectCategory = (eventKey) => {
    const selectedCategory = categories.find(
      (category) => category === eventKey
    );
    setSelectedCategory(selectedCategory);
    dispatch(setCategory(selectedCategory));
  };

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format("YYYY-MM-DD");
    setStartDate(formattedDate);
    dispatch(setDate(formattedDate));
  };

  useEffect(() => {
    dispatch(setSource(selected));
    dispatch(setDate(startDate));
    dispatch(setCategory(selectedCategory));
    dispatch(
      fetchArticles({
        query: searchInputValue,
        source: selected.key,
        category: selectedCategory,
        date: startDate,
      })
    );
    dispatch(setQuery(""));
    // eslint-disable-next-line
  }, [dispatch, selected, selectedCategory]);

  return (
    <Navbar
      className="modern-navbar"
      variant="light"
      expand="lg"
      fixed="top"
      expanded={!isCollapsed}
    >
      <Navbar.Brand className="nav-brand" href="/">
       {/*  <img
          src="https://seeklogo.com/images/S/svg-logo-A7D0801A11-seeklogo.com.png"
          alt="Logo"
          className="logo"
        /> */}
        <span>செய்தி360</span>
      </Navbar.Brand>
      {isCollapsed && (
        <Navbar.Toggle
          className="border-0 toggle-btn"
          aria-controls="basic-navbar-nav"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}

      {!isCollapsed && (
        <IoCloseOutline
          size={30}
          className="close-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      )}

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            as={Link}
            to="/"
            className={isPagePersonalized ? "" : "active"}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/personalized"
            className={isPagePersonalized ? "active" : ""}
          >
            Personalized
          </Nav.Link>

          <NavDropdown
            id="category-dropdown"
            title={capitaLize(selectedCategory)}
            onSelect={handleSelectCategory}
          >
            {categories.map((element, index) => (
              <NavDropdown.Item key={index} eventKey={element}>
                {capitaLize(element)}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <NavDropdown
            id="source-dropdown"
            title={selected.name}
            onSelect={handleSelectSource}
          >
            {sources.map((element, index) => (
              <NavDropdown.Item key={index} eventKey={element.key}>
                {element.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <GoogleTranslate/>
        </Nav>
        
        
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            className="date-picker-input"
          />
        </div>

        <Form className="search-form" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            placeholder="Search news..."
            className="form-input"
          />
          <Button
            onClick={handleSubmit}
            className="search-btn"
            disabled={isSearchButtonDisabled}
          >
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
