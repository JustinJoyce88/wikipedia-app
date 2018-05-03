$(document).ready(() => {
  $("form").on("submit", function (e) {
    e.preventDefault();
    let result = $(this).serialize();
    let url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&" + result;
    $('#mySearch').val('');
    $.getJSON({
      url: url,
      type: 'GET',
      headers: {
        'Api-User-Agent': 'Example/1.0'
      },
    }).done(getData);
    
  });

  let getData = (data) => {
    let html = '';
    let desc = data[2].map((val) => val.substr(0, 200) + "...");
    let url = data[3].map((val) => val);

    $.each(data[1], (key, val) => {
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
  };
});