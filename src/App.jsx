import { useState, useEffect } from "react";
import Floor from "./Components/Floor";
import Modal from "./Components/Modal";
import "./index.css"

function App() {
  const [floors, setFloors] = useState(1);
  const [lifts, setLifts] = useState(1);
  const [modalClose, setModalClose] = useState(false);
  const [liftPositions, setLiftPositions] = useState(Array(lifts).fill(0));
  const [liftDoors, setLiftDoors] = useState(Array(lifts).fill(false));

  useEffect(() => {
    setLiftPositions(Array(lifts).fill(0));
    setLiftDoors(Array(lifts).fill(false));
  }, [lifts]);

  const setFloorChange = (e) => {
    e.preventDefault();
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    setFloors(value);
  };
  
  const setLiftChange = (e) => {
    e.preventDefault();
    const value = e.target.value === "" ? "" : parseInt(e.target.value);
    setLifts(value);
  };

  const setConfigurations = (e) => {
    e.preventDefault();
    setModalClose(true);
  };

  const moveLift = (calledFloor, direction) => {
    let distanceMin = floors;
    let nearestLift = 0;
  
    liftPositions.forEach((liftPos, index) => {
      let distance = Math.abs(liftPos - calledFloor);
      if (distance < distanceMin) {
        distanceMin = distance;
        nearestLift = index;
      }
    });
  
    const timeToReach = Math.abs(liftPositions[nearestLift] - calledFloor) * 2000; // 2 seconds per floor
  
    const openAndCloseDoors = (floor) => {
      return new Promise((resolve) => {
        setLiftPositions((prevPosition) => {
          let newPosition = [...prevPosition];
          newPosition[nearestLift] = floor;
          return newPosition;
        });
  
        setLiftDoors((prevDoors) => {
          let newDoors = [...prevDoors];
          newDoors[nearestLift] = true;
          return newDoors;
        });
  
        setTimeout(() => {
          setLiftDoors((prevDoors) => {
            let newDoors = [...prevDoors];
            newDoors[nearestLift] = false;
            return newDoors;
          });
  
          setTimeout(resolve, 2500);
        }, 2500);
      });
    };
  
    if (liftPositions[nearestLift] === calledFloor) {
      if ((calledFloor === 0 && direction === "down") || (calledFloor === floors - 1 && direction === "up")) {
        // If the lift is already on the ground floor and the direction is down,
        // or on the top floor and the direction is up, open and close doors only once
        openAndCloseDoors(calledFloor);
      } else {
        // If the lift is already on the called floor, open and close doors, then move to the target floor
        openAndCloseDoors(calledFloor).then(() => {
          setTimeout(() => {
            openAndCloseDoors(direction === "up" ? floors - 1 : 0);
          }, 2500);
        });
      }
    } else {
      // Move to the called floor and open and close the lift
      setTimeout(() => {
        openAndCloseDoors(calledFloor).then(() => {
          // Move to the top or bottom floor and repeat the process
          setTimeout(() => {
            openAndCloseDoors(direction === "up" ? floors - 1 : 0);
          }, 2500);
        });
      }, timeToReach);
    }
    
  };
  

  return (
    <>
      <Modal
        floorsNum={floors}
        handleFloorChange={setFloorChange}
        liftsNum={lifts}
        handleLiftChange={setLiftChange}
        handleClose={modalClose}
        handleConfigurations={setConfigurations}
      />
      <div className="building">
        {[...Array(floors)].map((ele, index) => (
          <Floor
            moveLift={moveLift}
            id={index}
            key={index}
            floors={floors}
            lifts={lifts}
            liftPositions={liftPositions}
            liftDoors={liftDoors}
          />
        ))}
      </div>
    </>
  );
}

export default App;
