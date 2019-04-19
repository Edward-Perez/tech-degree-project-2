// Global Variables
const pageDiv = document.querySelector('.page');
const header = document.querySelector('.page-header');
const studentListArray = [...document.querySelectorAll('li')];
const numToShow = 10;

// Object holds all functions to create, append, and remove all HTML elements
// createAndAppend() calls createElement() from within function
const htmlObject = {
   createElement: (elementTag, property, value, appendTo) => {
      const element = document.createElement(elementTag);
      element[property] = value;
      return element;
   }, 
   // Will Create & Apply property value & Append a element with given params
   createAndAppend: (elementTag, property, value, appendTo) => {
      const element = htmlObject.createElement(elementTag, property, value, appendTo);
      appendTo.appendChild(element);
      return element;
   },
   // Create HTML for page link given arg from appendPageLink()
   pageLinks: (pageNum) => {
      const paginationDiv = htmlObject.createAndAppend('div', 'className', 'pagination', pageDiv);
      const paginationUl = htmlObject.createAndAppend('ul', '','', paginationDiv);
      for (let i = 0; i < pageNum; i++){
         const li = htmlObject.createAndAppend('li','className', 'pagination', paginationUl);
                     htmlObject.createAndAppend('a', 'href', '#', li).textContent = i+1;
                     pageDiv.appendChild(paginationDiv);
   }
   },
   // Creates the search bar
   searchBar: () => {
      const searchBarDiv = htmlObject.createAndAppend('form', 'type', 'submit', header)
         searchBarDiv.className = 'student-search';
         htmlObject.createAndAppend('input', 'placeholder', 'Enter Student Name...', searchBarDiv).type = 'text';
         htmlObject.createAndAppend('button', 'textContent', 'Search', searchBarDiv);
   },
   // Creates a error message from the message param
   errorPage: (message) => {
      // removes any page links or already present errors from repeating
      htmlObject.removeHTML('pagination');
      htmlObject.removeHTML('error');
      const errorMessage = htmlObject.createAndAppend('h1', 'className', 'js-errorMessage', pageDiv);
      errorMessage.textContent = message;
      studentListArray.forEach( function (item){
         item.style.display = 'none';
      });
   },
   // Removes HTML content given 1 of the 3 arguments available pagination, searchBar, error
   removeHTML: (content) => {
      if (content == 'pagination') {
         if (pageDiv.lastElementChild.className == 'pagination'){
            pageDiv.removeChild(pageDiv.lastElementChild);   
         }      
      }
      if (content == 'searchBar') {
         if (pageDiv.lastElementChild.className == 'student-search') {
            header.removeChild(header.lastElementChild);
         }
      }
      if (content == 'error') {
         if (pageDiv.lastElementChild.className == 'js-errorMessage') {
            pageDiv.removeChild(pageDiv.lastElementChild);
         }
      } 
   }       
};

// Function to call program
callProgram = () => {
   showPage(studentListArray, 1);
   appendPageLinks(studentListArray);
}

// Calls function to create & display search bar if not already present
// Displays contents to the page with given array and page index as arguments  
showPage = (list, page) => {
   if (header.lastElementChild.className != 'student-search'){
      searchBarCall();
   }
   const startIndex = (page * numToShow) - numToShow;
   const endIndex = (page * numToShow);
   list.forEach( function (item, index) {
      if (index < startIndex || index >= endIndex) {
         item.style.display = 'none';
      } else {
         item.style.display = '';
      }
   });
}


// Creates num of links and adds e.listener with functionality 
appendPageLinks = (list) => {
   htmlObject.removeHTML('pagination');
   if (typeof list == 'object') {
       arrayLength = list.length;
   }
   // Calls error function if list is false with string argument 
   if (!list) {
      return htmlObject.errorPage('Sorry, it appears the student is not register.');
   }
   const pageNum = Math.ceil(arrayLength / numToShow);

   // Calls function to create & display page links from main htmlObject 
   htmlObject.pageLinks(pageNum);

   // Adding e.listeners to each page link
   document.querySelector('a').className = 'active';
   const pageLink = document.querySelectorAll('a');  

   pageLink.forEach( function (item) {
      item.addEventListener('click', (e) => {
         const clickEvent = e.target;
         pageLink.forEach( function (item) {
            item.className = 'inactive';
         });
         if (clickEvent.tagName === 'A') {
            clickEvent.className = 'active';
            let pageNum = clickEvent.textContent;
            showPage(list, pageNum);
         } 
      });
   });
}

// Handles all of e.listeners arguments from search bar
// validates all inputs / return error message with text arg
// Sends a newly created array with input style values set to display to appendPageLinks()
searchInput = (input) => {
   let errorCounter = 0;
   let newListArray = [];

   if(!isNaN(parseInt(input))) {
      return htmlObject.errorPage('Please only letters...'); 
   }
   // removes any error messages if present
   htmlObject.removeHTML('error');

   studentListArray.forEach( function (item) {
      // indexOf() returns -1 if input value not found
      // Would love to learn a new shorter way of writing this if statement
      if(item.children[0].children[1].innerHTML.indexOf(input) === -1) {
         errorCounter += 1;
         if (errorCounter >= studentListArray.length) {
            // Call to errorPage() located in htmlObject above
            return htmlObject.errorPage('Sorry, it appears the student is not register.');
         } 
      }
      if (item.children[0].children[1].innerHTML.indexOf(input)) {
         item.style.display = 'none';
      } else {
         newListArray.push(item);
         item.style.display = ''; 
         // Sends new list array of present students
         appendPageLinks(newListArray);
      };
   });
}

// e.listeners for search bar / Handles value and sends to searchInput for validation
searchBarCall = () => {
   // Calls searchBar() in htmlObject above to create and append to the DOM
   htmlObject.searchBar();
   const form = document.querySelector('form');
   const input = document.querySelector('input');

   // e.listeners for both submit and keyup events
   form.addEventListener('submit', (e) =>{
      e.preventDefault();
      const nameSubmit = input.value;
      input.value = '';
      return searchInput(nameSubmit);
   });

   input.addEventListener('keyup', (e) =>{
      const name = input.value;
      // if the enter key is press this event will not interrupt the submit (e)
      // Would love to know a different method as MDN Web Docs states its been depreciated 
      if (e.keyCode === 13) {
         return
      }
      // When user clears input value in search bar, callProgram() is called to begin from start
      if (name == '') {
         htmlObject.removeHTML('error');
         return callProgram();
      }
      const nameInput = name.toLowerCase();
      searchInput(nameInput);
   });
}

// Calls program to start
callProgram();

