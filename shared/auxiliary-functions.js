const querySelector = (val) => document.querySelector(val);

const querySelectorAll = (val) => document.querySelectorAll(val);

const createElement = (el) => document.createElement(el);

const appendChild = (father, child) => father.appendChild(child);

const setAttributes = (el, attrs) => {
  for (let key in attrs)
    el.setAttribute(key, attrs[key]);
}

const classListAdd = (el, cls) => {
  for (let cl of cls)
    el.classList.add(cl);
}

const getSession = (name) => JSON.parse(sessionStorage.getItem(name));

const setSession = (name, val) => sessionStorage.setItem(name, JSON.stringify(val));

const getPathName = () => window.location.pathname

const fadeOut = (el) => {
  el.style.transition = '0.5s';
  el.style.opacity = 1;
}