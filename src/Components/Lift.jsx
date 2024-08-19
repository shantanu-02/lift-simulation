import React from "react";
import "../index.css";

function Lift({ number, doorsOpen }) {
  return (
    <div className="lift">
        <div className={`lift-doors ${doorsOpen ? "open" : "closed"}`}>
          <div className="door left-door"></div>
          <div className="door right-door"></div>
        </div>
        <h3>Lift {number}</h3>
    </div>
  );
}

export default Lift;
