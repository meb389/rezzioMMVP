$('.ui.dropdown')
  .dropdown()
;

$("#hideSelectorYes").on("click", function(){
  $("#introQuestion").css("display", "none");
  $("#mainQuestions").css("display", "block");
});

$("#hideSelectorNo").on("click", function(){
  $("#introQuestion").css("display", "none");
  $("#mainQuestions").css("display", "block");
});
