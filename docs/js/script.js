/**
 * search results
 */

$(document).ready(function () {
  'use strict';
  // Set up search
  $.getJSON('/learning/js/lunr-index.json', function (response) {
    // Create index
    var index, store;
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

/**
 * clipboard
 */

$(document).ready(function () {

var tables = document.querySelectorAll('table.lntable');
tables.forEach(function (table) {
  var tds = table.querySelectorAll('td');
  if (tds.length > 1) {
    var codeTd = tds[1];
    var pre = codeTd.querySelector('pre');
    var button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    pre.appendChild(button);
  }
})

// setting up target for copy
var copyCode = new ClipboardJS('.copy-button', {
    target: function(trigger) {
        return trigger.previousElementSibling;
    }
});

// success message
copyCode.on('success', function(event) {
    event.clearSelection();
    event.trigger.textContent = 'Copied';
    window.setTimeout(function() {
        event.trigger.textContent = 'Copy';
    }, 2000);
});
// error message
copyCode.on('error', function(event) {
    event.trigger.textContent = 'Press "Ctrl + C" to copy';
    window.setTimeout(function() {
        event.trigger.textContent = 'Copy';
    }, 2000);
});

})

/**
 * toggle toc
 */
$(function () {
  let toc_toggle_span = $("#toc_toggle_span")
  let toc_content = $('#toc_content')
  toc_toggle_span.on('click', function () {
    if (toc_content.hasClass('d-none')) {
      toc_content.removeClass('d-none')
      toc_toggle_span.text('[hide]')
    }else {
      toc_content.addClass('d-none')
      toc_toggle_span.text('[show]')
    }
  })
})



