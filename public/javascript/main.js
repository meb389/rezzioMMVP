let yesNo = "Yes";

$('.ui.dropdown')
  .dropdown()
;

$("#hideSelectorYes").on("click", function(){
  $("#introQuestion").css("display", "none");
  $("#mainQuestions").css("display", "block");
  $("#yesNoStorage").text(yesNo);
});

$("#hideSelectorNo").on("click", function(){
  yesNo = "No";
  $("#introQuestion").css("display", "none");
  $("#mainQuestions").css("display", "block");
  $("#yesNoStorage").text(yesNo);
});
