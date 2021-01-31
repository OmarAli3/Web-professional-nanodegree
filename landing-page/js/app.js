/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navList=document.querySelector('#navbar__list');
const dataSections=document.querySelectorAll('section');
const sectoinsCount=dataSections.length;
let activeSectionIndex=0;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const isInViewport = (section)=>{
    const rect = section.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight) &&
        rect.right <= (window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth)
    );
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = ()=>{
    const hiddenList = document.createDocumentFragment();
    for(const section of dataSections){
        const listItem = document.createElement('li');
        const anchorItem = document.createElement('a');
        anchorItem.addEventListener('click',(event)=>{
            event.preventDefault();
            window.scrollTo({
                top: section.offsetTop,
                left: 0,
                behavior: 'smooth'
              });
        });
        anchorItem.classList.add('menu__link');
        anchorItem.setAttribute('href',`#${section.id}`);
        anchorItem.innerText=section.getAttribute('data-nav');
        listItem.appendChild(anchorItem);
        hiddenList.appendChild(listItem);
    }
    navList.appendChild(hiddenList);

}

// Add class 'active' to section when near top of viewport
const getActiveSection = ()=>{
    let activeSectionIdx=activeSectionIndex;
    for(let sectionIndex=0; sectionIndex<sectoinsCount; sectionIndex++){
        if(isInViewport(dataSections[sectionIndex]))
            activeSectionIdx=sectionIndex;
    }
    return activeSectionIdx;
}

const activateSection = ()=>{
    if(sectoinsCount==0)return;
    const lastActiveSection = dataSections[activeSectionIndex];
    activeSectionIndex=getActiveSection();
    activeSection=dataSections[activeSectionIndex];
    lastActiveSection.classList.remove('active__section');
    document.querySelector(`a[href="#${lastActiveSection.id}"]`).classList.remove('active__link');
    activeSection.classList.add('active__section');
    document.querySelector(`a[href="#${activeSection.id}"]`).classList.add('active__link');
}
// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
document.addEventListener('DOMContentLoaded',activateSection);
document.addEventListener('scroll',activateSection);
// Scroll to section on link click

// Set sections as active


