const progressBar = document.querySelector(".progress-bar");
const progressFill = document.querySelector(".progress-fill");
const slider = document.querySelector(".slider");

const viewsCount = document.querySelector(".views-count");
const price = document.querySelector(".price");

const billingSwitch = document.querySelector(".switch input");



const plans = [
  { views: "10K", price: 8 },
  { views: "50K", price: 12 },
  { views: "100K", price: 16 },
  { views: "500K", price: 24 },
  { views: "1M", price: 32 }
];

let currentIndex = 2;
let isDragging = false;

slider.addEventListener("pointerdown", (e) => {
    // start dragging
    isDragging = true;
    slider.setPointerCapture(e.pointerId);
});

slider.addEventListener("pointermove", (e) => {
    // move slider
    if (!isDragging) return;
    const barPosition = progressBar.getBoundingClientRect();

    const position = e.clientX - barPosition.left;

    let percentage = (position / barPosition.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    currentIndex = Math.round(
        (percentage / 100) * (plans.length - 1)
    );
    
    slider.classList.add("active");
    updateSlider();
    setTimeout(() => {
        slider.classList.remove("active");
    }, 2000);
});

slider.addEventListener("pointerup", (e) => {
    // stop dragging
    isDragging = false;
});

progressBar.addEventListener("click", (e) => {
    const barPosition = progressBar.getBoundingClientRect();

    const position = e.clientX - barPosition.left;

    const percentage = (position / barPosition.width) * 100;

    currentIndex = Math.round(
        (percentage / 100) * (plans.length - 1)
    );

    slider.classList.add("active");


    updateSlider();
    setTimeout(() => {
        slider.classList.remove("active");
    }, 2000);
});

function updateSlider() {
    const plan = plans[currentIndex];
    viewsCount.textContent = plan.views;

    const isYearly = billingSwitch.checked;
    const finalPrice = isYearly
        ? plan.price * 0.75
        : plan.price;

    price.textContent = `$${finalPrice.toFixed(2)}`;


    const percentage =
        (currentIndex / (plans.length - 1)) * 100;

    progressFill.style.width = `${percentage}%`;
    slider.style.left = `${percentage}%`;
}

updateSlider();
billingSwitch.addEventListener("change", updateSlider);
updateSlider();

