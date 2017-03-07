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
	var trainName = $("#train-name-input").val().trin();
	var trainDestination = $("#destination-input").val().trin();
	var trainFirstTime = moment($("#first-time-input").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#frequency-input").val().trin();

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

	var trainStartTime = moment.unix(trainFirstTime).format("HH:mm");
// Calculate the months worked using hardcore math
// To calculate the months worked
	var nextTrainTime = moment().diff(moment.unix(trainFirstTime, "X"), "months");
	console.log(nextTrainTime);
// Calculate the total billed rate
	var minutesAway = empMonths * empRate;
	console.log(minutesAway);
// Add each train's data into the table
	$("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
	trainFrequency + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});

//list current time
//update times of pre-listed trains
//create functionality for 
//check new york times file and time sheet logic file as a reference 
//add train sound when add train button is clicked 