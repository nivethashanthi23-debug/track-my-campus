function trackBus() {
  const college = document.getElementById("collegeName").value.trim().toLowerCase();
  const busNo = document.getElementById("busNumber").value.trim().toLowerCase();
  const result = document.getElementById("result");

  console.log("College entered:", college);
  console.log("Bus entered:", busNo);
  console.log("Available data:", busData);

  if (!busData || Object.keys(busData).length === 0) {
    result.innerHTML = "❌ Bus data not loaded";
    return;
  }

  if (!busData[college]) {
    result.innerHTML = "❌ College not found";
    return;
  }

  if (!busData[college][busNo]) {
    result.innerHTML = "❌ Bus not found";
    return;
  }

  const bus = busData[college][busNo];
  result.innerHTML = `
    <div class="bus-card">
      <h3>🚌 Bus ${busNo.toUpperCase()}</h3>
      <p><b>Status:</b> ${bus.status}</p>
      <p><b>Delay Reason:</b> ${bus.reason || "-"}</p>
      <p><b>Stops:</b></p>
      <ul>
        ${bus.stops.map(s => `<li>${s.name} - ${s.time} min</li>`).join("")}
      </ul>
    </div>
  `;
}