
var config = {
    apiKey: "AIzaSyBIVJ3TJ3lxnhAMFAuEMNAEs0w7n5i8nb8",
    authDomain: "train-cd5a1.firebaseapp.com",
    databaseURL: "https://train-cd5a1.firebaseio.com",
    projectId: "train-cd5a1",
    storageBucket: "",
    messagingSenderId: "480040656209"
  };

  firebase.initializeApp(config);

var database = firebase.database();
var currentTime = moment();

var trainName = "";
var destination = "";
var startTime = "";
var frequency = 10;


  $("#add-train").on("click", function(event) {
      event.preventDefault();
      
     var trainName = $("#train-input").val().trim();
     var destination = $("#destination-input").val().trim();
     var startTime = $("#time-input").val().trim();
     var frequency = $("#frequency").val().trim();

          database.ref().push({
          trainName: trainName,
          destination: destination,
          startTime: startTime,
          frequency: frequency,   
      });
    });    

    
    database.ref().on("child_added", function(childSnapshot) {
        var newName = childSnapshot.val().trainName;
        var newDestination = childSnapshot.val().destination;
        var newStartTime = childSnapshot.val().startTime;
        var newFreq = childSnapshot.val().frequency;

        var newStartTime = "3:00"

        var startTimeConverted = moment(newStartTime, "HH:mm").subtract(1, "years");
        console.log(startTimeConverted);
        
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % frequency
        console.log(tRemainder);
        
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        

        var newTrain = moment().add(tMinutesTillTrain, "minutes"); 
        var newTrainConverted = moment(newTrain).format("HH:mm A");
        console.log("ARRIVAL TIME: " + moment(newTrain).format("HH:mm A"));
        

        $("#all-display").append(
            "<tr><td>" + newName + "</td>" +
            "<td>" + newDestination + "</td>" +
            "<td>" + newFreq + "</td>" +
            "<td>" + newTrainConverted + "</td>" +
            "<td>" + tMinutesTillTrain + "</td></tr>");
    });
  

    
    
    
    
    

    

