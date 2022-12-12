const header = document.querySelector('.page__header'),
  list = document.querySelector('#navbar__list'),
  sections = Array.from(document.querySelectorAll('section')),
  toggler = document.createElement('button'),
  svg = `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_2_46)">
  <path d="M21.2211 0.893066L24 3.92465L12.1263 15.7983L0 3.92465L3.03158 0.893066L12.1263 9.9878L21.2211 0.893066Z" fill="white"/>
  </g>
  <defs>
  <clipPath id="clip0_2_46">
  <rect width="24" height="24" fill="white" transform="translate(0 0.893066)"/>
  </clipPath>
  </defs>
  </svg>
  `,
  spans = `<span></span><span></span><span></span><span></span>`,
  collapsedH2 = document.querySelectorAll('.landing__container h2'),
  btnHover = document.querySelectorAll('.btn-hover');

window.addEventListener('load', () => {
  btnHover.forEach((ele) => {
    ele.innerHTML += spans;
  });
  collapsedH2.forEach((ele) => {
    ele.innerHTML += svg;
  });
});

let scroller = (e) => {
  e.preventDefault();
  let sec = document.querySelector(`${e.target.getAttribute('href')}`).offsetTop;
  window.scrollTo({
    top: sec,
    behavior: 'smooth'
  });
};
// add link to the list

let AddLinks = (ele) => {
  let li = document.createElement('li'),
    a = document.createElement('a');

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

// looping in the sections and make a link to each section
sections.map(AddLinks);
// scroll smoothly function

// toggle menu button
toggler.setAttribute('id', 'toggler');
for (let i = 0; i < 3; i++) {
  let bar = document.createElement('span');
  bar.classList.add('bar');
  toggler.appendChild(bar);
}
document.querySelector('.navbar__menu').appendChild(toggler);

toggler.addEventListener('click', () => {
  list.classList.toggle('open');
  toggler.classList.toggle('close');
});

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
document.querySelectorAll('section').forEach((ele) => shower.observe(ele));

// hide the navbar when the scroll stop

let timer = null;
window.addEventListener(
  'scroll',
  () => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      document.querySelector('header').style = 'transform: translateY(-100px);';
      list.classList.remove('open');
      toggler.classList.remove('close');
    }, 4000);
  },
  false
);
window.onscroll = () => {
  document.querySelector('header').style = 'transform: translateY(0);';
};

Array.from(collapsedH2).map((ele) => {
  ele.addEventListener('click', () => {
    ele.parentElement.classList.toggle('collapse');
  });
});
