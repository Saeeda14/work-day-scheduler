// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.



var timeDisplayEl = $('#currentDay');
var timeblockEl = $('#time-blockl');
var saveBtns = $('-saveBtn');

$(function() {

function displayTime() {
  let hour = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a');
  timeDisplayEl.text(hour);
}
  setInterval (displayTime, 1000);
  displayTime();

  $(".time-block").each(function(){
    var id = $(this).attr("id");
    var event = localStorage.getItem(id);

    if (event !== null) {
      $(this).children(".description").val(event);
    }
  });

  $(".saveBtn").on("click", function() {
    var eventId = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();

    localStorage.setItem(eventId, eventText);
  });

  function updateTimeBlocks() {
    var currentTime = dayjs().hour();

    $(".time-block").each(function(){
      var blockTime = parseInt($(this).attr("id"));

      if (blockTime < currentTime) {
      $(this).children(".description") .addClass ("past");
      }

      else if (blockTime === currentTime) {
        $(this).children(".descriotion").removeClass("past");
        $(this).children(".description").addClass("present");
      }

      else {
        $(this).children(".description").removeClass("past");
        $(this).children(".descriotion").removeClass("present");
        $(this).children(".description").addClass("future");
      }
    });
  }

    setInterval(updateTimeBlocks, 1000);

});

$("#clear-btn").on("click", function () { 
  $(".time-block").each(function () { 
  $(this).children(".description").val("");
  });
});









