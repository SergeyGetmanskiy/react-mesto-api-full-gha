import React from "react";

export default function LoadingSpinner(props) {
  return (
    <div className={props.containerClassName}>
      <div id="floatingBarsG">
        <div className="blockG" id="rotateG_01"></div>
        <div className="blockG" id="rotateG_02"></div>
        <div className="blockG" id="rotateG_03"></div>
        <div className="blockG" id="rotateG_04"></div>
        <div className="blockG" id="rotateG_05"></div>
        <div className="blockG" id="rotateG_06"></div>
        <div className="blockG" id="rotateG_07"></div>
        <div className="blockG" id="rotateG_08"></div>
      </div>
    </div>
  );
}