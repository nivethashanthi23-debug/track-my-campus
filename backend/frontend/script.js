/**************** LOGIN DATA ****************/
const users = {
  "nivethashanthi23@gmail.com": { password: "nivi", type: "student" },
  "nivethasundaram83@gmail.com": { password: "sunshan", type: "admin" }
};

/**************** LOGIN FUNCTION ****************/
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const type = document.getElementById("userType").value;
  const msg = document.getElementById("loginMessage");
  function trackBus() {
  const bus = document.getElementById("bus").value;
  const stop = document.getElementById("stop").value;

  fetch(`/track?bus=${bus}&stop=${stop}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        `Bus ${data.bus} will reach ${data.nextStop} in ${data.eta}`;
    })
    .catch(err => {
      console.log(err);
    });
}

  if (
    users[email] &&
    users[email].password === password &&
    users[email].type === type
  ) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "trackbus.html";
  } else {
    msg.innerText = "❌ Invalid login";
    msg.style.color = "red";
  }
}

/**************** PROTECT TRACK PAGE ****************/
if (window.location.pathname.includes("trackbus.html")) {
  if (!sessionStorage.getItem("loggedIn")) {
    window.location.href = "index.html";
  }
}
/**************** BUS DATA LOAD ****************/
let busData = {};
let timer = null;

fetch("https://YOUR-BACKEND-RENDER-URL/api/buses")
  .then(res => res.json())
  .then(data => {
    busData = data;
    console.log("Bus data loaded");
  })
  .catch(err => console.error("Bus fetch error", err));

/**************** TRACK BUS FUNCTION ****************/
function trackBus() {
  const college = document.getElementById("collegeName").value.trim().toLowerCase();
  const busNo = document.getElementById("busNumber").value.trim().toLowerCase();
  const result = document.getElementById("result");

  if (!busData[college] || !busData[college][busNo]) {
    result.innerHTML = "❌ Bus not found";
    return;
  }

  if (timer) clearInterval(timer);

  const bus = busData[college][busNo];
  let stopIndex = 0;
  let eta = bus.stops[0].time;

  function render() {
    const current = bus.stops[stopIndex];
    const next = bus.stops[stopIndex + 1];

    result.innerHTML = `
      <div class="bus-card">
        <h3>🚌 Bus ${busNo.toUpperCase()}</h3>

        <p><b>Status:</b> ${bus.status}</p>
        <p><b>Delay Reason:</b> ${bus.reason || "-"}</p>

        <p>📍 <b>Current Location:</b> ${current.name}</p>
        <p>➡️ <b>Next Stop:</b> ${next ? next.name : "College Gate"}</p>

        <p>⏳ <b>ETA:</b> ${eta}</p>
      </div>
    `;
  }

  render();

  timer = setInterval(() => {
    eta--;

    if (eta < 0) {
      stopIndex++;

      // reached college
      if (stopIndex >= bus.stops.length - 1) {
        result.innerHTML = `
          <div class="bus-card">
            <h3>🚌 Bus ${busNo.toUpperCase()}</h3>
            <p>✅ <b>Bus reached College Gate</b></p>
            <p><b>Status:</b> ${bus.status}</p>
            <p><b>Delay Reason:</b> ${bus.reason || "-"}</p>
          </div>
        `;
        clearInterval(timer);
        return;
      }

      // move to next stop
      eta = bus.stops[stopIndex].time;
    }

    render();
  }, 1000); // 🔥 1000 = fast demo (change to 60000 for real time)
}