//Links the container where everything lives.
var contEl = $(".container");

//Array that contains times for loop and the 24hr format
var timeHr = [
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
];
var milTime = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

//Jumbotron Date displayed
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do YYYY"));

//Pull in the current hour in 24hr format
var curHour = today.format("H");
console.log(`The current 24-hour clock time is: ${curHour}`);

//Create elements for the time blocks
for (let i = 0; i < timeHr.length; i++) {
  var rowEl = $("<row>");
  var divEl = $("<div>");
  var taEl = $("<textarea>");
  var btnEl = $("<button>");

  rowEl.addClass("row time-block");
  divEl.addClass("col-12 col-md-2 col-xl-2 hour");
  taEl.addClass("col-12 col-md-8 col-xl-8 description");
  btnEl.addClass("col-12 col-md-2 col-xl-2 saveBtn");

  //Set a data attribute to a 24hr time frame
  taEl.data("milHour", milTime[i]);

  divEl.text(`${timeHr[i]}`);
  btnEl.text("💾");

  contEl.append(rowEl);
  rowEl.append(divEl);
  rowEl.append(taEl);
  rowEl.append(btnEl);
}

//Applies the correct CSS to the text area based on what time it is
function hourBackground() {
  $(".description").each(function () {
    var mHour = $(this).data("milHour");
    if (mHour < +curHour) {
      $(this).addClass("past");
    } else if (+mHour === +curHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

//Will save the textarea once the save button is clicked
$(".saveBtn").on("click", function () {
  var time = $(this).siblings(".description").data("milHour");
  var value = $(this).siblings(".description").val();
  localStorage.setItem(time, value);
  alert("~Memo Saved~");
});

//Once the DOM has loaded then pull the stored data and
function memoPuller() {
  $(".description").each(function () {
    var hourGrab = $(this).data("milHour");
    $(this).val(localStorage.getItem(hourGrab));
  });
}

//Lets the DOM load since we are dynamically creating the elements then lets the other functions fire
$(document).ready(function () {
  memoPuller();
  hourBackground();
});
