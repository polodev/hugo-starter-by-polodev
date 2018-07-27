var lunr = require('lunr');

// async function fetchAsync () {
//   const responseLunr = await fetch('/learning/js/lunr-index.json', {
//       method: 'GET',
//       headers: {
//           'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//           'Content-Type': 'application/json'
//       },
//       mode: 'cors'
//   });

//   // await response of fetch call
//   let response = await responseLunr.json();
//   // only proceed once promise is resolved
//   let data = await response.json();
//   // only proceed once second promise is resolved
//   return data;
// }
// let lunrIndex = [];
// fetchAsync()
//     .then(data => {
//       console.log('data', data);
//       lunrIndex= lunr.Index.load(data)
//     } )
//     .catch(reason => console.log(reason.message))


// console.log(lunrIndex);
// setTimeout(() => console.log(lunrIndex), 3000);


let lunrIndex = [];
fetch('/learning/js/lunr-index.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/json'
    },
    mode: 'cors'
}).then( data => data.json()).then( data => {
 lunrIndex= lunr.Index.load(data)
}).catch(reason => console.log('reason.message'));




