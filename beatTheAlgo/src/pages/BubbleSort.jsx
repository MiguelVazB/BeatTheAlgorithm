import React from "react";
import "./pageStyles/BubbleSort.css";
import { generateXRandomNumbers } from "../utils/randomNumbers.jsx";

export const BubbleSort = () => {
  const [valuesToSort, setValuesToSort] = React.useState([]);

  React.useEffect(() => {
    let randomNumbers = generateXRandomNumbers(5);
    let values = randomNumbers.map((x, index) => {
      return (
        <p className="valueToSort" key={`${x} ${index}`}>
          {x}
        </p>
      );
    });
    setValuesToSort(values);
  }, []);

  return (
    <main className="bubbleSort">
      <div className="computerSide">{valuesToSort}</div>
      <div className="userSide">user</div>
    </main>
  );
};
