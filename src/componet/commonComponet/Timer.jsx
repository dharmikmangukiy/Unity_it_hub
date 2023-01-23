import React from "react";

const Timer = (prop) => {
  const [seconds, setSeconds] = React.useState(prop.seconds);
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("BOOOOM!");
    }
  });
  const secondsToHms = (d) => {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? (h > 9 ? h : `0${h}`) : "00";
    var mDisplay = m > 0 ? (m > 9 ? m : `0${m}`) : "00";
    var sDisplay = s > 0 ? (s > 9 ? s : `0${s}`) : "00";
    return `${hDisplay} : ${mDisplay} : ${sDisplay}`;
  };

  return secondsToHms(seconds);
};

export default Timer;
