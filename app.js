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

$("#currentTime").html("The Current Time is: " + moment(currentTime).format("HH:mm"));
console.log("The Current Time is: " + moment(currentTime).format("HH:mm"));

$("#add-train-button").on("click", function(event){
	event.preventDefault();
	var trainName = $("#train-name-input").val().trim();
	var trainDestination = $("#destination-input").val().trim();
	var trainFirstTime = moment($("#first-time-input").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#frequency-input").val().trim();

	var newTrain = {
		train: trainName,
		destination: trainDestination,
		firstTime: trainFirstTime,
		frequency: trainFrequency
	};
	database.ref().push(newTrain);
	console.log(newTrain.trainName);
	console.log(newTrain.trainDestination);
	console.log(newTrain.trainFirstTime);
	console.log(newTrain.trainFrequency);

//	alert("Train successfully added!")
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
	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFirstTime);
	console.log(trainFrequency);

	var trainStartTime = moment(trainFirstTime, "HH:mm").subtract(1, "years");
	var diffTime = moment().diff(moment(trainStartTime), "minutes");
	var timeRemaining = diffTime % trainFrequency;
	var minutesAway = trainFrequency - timeRemaining;
	var nextTrainTime = moment().add(minutesAway, "minutes");
	console.log(trainStartTime);
	console.log(diffTime);
	console.log(timeRemaining);
	console.log(minutesAway);
	console.log(nextTrainTime);

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	trainFrequency + "</td><td>" + nextTrainTime + "</td><td>" + minutesAway + "</td></tr>");
});

//update times of pre-listed trains
//create functionality for 
//check new york times file and time sheet logic file as a reference 
//add train sound when add train button is clicked 