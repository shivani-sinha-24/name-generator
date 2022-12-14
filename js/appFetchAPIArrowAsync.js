document.querySelector('#generate-names').addEventListener('submit', loadNames);



// Execute the function to query the API
function loadNames(e) {
     e.preventDefault();


     // Read the values from the form and create the variables
     const origin = document.getElementById('country').value;
     const genre = document.getElementById('genre').value;
     const amount = document.getElementById('quantity').value;

     // Build the URL
     let url = 'https://randomuser.me/api/?';
     // Read the origin and append to the url
     if(origin !== ''){
          url += `nat=${origin}&`;
     }
     // Read the genre and append to the url
     if(genre !== ''){
          url += `gender=${genre}&`;
     }    
      // Read the amount and append to the url
     if(amount !== ''){
          url += `results=${amount}&inc=name`;
     }
     console.log(url);
     
    
     // Fetch API

     getNames(url) 
          .then(names => {
               let namesResponse = names.names.results;
               console.log(namesResponse);

               let html = '<h2>Generated Names</h2>';
               html += '<ul class="list">';
               namesResponse.forEach(name =>  {
                    html += `
                         <li>${name.name.first}</li>
                    `;
               });
               html += '</ul>';

               document.querySelector('#result').innerHTML = html;
          })
          .catch(error =>  console.log(error) )
}


async function getNames(url) {
     const response = await fetch(url);
     const names = await response.json();

     return {
          names
     }
}