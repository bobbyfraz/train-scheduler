//Initialize Firebase

var config = {
  apiKey: "AIzaSyAEkK3tm-ahLHhdMSiXRPy3aRR1V0p7qwE",
  authDomain: "train-scheduler-2fa26.firebaseapp.com",
  databaseURL: "https://train-scheduler-2fa26.firebaseio.com",
  storageBucket: "train-scheduler-2fa26.appspot.com",
  messagingSenderId: "1092761737972"
};
firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

$("#currentTime").html("The Current Time is: " + moment(currentTime).format("hh:mm A"));
console.log("The Current Time is: " + moment(currentTime).format("hh:mm A"));

var audio = new Audio(href="train-sound.mp3");

$("#add-train-button").on("click", function(event){
	event.preventDefault();
	audio.play();
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainFirstTime = moment($("#first-time-input").val().trim(), "hh:mm A").format("X");
	var trainFrequency = $("#frequency-input").val().trim();

	var newTrain = {
		train: trainName,
		destination: trainDestination,
		firstTime: trainFirstTime,
		frequency: trainFrequency
	};
	database.ref().push(newTrain);

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-time-input").val("");
	$("#frequency-input").val("");

	return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().train;
	var trainDestination = childSnapshot.val().destination;
	var trainFirstTime = childSnapshot.val().firstTime;
	var trainFrequency = childSnapshot.val().frequency;

	var trainStartTime = moment(trainFirstTime, "X").subtract(1, "years");
	var diffTime = moment().diff(moment(trainStartTime), "minutes");
	var timeRemaining = diffTime % trainFrequency;
	var minutesAway = trainFrequency - timeRemaining;
	var nextTrainTime = moment().add(minutesAway, "minutes").format("hh:mm A");
	console.log("trainStartTime: " + trainStartTime);
	console.log("diffTime: " + diffTime);
	console.log("timeRemaining: " + timeRemaining);
	console.log("minutesAway: " + minutesAway);
	console.log("nextTrainTime: " + nextTrainTime);

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	trainFrequency + " (min)" + "</td><td>" + nextTrainTime + "</td><td>" + minutesAway + " (min)" +
	 "</td><td type='button' id='remove' class='btn btn-warning'><span class='glyphicon glyphicon-remove' aria-hidden='true'></td></tr>");
});

$("body").on("click", ".remove", function() {
    remove(); 
});
