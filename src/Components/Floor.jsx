import React from "react";
import Lift from "./Lift";
import "../index.css"

function Floor({ moveLift, id, liftPositions, liftDoors }) {
  const handleClick = (e) => {
    e.preventDefault();
    moveLift(id, e.target.id);
  };

  return (
    <div className="floor">
      {id === 0 ? (
        <h2 style={{ width: "100px" }}>Ground Floor</h2>
      ) : (
        <h2 style={{ width: "100px" }}>Floor {id}</h2>
      )}
      <div className="buttons" onClick={handleClick}>
        <button id="up" style={{ background: "Yellow" }}>
          Up
        </button>
        <button id="down" style={{ background: "Green" }}>
          Down
        </button>
      </div>
      {liftPositions.map((pos, index) =>
        pos === id ? (
          <Lift key={index} number={index + 1} doorsOpen={liftDoors[index]} />
        ) : null
      )}
    </div>
  );
}

export default Floor;
