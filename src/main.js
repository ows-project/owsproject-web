const waitlistForm = document.querySelector("#waitlist-form");
const submitButton = waitlistForm.querySelector('button[type="submit"]');

waitlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (submitButton.disabled) return;

  const body = new URLSearchParams(new FormData(waitlistForm));
  submitButton.disabled = true;
  submitButton.textContent = "Joining…";
  waitlistForm.setAttribute("aria-busy", "true");

  try {
    const response = await fetch(waitlistForm.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
    });
    window.location.assign(
      response.ok ? "/waitlist/success/" : "/waitlist/error/",
    );
  } catch {
    window.location.assign("/waitlist/error/");
  }
});

const options = [...document.querySelectorAll(".slide-option")];
const liveGrid = document.querySelector(".live-grid");
const liveOptions = options.map((option, i) => {
  const clone = option.cloneNode(true);
  clone.removeAttribute("data-slide");
  clone.setAttribute("aria-label", `Send slide ${i + 1} live`);
  liveGrid.append(clone);
  clone.addEventListener("click", () => showSlide(i));
  return clone;
});
let current = 0;
let selected = 1;

function selectPreview(index) {
  selected = index;
  options.forEach((option, i) => {
    option.classList.toggle("active", i === selected);
    option.setAttribute("aria-pressed", String(i === selected));
  });
  document.querySelector("#preview-count").textContent =
    `Slide ${selected + 1} of ${options.length}`;
}

function showSlide(index) {
  current = (index + options.length) % options.length;
  liveOptions.forEach((option, i) => {
    option.classList.toggle("active", i === current);
    option.setAttribute("aria-pressed", String(i === current));
  });
  document.querySelector("#slide-count").textContent =
    `${current + 1} / ${options.length}`;
}

options.forEach((option, i) =>
  option.addEventListener("click", () => selectPreview(i)),
);
document
  .querySelector("#go-live")
  .addEventListener("click", () => showSlide(selected));
document
  .querySelector("#previous")
  .addEventListener("click", () => showSlide(current - 1));
document
  .querySelector("#next")
  .addEventListener("click", () => showSlide(current + 1));
selectPreview(selected);
showSlide(0);

const previewToggle = document.querySelector("#preview-toggle");
previewToggle.addEventListener("click", () => {
  const expanded = previewToggle.getAttribute("aria-expanded") !== "true";
  previewToggle.setAttribute("aria-expanded", String(expanded));
  previewToggle.textContent = expanded
    ? "Close preview ↑"
    : "Explore the preview ↗";
  document
    .querySelector(".product-area")
    .classList.toggle("expanded", expanded);
  document.querySelector(".app-window").inert = !expanded;
});
