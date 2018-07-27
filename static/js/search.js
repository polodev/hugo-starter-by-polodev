// code moved to script.js file 
var index, store;
$(document).ready(function () {
    'use strict';
    // Set up search
    $.getJSON('/learning/js/lunr-index.json', function (response) {
        // Create index
        index = lunr.Index.load(response.index);
        // Create store
        store = response.store;
        // Handle search
        $('input#search').on('keyup', function () {
            // Get query
            var query = $(this).val();
            // Search for it
            var result = index.search(`${query}*`);
            console.log('result', result);
            // Output it
            var resultdiv = $('#search_result');
            if (result.length === 0 || query == '' ) {
                // Hide results
                resultdiv.hide();
            } else {
                // Show results
                resultdiv.empty();
                for (var item in result) {
                    var ref = result[item].ref;
                    var searchitem = '<li><a href="' + ref + '">' + store[ref].title + '</a></li>';
                    resultdiv.append(searchitem);
                }
                resultdiv.show();
            }
        });
    });
}); 


// $('#search_input').on('keyup', function (e) {
// 	var results = lunrIndex.search(`${e.target.value}*`);
// 	results.forEach(result => {

// 	})
// 	console.log(results);
// })