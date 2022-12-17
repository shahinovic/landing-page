// # start global variables

const header = document.querySelector('.page__header');
const list = document.querySelector('#navbar__list');
const sections = Array.from(document.querySelectorAll('section'));
const toggler = document.createElement('button');
const bar = document.createElement('span');
const spans = `<span></span><span></span><span></span><span></span>`;
const svg = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2_46)">
  <path d="M21.2211 0.893066L24 3.92465L12.1263 15.7983L0 3.92465L3.03158 0.893066L12.1263 9.9878L21.2211 0.893066Z" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_2_46">
  <rect width="24" height="24" fill="white" transform="translate(0 0.893066)"/>
  </clipPath>
  </defs>
  </svg>
  `;
const collapsedH2 = document.querySelectorAll('.landing__container h2');
const btnHover = document.querySelectorAll('.btn-hover');
let timer = null;

// # end global variable

// # start helper functions

// add link to the list

let AddLinks = (ele) => {
  let li = document.createElement('li');
  let a = document.createElement('a');
  a.textContent = ele.dataset.nav;
  a.setAttribute('href', `#${ele.id}`);
  a.className = `menu__link ${ele.id}`;
  a.classList.add('btn-hover');
  for (let i = 0; i < 4; i++) {
    a.appendChild(document.createElement('span'));
  }
  // add click event to link to move smoothly
  a.onclick = scroller;
  li.appendChild(a);
  list.appendChild(li);
};

// this function made for smooth scrolling

let scroller = (e) => {
  e.preventDefault();
  let sec = document.querySelector(`${e.target.getAttribute('href')}`).offsetTop;
  window.scrollTo({
    top: sec,
    behavior: 'smooth'
  });
};

// open and close the navbar menu
const toggleFunction = () => {
  list.classList.toggle('open');
  toggler.classList.toggle('close');
};

// add active class to the section in the viewport

const shower = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('your-active-class');
      document.querySelector(`.${entry.target.id}`).classList.add('active');
    } else {
      entry.target.classList.remove('your-active-class');
      document.querySelector(`.${entry.target.id}`).classList.remove('active');
    }
  });
});

// this function for hide the header
const transNav = () => {
  document.querySelector('header').style = 'transform: translateY(-100px);';
  list.classList.remove('open');
  toggler.classList.remove('close');
};

// this function to make a delay before hide the navbar

const hiddenNavbar = () => {
  timer !== null ? clearTimeout(timer) : null;
  timer = setTimeout(transNav, 3000);
};

// # end helper functions

/*
when the function load this function will
 - add spans -important part for animation- to all the elements witch have btn-hover class
 - add svg to the h2 on every element has class landing__container
  - for know this section can be collapsed

*/
window.addEventListener('load', () => {
  btnHover.forEach((ele) => (ele.innerHTML += spans));
  collapsedH2.forEach((ele) => (ele.innerHTML += svg));
});

// looping in the sections and make a link to each section
sections.map(AddLinks);

// add id 'toggler' to the toggle btn

toggler.setAttribute('id', 'toggler');

// add bars to toggler btn

for (let i = 0; i < 3; i++) {
  bar.classList.add('bar');
  toggler.appendChild(bar);
}

// add the toggler btn to the navbar

document.querySelector('.navbar__menu').appendChild(toggler);

// open and close navbar menu when user click the toggler btn

toggler.addEventListener('click', toggleFunction);

// add class active to the section on the view port

document.querySelectorAll('section').forEach((ele) => shower.observe(ele));

// hide the navbar when the scroll stop

window.addEventListener('scroll', hiddenNavbar, false);

// show navbar when user scroll scroll

window.onscroll = () => {
  document.querySelector('header').style = 'transform: translateY(0);';
};

// open and close sections when user click on the h2 element

Array.from(collapsedH2).map((ele) =>
  ele.addEventListener('click', () => ele.parentElement.classList.toggle('collapse'))
);
