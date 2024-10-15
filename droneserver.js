const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 8000;

// Make express.json able to parse the JSON body
app.use(express.json());
app.use(cors());

const url = "https://script.googleusercontent.com/macros/echo?user_content_key=5vlVe95ehYi9up18Y10kvLJbJCi-EOZMiatwrbTdBA03e6d7FDVATTf5lWt3oNP4aCpGPjflVvPfkLC65c9QeNkHIkVGK4O9m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnOQwROx_Wq-O5wsPy5w5JUsdPdcpj8TWgjjVAuN4sDTiMrnThHKU7n7LmNcslGllO5_ldGegmAJuXjfvqC1tFaecv-CYmXuM6Nz9Jw9Md8uu&lib=M9_yccKOaZVEQaYjEvK1gClQlFAuFWsxN";
const urlog = "https://app-tracking.pockethost.io/api/collections/drone_logs/records";

// POST route to save logs
app.post("/logs", async (req, res) => {
  const rawdata = await fetch(urlog, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  res.send("ok");
});

// Test drone server at path /
app.get("/", (req, res) => {
  res.send("test drone server");
});

// Get drone config by drone_id
app.get("/configs/:drone_id", async (req, res) => {
  const rawdata = await fetch(url, { method: "GET" });
  const jsondata = await rawdata.json();
  const drone = jsondata.data;

  const id = req.params.drone_id;
  const mydrone = drone.find((item) => item.drone_id == id);

  if (mydrone) {
    if (mydrone.max_speed == null) {
      mydrone.max_speed = 100;
    }
    if (mydrone.max_speed > 110) {
      mydrone.max_speed = 110;
    }
    res.send(mydrone);
  } else {
    res.status(404).send({ error: "Drone not found" });
  }
});

// Check drone status by drone_id
app.get("/status/:drone_id", async (req, res) => {
  const rawdata = await fetch(url, { method: "GET" });
  const jsondata = await rawdata.json();
  const drone = jsondata.data;

  const id = req.params.drone_id;
  const mydrone = drone.find((item) => item.drone_id == id);

  if (mydrone) {
    res.send({ condition: mydrone.condition });
  } else {
    res.status(404).send({ error: "Drone not found" });
  }
});

// Show all logs
app.get("/logs", async (req, res) => {
  const rawdata = await fetch(urlog, { method: "GET" });
  const jsondata = await rawdata.json();
  const log = jsondata.items;
  res.send(log);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
