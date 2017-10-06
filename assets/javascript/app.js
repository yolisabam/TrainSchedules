// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAIGtYVsHLmZ-VMWR9TAJiO5HDi_mUaxkk",
    authDomain: "train-schedules-b8a73.firebaseapp.com",
    databaseURL: "https://train-schedules-b8a73.firebaseio.com",
    projectId: "train-schedules-b8a73",
    storageBucket: "train-schedules-b8a73.appspot.com",
    messagingSenderId: "1055628509997"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var trainDestination = "";
var firstTrainInput = "";
// var firstTrain = "";
// var trainFrequencyInput = "";
// var trainFrequency = moment(trainFrequencyInput).format("mm")
var currentTime = moment().format("HH:mm");




$(document).on("click", "#submit", function() {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    trainDestination = $("#train-destination").val().trim();
    firstTrainInput = $("#first-train").val().trim(); 
    trainFrequencyInput = $("#train-frequency").val().trim();
    
    // trainFrequency = moment(trainFrequencyInput).format("mm")

    // take input of user and split into an array 
  
    //Convert array back to current time
    // firstTrain = moment().hours(tempTime[0]).minutes(tempTime[1]).format("HH:mm");

   
    console.log(trainName)
    console.log(trainDestination)
    console.log(firstTrainInput)
      
  
    database.ref().push({
      train: trainName,
      destination: trainDestination,
      startTime: firstTrainInput,
      frequency: trainFrequencyInput 
    });
    
});

database.ref().on("child_added", function(response) {
  // console.log(response.val());

  var displayTrain = response.val().train;
  var displayDestination = response.val().destination;
  var displayFrequency = moment(response.val().frequency).format("hh:mm");
  var start = response.val().startTime;
  var startArray = firstTrainInput.split(":");

  var firstTrain = moment().hours(startArray[0]).minutes(startArray[1]);
  console.log(firstTrain)
  var minutesAway = moment().diff(moment(firstTrain), "minutes");
  console.log(minutesAway)
  

  if (minutesAway >= 0) {
    firstTrain = moment(firstTrain).add(displayFrequency, "minutes");
      // console.log(firstTrain);
    minutesAway = moment().diff(moment(firstTrain), "minutes");
    // console.log(minutesAway)
  } 

  var nextArrival = moment(firstTrain).format("hh:mm");
  console.log(nextArrival);


  // var nextArrival = moment(currentTime).add(displayFrequency);
  // console.log(moment(currentTime));

  // console.log(displayTrain);
  // console.log(displayDestination);
  // console.log(displayFrequency);
  // console.log(nextArrival);
  // console.log(minutesAway);  

  // Convert frequency string to minutes and  display frequency in minutes on page
  // Use frequency to determine next arrival by adding it to current times
  // Display current time on page
  // Calculate minutes left between current time and arrival time and display to page

  var row = "<tr><td>" + displayTrain + '</td><td>' + displayDestination + '</td><td>' + displayFrequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway +'</td></tr>';
  console.log(row)
  $('#trainInfo').append(row);

})



