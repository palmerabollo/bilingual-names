(function ($) {
  'use strict';

  $(function () {
    // Custom Selects
    if ($('[data-toggle="select"]').length) {
      $('[data-toggle="select"]').select2();
    }

    $(".language-selector").change(function () {
      $("#results").empty();

      var lang1 = $("#first-language").val();
      var lang2 = $("#second-language").val();

      if (lang1 && lang2) {
        if (lang1 === lang2) {
          $("#results").html("No results found. Please, select two different languages.");
        } else {
          var items1 = names[lang1];
          var items2 = names[lang2];

          var results = _.intersectionBy(items1, items2, 'name');

          if (results.length === 0) {
            $("#results").html("No results found :(");
          } else {
            results = _.sortBy(results, 'name');
            for (var i = 0; i < results.length; i++) {
              $("#results").append('<span><a href="http://www.bounty.com/pregnancy-and-birth/baby-names/baby-name-search/' + results[i].name[0] + '/' + results[i].name + '">' + results[i].name + '</a></span> · ');
            }
          }
        }
      }
    })
  });
}(jQuery));

