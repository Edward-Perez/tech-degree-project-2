/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/   


// Main 2 functions to create and append HTML elements store in a const variable
// Calling createAndAppend will call createElement() within its function
const htmlObject = {
   createElement: (elementTag, property, value, appendTo) => {
      const element = document.createElement(elementTag);
      element[property] = value;
      return element;
   }, 
   createAndAppend: (elementTag, property, value, appendTo) => {
      const element = htmlObject.createElement(elementTag, property, value,appendTo);
      appendTo.appendChild(element);
      return element;
   }
};

// Global variables to share
const mainDiv = document.getElementsByTagName('div')[0];
const li = mainDiv.children[1].children;
const paginationDiv = htmlObject.createElement('div', 'className', 'pagination');
const allLinks = document.getElementsByTagName('a');

// Main function to generate page, search and error results
// page , search, and error functions located in const functionObject as an object
showPage = (startIndex) => {
   const h2 = mainDiv.getElementsByTagName('h2');

   //object to store functions
   const functionObject = { 
         //simple math logic to determine display
         startPagination: function (startIndex) {
            h2[0].innerHTML = 'Students';
            let endIndex = startIndex + 9;
            for(let i = 0; i < li.length; i ++) {
               if (i < startIndex || i > endIndex){
                  li[i].style.display = 'none';
               } else {
                  li[i].style.display = '';
               }
            }
         },
         // Validates 'keyup' and 'submit' listener startIndex value.
         // Tried working out a more concise way of writing the 'if' statement but failed to do so
         // Would love any feedback on a more concise way
         startList: function (startIndex) {
            // returns original title back to Students if the errorPage() title is invoke
            h2[0].innerHTML = 'Students';

            // indexOf() returns a (-1) if not found, if -1 happens more than list.length
            // errorPage() is invoke
            let errorCounter = 0;

            for(let i = 0; i< li.length; i++) {
               if(li[i].children[0].children[1].innerHTML.indexOf(startIndex) === -1) {
                  errorCounter += 1;
                  if (errorCounter >= li.length) {
                     return functionObject.errorPage();
                  }
               }
               // displays list students to style to none if statement is true or -1
               // else for the remainder who value is 0 or false, display set to ''
               if (li[i].children[0].children[1].innerHTML.indexOf(startIndex)) {
                  li[i].style.display = 'none';
               } else {
                  li[i].style.display = '';
                  
               }
            }
         },

         // Replace h2 content with new title and removes all students from display
         errorPage: function () { 
            h2[0].innerHTML = 'No such name present...';
            for(let i = 0; i < li.length; i ++) {
               li[i].style.display = 'none';
            }
         }      
   };
   // if any functions or eventListener would like to call on the errorPage(), 
   // simply call showPage() with the arg value = 'error' 
   if (startIndex === 'error') {
      return functionObject.errorPage();
   }
   // Passes only if startIndex is a number value
   if (startIndex === 0 ||  !isNaN(startIndex)) {
      return functionObject.startPagination(startIndex);
   } 
   // Passes only if startIndex is a string value
   if (isNaN(startIndex)) {
      return functionObject.startList(startIndex);
   }
}

// generate, append, and add functionality to the pagination buttons
// (elementTag, property, value, appendTo)
// Calling createAndAppend will call createElement() within its function
appendPageLinks = () => {
   // showPage(0) starts page on page link 1
   // searchBar() creates search bar
   showPage(0);
   searchBar();
   const pageNum = Math.ceil(li.length / 10);
   for (let i = 0; i < pageNum; i++){
      const li = htmlObject.createAndAppend('li','className', 'none', paginationDiv);
                  htmlObject.createAndAppend('a', 'href', '#', li).textContent = i+1;
                  mainDiv.appendChild(paginationDiv);
   }
   allLinks[0].className = 'active';
}

// generates and appends the search bar
// Params (elementTag, property, value, appendTo)
// Calling createAndAppend will call createElement() within its function
searchBar = () => {
   const headerDiv = mainDiv.children[0];
   const searchBarDiv = htmlObject.createAndAppend('form', 'type', 'submit',headerDiv,)
      searchBarDiv.className = 'student-search';
      htmlObject.createAndAppend('input', 'placeholder', 'Enter Student Name...', searchBarDiv).type = 'text';
      htmlObject.createAndAppend('button', 'textContent', 'Search', searchBarDiv);
}

// Loads page 1 on start up 
// Placement is imperative, the function generates require HTML elements for event listeners
appendPageLinks();

// Handles any clicks from page links
mainDiv.addEventListener('click', (e) => {
   const link = e.target;
   let startIndex;
   for (let i = 0; i < allLinks.length; i++){
      allLinks[i].className = 'inactive';
   }
   // Simple math logic to determine start index value
   if(link.tagName === 'A') {
      startIndex = (link.textContent * 10) - 10;
      showPage(startIndex);
      link.className = 'active';
   }      
});

// Form variables for Event Listeners
const form = document.getElementsByTagName('form')[0];
const input = form.querySelector('input');

// Handles any submit event from the form element/search bar
form.addEventListener('submit', (e) =>{
   e.preventDefault();
   const name = input.value;
   input.value = '';
   // Prevents a number or empty string by returning errorPage() in showPage() 
   if(parseInt(name) || name === '') {
      return showPage('error');
   }
   showPage(name);
});

// Handles any keyup event from the search bar input field

input.addEventListener('keyup', (e) =>{
   const name = input.value;
   // Allows submit eventListener to complete without interruption 
   // keyCode 13 is the 'Enter/Return' key
   if (e.keyCode === 13) {
      return
   }
   //Prevents a Number from being enter in the search bar
   if(parseInt(name)) {
      return showPage('error');
   }
   showPage(name.toLowerCase());
           
});
