import React, { useState } from 'react';

function App() {
  return (
    <div style={{ background: "#dfe6e9", height: "100vh" }}>

    <ToggleMessage />
      <NotiCount />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <PostComponent
            name={"Yash's Acc"}
            subtitles={"25 followers"}
            time={"15m ago"}
            image={"https://images-platform.99static.com//4WorkDkEK3OwbyklKS_mSCGYBKs=/1158x462:2172x1477/fit-in/590x590/projects-files/161/16190/1619090/098156fe-cafc-475d-a129-10114d3a945b.png"}
            description={"hello this is written by me personally soo please make sure to like it as soon as possible"}
          />

          <br />

          <PostComponent
            name="Raman"
            subtitles={"promoted"}
            image="https://images-platform.99static.com//4WorkDkEK3OwbyklKS_mSCGYBKs=/1158x462:2172x1477/fit-in/590x590/projects-files/161/16190/1619090/098156fe-cafc-475d-a129-10114d3a945b.png"
            description="How to get hired in 2024? I lost my job in 2023, this is the roadmap I followed to get a job."
          />
        </div>
      </div>
    </div>
  );
}

const style = {
  width: 200,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  padding: 20,
};

const ToggleMessage = () => {
  let [isVisible, setIsVisible] = useState(true);

  function toggle() {
    setIsVisible(!isVisible);
  }

  // const [isVisible, setIsVisible] = useState(false); // defining a new state variable

  return (
    <div>
      <button onClick={toggle}>Toggle Message</button>

      {isVisible && <p>This message is conditionally rendered!</p>}
    </div>
  );
};

const NotiCount = () => {
  let [notificationCount, setNotificationCount] = useState(0);

  function increment() {
    setNotificationCount(notificationCount + 1);
  }

  return (
    <div>
      <button onClick={increment}> Increase Count </button>
      {notificationCount}
    </div>
  );
};

function PostComponent({ name, subtitles, time, image, description }) {
  return (
    <div style={style}>
      <div style={{ display: "flex" }}>
        <img
          src={image}
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
          }}
        />

        <div style={{ fontSize: 15, marginLeft: 10 }}>
          <b>{name}</b>

          <div>{subtitles}</div>

           {time !== undefined && <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div>{time}</div>

            <img
              src="https://w7.pngwing.com/pngs/680/15/png-transparent-alarm-clock-movement-quartz-clock-digital-clock-clock-angle-time-ikea-thumbnail.png"
              style={{
                width: 10,
                height: 10,
              }}
            />
          </div>}
        </div>
      </div>

      <div style={{ fontSize: 18 }}>
        {description}
      </div>
    </div>
  );
}

export default App;