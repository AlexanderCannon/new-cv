function debounce(func, wait = 10, immediate = false) {
  let timeout;
  return () => {
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(this, arguments);
    }, wait);
    if (callNow) func.apply(this, arguments);
  };
}

const header = document.querySelector("header");
const content = document.querySelector(".content");

const checkHeader = () => {
  if (
    content.offsetTop - header.getBoundingClientRect().height - 100 <
    window.pageYOffset
  ) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

window.addEventListener("scroll", debounce(checkHeader));

checkHeader();
