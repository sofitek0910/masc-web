import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";

const SearchButton = () => {
  const Dispatch = useDispatch();
  const { setSearchPattern_Action } = Actions;

  function handleSearchButtonClick() {
    if (document.getElementById("custom-switch").checked) {
      Dispatch(setSearchPattern_Action("/owned"));
    } else {
      Dispatch(setSearchPattern_Action("/tempo/126.25"));
    }
  }

  return (
    <span>
      <Form
        className="form-check form-switch"
        style={{
          color: "white",
          display: "inline-block",
        }}
      >
        <Form.Check
          type="checkbox"
          id="custom-switch"
          label="Public/Owned"
          variant="secondary"
        />
      </Form>
      <span>
        <Button
          variant="light"
          size="sm"
          style={{
            margin: "5px",
          }}
          onClick={() => {
            handleSearchButtonClick();
          }}
        >
          Search
        </Button>
      </span>
    </span>
  );
};
export default SearchButton;
