import React, { Component, useState, useEffect } from "react";
import { Dropdown, FormControl, Button } from "react-bootstrap";

const Index = (props) => {
  const { categories, DropImgClose, DropImgOpen, changer, selected } = props;
  const [dropDownSwitch, setDropDownSwitch] = useState(false);

  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    return (
      <a
        className="nav-dropdown-text"
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
          setDropDownSwitch(!dropDownSwitch);
        }}
      >
        <img
          src={dropDownSwitch ? DropImgClose : DropImgOpen}
          alt="arrow"
          title="arrow"
        />
        {children}
        {/* &#x25bc; */}
      </a>
    );
  });
  const handleClick = (e, key, name, direction) => {
    e.preventDefault();
    // router.push(`${router.pathname}/${href}`);
    changer(key, name, direction);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>{selected}</Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu} className="nav-dropdown-outter" {...props}>
        {categories.map((cat, i) => {
          const match = cat.key === selected.toLowerCase();
          return (
            <Dropdown.Item
              eventKey={i}
              key={i}
              onClick={(e) => handleClick(e, cat.key, cat.name, cat.direction)}
              disabled={match}
              style={{
                color: match ? "#a29f9f" : "",
                cursorPointer: match ? "none" : "ponter",
              }}
            >
              {cat.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
export default Index;
// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef((props, ref) => {
  const {
    children,
    style,
    className,
    "aria-labelledby": labeledBy,
    searchText,
  } = props;
  const [value, setValue] = useState("");

  // const handleScroll = () => {
  //   const currentScrollY = window.scrollY;
  //   const Scroll = document.getElementsByClassName("dropdown-menu")[0];

  //   if (Scroll === undefined) {
  //     return;
  //   }
  //   if (currentScrollY < 210) {
  //     Scroll.classList.remove("show");
  //   }
  //   if (currentScrollY > 210) {
  //     Scroll.classList.add("show");
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <FormControl
        autoFocus
        className="mx-3 my-2 w-auto nav-dropdown-inner"
        placeholder={`${searchText}...`}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className="list-unstyled  text-center nav-dropdown-inner-list">
        {React.Children.toArray(children).filter(
          (child) =>
            !value || child.props.children.toLowerCase().startsWith(value)
        )}
      </ul>
    </div>
  );
});
