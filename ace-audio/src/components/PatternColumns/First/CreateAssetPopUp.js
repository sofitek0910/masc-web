import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../redux/dashboard/action";
import Loader from "../../../theme/Components/Loader";

const CreateAssetPopUp = ({ show, handleClose }) => {
  const Dispatch = useDispatch();
  const { createAsset_Action } = Actions;
  const { loading, success, token,requestBody } = useSelector(
    (state) => state.dashboard
  );

  const handleSuccess = () => {
    setTimeout(() => {
      handleClose();
    }, 3000);
  };


  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Asset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Loader imgPath="/static/img/loaders/load2.svg" />
          ) : (
            <>
              {success ? (
                <>
                  <h3>Succesfully created your Asset</h3>
                  <Loader imgPath="/static/img/loaders/success.png" />
                </>
              ) : (
                <h3>You want to created your Asset ?? </h3>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              Dispatch(createAsset_Action(JSON.parse(requestBody), token));
              handleSuccess();
            }}
            disabled={loading}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateAssetPopUp;
