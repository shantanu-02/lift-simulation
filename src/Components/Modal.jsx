import React from "react";
import "../index.css";

function Modal({
  floorsNum,
  handleFloorChange,
  liftsNum,
  handleLiftChange,
  handleClose,
  handleConfigurations,
}) {
  if (handleClose) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleConfigurations}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Configure Floors</h2>
        </div>
        <div className="modal-body">
          <label>
            No. of floors:
            <input
              type="number"
              value={floorsNum === 0 ? "" : floorsNum}
              onChange={handleFloorChange}
            /> 
          </label>
        </div>
        <div className="modal-body">
          <label>
            No. of lifts:
            <input
              type="number"
              value={liftsNum === 0 ? "" : liftsNum}
              onChange={handleLiftChange}
            />
          </label>
        </div>
        <button onClick={handleConfigurations}>Set Configurations</button>
      </div>
    </div>
  );
}

export default Modal;
