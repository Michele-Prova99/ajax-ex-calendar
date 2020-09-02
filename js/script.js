$(document).ready(function(){

  var dataCorrente = moment("2018-01-01");

  insertDays(dataCorrente);

  insertHolidays(dataCorrente);

});


function insertHolidays(data) {

  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays",
      method: "GET",
      data: {
        year: data.year(),
        month: data.month()
      },
      success: function(risposta) {
        console.log(risposta.response);
        for (var i = 0; i < risposta.response.length; i++) {
          var listItem = $('li[data-complete-date="'+ risposta.response[i].date + '"]');
          console.log(listItem);
          listItem.append(" - " + risposta.response[i].name);
          listItem.addClass("holiday");
        }
      },
      error: function () {
        alert("errore")
      }
    }
  );

}


function insertDays(data) {

  var month = data.format("MMMM");

  var year = data.format("YYYY");

  $("h1.month").html(month + " " + year);

  var daysMonth = data.daysInMonth();

  for (var i = 1; i <= daysMonth; i++) {

    var source = $("#day-template").html();
    var template = Handlebars.compile(source);

    var context = {
      day: addZero(i),
      month: month,
      completeDate: year + "-" + data.format("MM") + "-" + addZero(i)
    };

    var html = template(context);

    $(".month-list").append(html);

  }

}

function addZero(n) {

  if (n < 10) {
    return "0" + n;
  }

  return n;

}
