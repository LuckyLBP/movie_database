/***** searchToggle.ts *****/

// Define a function to add events on multiple elements
export const addEventsOnElements = (elements: NodeListOf<Element>, eventType: string, callback: EventListenerOrEventListenerObject): void => {
    elements.forEach(elem => {
      elem.addEventListener(eventType, callback);
    });
  };
  
  // Define a function to toggle the search box
  export const toggleSearchBox = (): void => {
    const searchBox = document.querySelector('[search-box]') as HTMLElement;
    const searchTogglers = document.querySelectorAll('[search-toggler]');
  
    const toggleActiveClass = (): void => {
      searchBox.classList.toggle('active');
    };
  
    addEventsOnElements(searchTogglers, 'click', toggleActiveClass);
  };
  