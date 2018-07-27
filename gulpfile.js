var gulp = require('gulp');
var fs  = require('fs');

var lunr = require('lunr');

gulp.task('lunr', () => {
  const documents = JSON.parse(fs.readFileSync('docs/index.json'));
  var store = {}
  documents.forEach(doc => {
    store[doc.uri] = {
        'title': doc.title
    };
  });
  console.log(store)

  let lunrIndex = lunr(function() {
        this.field("title", {
            boost: 10
        });
        this.field("tags", {
            boost: 3
        });
        this.field("content", {
          boost: 1
        });
        this.ref("uri");

        documents.forEach(function(doc) {
            this.add(doc);
        }, this);
    });
  var object = {
    store: store,
    index: lunrIndex
  }

  fs.writeFileSync('static/js/lunr-index.json', JSON.stringify(object));
});