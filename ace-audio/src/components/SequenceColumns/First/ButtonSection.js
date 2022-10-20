import React from "react";
import Button from "../../../theme/Components/Button";

const Index = (props) => {
    const setShowModal = props.setShowModal
  return (
    <div className="ButtonSection mt-3">
      <Button className={`addGuidModal`}
        btnStyleClass={`sequence_btn`}
        handleBtnClick={setShowModal}
        BtnInnerValue={<img src="/static/plus.svg" alt="btninner" />}
      />
      <Button
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {}}
        BtnInnerValue={<img src="/static/copy.svg" alt="btninnerv" />}
      />
      <Button
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {}}
        BtnInnerValue={<img src="" alt="btninnerv" />}
      />
      <Button
        btnStyleClass={`sequence_btn`}
        handleBtnClick={() => {}}
        BtnInnerValue={<img src=""  alt="btninnerv"/>}
      />
    </div>

  );
};

export default Index;
