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
const headings = document.querySelectorAll('.heading')

const checkHeader = () => {
  if (
    content.offsetTop - header.getBoundingClientRect().height - 50 <
    window.pageYOffset
  ) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
};

function checkSlide(e) {
  headings.forEach(heading => {
    const { y, height, top } = heading.getBoundingClientRect()
    if (window.scrollY >= y + top && window.scrollY <= y + top + height) {
      header.childNodes[1].innerHTML = heading.dataset.title;
    }
  });
}

window.addEventListener("scroll", debounce(checkHeader));
window.addEventListener("scroll", debounce(checkSlide), 20);

checkHeader();