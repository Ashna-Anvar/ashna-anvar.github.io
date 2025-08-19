// ---------- Dynamic Greeting ----------
function updateGreeting() {
  const hr = new Date().getHours();
  document.getElementById("greeting").textContent =
    hr < 12 ? "Good morning!" : hr < 18 ? "Good afternoon!" : "Good evening!";
}
updateGreeting();

// ---------- Projects Gallery (with jQuery) ----------
const projects = [
  {
    title: "Project One",
    desc: "A college event tracker built using HTML, CSS, and JS.",
    img: "images/project1.jpg"
  },
  {
    title: "Project Two",
    desc: "A smart notes app with search and tags.",
    img: "images/project2.jpg"
  },
  {
    title: "Project Three",
    desc: "Portfolio builder tool to generate personal sites.",
    img: "images/project3.jpg"
  }
];

// Build thumbnails
projects.forEach((p, i) => {
  $("#project-gallery").append(
    `<img src="${p.img}" alt="${p.title}" data-i="${i}" class="project-thumb">`
  );
});

// Handle click on project thumbnail
$(document).on("click", ".project-thumb", function () {
  const proj = projects[$(this).data("i")];
  $("#project-details").html(`
    <h3>${proj.title}</h3>
    <img src="${proj.img}" alt="${proj.title}" style="max-width:300px;border-radius:8px;margin:10px 0">
    <p>${proj.desc}</p>
  `);
});

// Show first project by default
if (projects.length) {
  setTimeout(() => $(".project-thumb").first().trigger("click"), 100);
}

// ---------- Weather API ----------
async function getWeather(city) {
  const key = "YOUR_API_KEY"; // 🔑 Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return res.json();
}

$("#get-weather-btn").on("click", async () => {
  const city = $("#city-input").val().trim();
  const out = $("#weather-display");

  if (!city) return out.text("Please enter a city name.");
  out.text("Loading...");

  try {
    const data = await getWeather(city);
    out.html(`
      <h3>${data.name}</h3>
      <p><strong>${Math.round(data.main.temp)}°C</strong>, ${data.weather[0].description}</p>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    `);
  } catch (err) {
    out.text(err.message);
  }
});

// ---------- Contact Form ----------
$("#contact-form").on("submit", (e) => {
  e.preventDefault();
  const name = $("#name").val().trim();
  const email = $("#email").val().trim();
  const msg = $("#message").val().trim();

  if (!name || !email || !msg) {
    alert("Please fill out all fields.");
    return;
  }

  // Very simple email format check
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!validEmail) {
    alert("Please enter a valid email address.");
    return;
  }

  alert("Message sent successfully (demo).");
  e.target.reset();
});



