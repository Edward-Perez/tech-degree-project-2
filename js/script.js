/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/   
const mainDiv = document.getElementsByTagName('div')[0];
const headerDiv = document.getElementsByTagName('div')[1];
const objectList = document.querySelectorAll('li');
const paginationDiv = document.createElement('div');
//const searchBarDiv = document.createElement('div');
const allLinks = document.getElementsByTagName('a');
paginationDiv.className = 'pagination';

const htmlObject = {
   createElement: (elementTag, appendTo, property, value,) => {
      const element = document.createElement(elementTag);
      element[property] = value;
      return element;
   }, 
   createAndAppend: (elementTag, appendTo, property, value) => {
      const element = htmlObject.createElement(elementTag, appendTo, property, value);
      appendTo.appendChild(element);
      return element;
   }
};

showPage = (startIndex) => {
   console.log(startIndex);
   console.log(isNaN(startIndex));
   const functionObject = { 
         startPagination: function (startIndex) {
            let endIndex = startIndex + 9;
            for(let i = 0; i < objectList.length; i ++) {
               if (i < startIndex || i > endIndex){
                  objectList[i].style.display = 'none';
               } else {
                  objectList[i].style.display = '';
               }
            }
         },
         startKeyUp: function (startIndex) {
            for(let i = 0; i< objectList.length; i++) {
               if (objectList[i].children[0].children[1].innerHTML.indexOf(startIndex)) {
                  objectList[i].style.display = 'none';
               }
               else {
                  objectList[i].style.display = '';
               }
            }
         }      
      };

   if (startIndex === 0 ||  !isNaN(startIndex)) {
      functionObject.startPagination(startIndex);
   } 
   if (isNaN(startIndex)) {
      functionObject.startKeyUp(startIndex);
   }
}


appendPageLinks = () => {
   showPage(0);
   let pageNum = Math.ceil(objectList.length / 10);
   for (let i = 0; i < pageNum; i++){
      createLinks(i);
   }
   allLinks[0].className = 'active';
   searchBar();
}

searchBar = () => {
   const searchBarDiv = htmlObject.createAndAppend('form', headerDiv, 'type', 'submit')
      searchBarDiv.className = 'student-search';
      htmlObject.createAndAppend('input', searchBarDiv, 'placeholder', 'Enter Student Name...').type = 'text';
      htmlObject.createAndAppend('button', searchBarDiv, 'textContent', 'Search');
}

createLinks = (i) => {  
   const li = htmlObject.createAndAppend('li', paginationDiv);
     htmlObject.createAndAppend('a', li , 'href', '#').textContent = i+1;
}

mainDiv.addEventListener('click', (e) => {
   const link = e.target;
   let startIndex;
   for (let i = 0; i < allLinks.length; i++){
      allLinks[i].className = 'inactive';
   }
   if(link.tagName === 'A') {
      startIndex = (link.textContent * 10) - 10;
      showPage(startIndex);
      link.className = 'active';
   }      
});


mainDiv.appendChild(paginationDiv);
appendPageLinks();

const form = document.getElementsByTagName('form')[0];
const input = form.querySelector('input');
const studentDetails = document.getElementsByClassName('student-details');

form.addEventListener('keyup', (e) =>{
   let name = input.value.toLowerCase();
   showPage(name);
});


form.addEventListener('submit', (e) =>{
   e.preventDefault();
   const name = input.value;
   input.value = '';
   showPage(name);
});



// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/




/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/




/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
