$(function() {
  function updateRowColors() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function() {
      var timeBlock = $(this);
      var hour = parseInt(timeBlock.attr("id").split("-")[1]);

      timeBlock.removeClass("past present future");

      if (hour < currentHour) {
        timeBlock.addClass("past");
      } else if (hour === currentHour) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
    });
  }

  $(".saveBtn").on("click", function() {
    var timeBlock = $(this).closest(".time-block");
    var key = timeBlock.attr("id");
    var userInput = timeBlock.find(".description").val();
    localStorage.setItem(key, userInput);

    var messageElement = $(".save-message");
    messageElement.text("Input saved!");

    setTimeout(function() {
      messageElement.text("");
    }, 3000);
  });

  function retrieveUserInput() {
    $(".time-block").each(function() {
      var key = $(this).attr("id");
      var userInput = localStorage.getItem(key);

      if (userInput !== null) {
        $(this).find(".description").val(userInput);
      }
    });
  }

  function displayCurrentDate() {
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    $("#currentDay").text(currentDate);
  }

  updateRowColors();

  retrieveUserInput();
  displayCurrentDate();
});
