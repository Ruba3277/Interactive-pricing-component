
const sliderInput = document.querySelector(".slider-input");


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


sliderInput.addEventListener("input", () => {

   sliderInput.classList.add("changed");

   clearTimeout(colorTimeout);

   colorTimeout = setTimeout(() => {
        sliderInput.classList.remove("changed");
    }, 2000); // 2 seconds
   currentIndex = Number(sliderInput.value);
   updateSlider();
});

function updateSlider() {
    const plan = plans[currentIndex];
    viewsCount.textContent = plan.views;

    const isYearly = billingSwitch.checked;
    const finalPrice = isYearly ? plan.price * 0.75 : plan.price;
    price.textContent = `$${finalPrice.toFixed(2)}`;

    const percentage = (currentIndex / (plans.length - 1)) * 100;

    

    sliderInput.style.setProperty("--fill", percentage + "%");
}




billingSwitch.addEventListener("change", updateSlider);

updateSlider();
