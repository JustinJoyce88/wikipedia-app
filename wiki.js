$(document).ready(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    var result = $(this).serialize();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&" + result;
    $('#mySearch').val('');
    $.getJSON({
      url: url,
      type: 'GET',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
    }).done(getData);
    
  });

  function getData(data) {
    var html = '';
    var desc = data[2].map(function (val) {
      console.log(val);
      return val.substr(0, 200) + "...";
    });
    var url = data[3].map(function (val) {
      console.log(val);
      return val;
    });

    $.each(data[1], function (key, val) {
      html += '<div class="container container-fluid results">';
      html += '<div class="row">';
      html += '<h4 class="result-title">' + val + '</h4></div>';
      html += '<div class="row">';
      html += '<p>' + desc[key] + '</p></div>';
      html += '<div class="row">';
      html += '<a class="btn btn-primary result-btn" href="' + url[key] + '" target="_blank">Read More</a></div>';
      html += '</div></div>';
    });

    $('.result-container').html(html);
  }
});