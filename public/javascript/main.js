
$('.ui.dropdown')
  .dropdown()

$("#hideSelectorYes").on("click", function(){
  let yesNo = "Yes"
  $("#introQuestion").css("display", "none")
  $("#mainQuestions").css("display", "block")
  $("#yesNoStorage").val(yesNo)
})

$("#hideSelectorNo").on("click", function(){
  yesNo = "No";
  $("#introQuestion").css("display", "none")
  $("#mainQuestions").css("display", "block")
  $("#yesNoStorage").val(yesNo)
})
