import * as React from "react";

function Counter(prop) {
  const [counter, setCounter] = React.useState(30);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter == "00") {
      prop.setReset(false);
    }
  }, [counter]);
  React.useEffect(() => {
    if (prop.reset == true) {
      setCounter(30);
    }
  }, [prop.reset]);

  return <span>00:{counter}</span>;
}

export default Counter;
