var questions = [];
var outresult = [];
var position = 0,
  correct = 0,
  asked = 0;
var trivial, correctanswer, question, anwer, category;
var number = 0;
var cat = 9;
var trivia =
  "https://opentdb.com/api.php?amount=" + number + "&category=" + cat;

$(document).ready(function() {
  //when the dom loads get the categories and generate the html
    var arr = [];
    $("#categories").html("<select id='cats'>");
    for (var i = 0; i < Object.keys(cats.test_categories).length; i++) {
      arr[i] = [];
      arr[i][0] = cats.test_categories[i].id;
      arr[i][1] = cats.test_categories[i].name;
      $("#cats").append(
        "<option value='" + arr[i][0] + "'>" + arr[i][1] + "</option>"
      );
    }
    $("#categories").append("</select>");
 
});

//when user submits an answer
$(".ans").click(function() {
  var you = "Sorry, Wrong Answer!";
  var check = $(this).html();
  questions[position][5] = $(this).attr("id");
  var correctness = "incorrect";

  if (check === correctanswer) {
    you = "Great, You got it right!";
    correctness = "correct";
    correct++;
  }
  outresult[position][1] = check;
  outresult[position][2] = correctness;

  $("#board").css("display", "none");
  $("#lastboard").css("display" , "none");
  $("#asked").html("Question: <em>" + question + "<em>");
  $("#correct").html("Correct: <em>" + answer + "</em>");
  $("#chosen").html("Your Choice: <em>" + check + "</em>");
  $("#message").html("<br>" + you);
  $("#points").html("Score: <em>" + correct + "/" + (asked + 1) + "<em>");
  $("#result").css("display", "block");
}); //end of choice

$("#next").click(function() {
  //any question
  if (position < number - 2) {
    asked++;
    position++;
    display(position);
    //the last question
  } else if(position === number - 2) {
    asked++;
    position++;
    displaylast(position);
    //after all questions have been asked
  } else if (position === number - 1) {
    position++;
    //message to output the results of the quiz
    var finaloutmess =
      "Thank you for playing.<br><br>Category: <em>" +
      category +
      "</em><br><br>Your final score:     <em>" +
      correct +
      "/" +
      (asked + 1) +
      "<em><br>";
    //message to be sent via e-mail
    var messaging ="";
    for (var i = 0; i < outresult.length; i++) {
      messaging +=
        "Question " + 
        (i + 1) + ": \n" +
        outresult[i][0] +
        "\nYour Answer: " +
        outresult[i][1] +
        "\nCorrect Answer: " +
        outresult[i][3] +
        "\nResult: " +
        outresult[i][2] +
        "\n\n\n";
    }

    $("#finalmessage").html(finaloutmess);
    $("#resultmessage").html(messaging);
    $("#result").css("display", "none");
    $("#final").css("display", "block");
    $('#resultmessage').attr('readonly','readonly');
  }
}); //end of next

$("#exit").click(function() {
  window.location.reload();
});

$("#last").click(function() {
  $("#final").css("display", "none");
  $("#welcome").css("display", "block");
}); //end of last

$("#start").click(function() {
  number = $("#amount").val();
  cat = $("#cats").val();
  category = $("#cats option:selected").text();
  correct = 0;
  asked = 0;
  position = 0;
  load();
}); ////end of start//


function load() {
    //gettng the external JSON object with questions and answers
    trivial = jsonobject;
    for (var i = 0; i < number; i++) {
      //temp array to hold all the questions and answers
      questions[i] = [];
      questions[i][0] = trivial.results[i].question;
      questions[i][1] = trivial.results[i].correct_answer;
      questions[i][2] = trivial.results[i].incorrect_answers[0];
      questions[i][3] = trivial.results[i].incorrect_answers[1];
      questions[i][4] = trivial.results[i].incorrect_answers[2];
      questions[i][5] = "9";
      //temp array to hold user selected answers
      outresult[i] = [];
      outresult[i][0] = trivial.results[i].question;
      outresult[i][3] = trivial.results[i].correct_answer;
    }

  var time = setTimeout(function() {
    display(position);
  }, 1000);
}
//////
function display(n) {
  $("#welcome").css("display", "none");
  $("#result").css("display", "none");
  $("#lastboard").css("display" , "none");
  $("#board").css("display", "block");
  $("#ans1").html("------");
  $("#ans2").html("------");
  $("#ans3").html("------");
  $("#ans4").html("------");

  question = questions[n][0];
  answer = questions[n][1];
  var incorrect1 = questions[n][2];
  var incorrect2 = questions[n][3];
  var incorrect3 = questions[n][4];
  correctanswer = answer;
  var array = [answer, incorrect1, incorrect2, incorrect3];
  array = array.sort();

  $("#question").html(question);
  $("#ans1").html(array[0]);
  $("#ans2").html(array[1]);
  $("#ans3").html(array[2]);
  $("#ans4").html(array[3]);
  $("#marker").html("Question: " + (n + 1));
}

function displaylast(n) {
  $("#welcome").css("display", "none");
  $("#result").css("display", "none");
  $("#board").css("display", "none");
  $("#lastboard").css("display" , "block");
  $("#ans1").html("------");
  $("#ans2").html("------");
  $("#ans3").html("------");
  $("#ans4").html("------");

  question = questions[n][0];
  answer = questions[n][1];
  var incorrect1 = questions[n][2];
  var incorrect2 = questions[n][3];
  var incorrect3 = questions[n][4];
  correctanswer = answer;
  var array = [answer, incorrect1, incorrect2, incorrect3];
  array = array.sort();

  $("#questionl").html(question);
  $("#ans1l").html(array[0]);
  $("#ans2l").html(array[1]);
  $("#ans3l").html(array[2]);
  $("#ans4l").html(array[3]);
  $("#lmarker").html("Question: " + (n + 1));
}