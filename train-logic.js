
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
var firstTrainTime = "";
var frequency = 0;


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
    console.log("Working" );
    

    
    database.ref().on("child_added", function(childSnapshot) {
        var newTrain = childSnapshot.val().trainName;
        var newDestination = childSnapshot.val().destination;
        var newStartTime = childSnapshot.val().startTime;
        var newFreq = childSnapshot.val().frequency;

        var startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");
        var tReainder = diffTime % Frequency
        var tMinutesTillTrain = Frequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes"); 

        $("#all-display").append(
            "<tr><td>" + newTrain +
            "<tr><td>" + newLocation +
            "<tr><td>" + newFreq +
            "<tr><td>" + catchTrain +
            "<tr><td>" + tMinutesTillTrain + "<tr><td>");
    });

    // function(errorObject) {
    //     console.log("Error reading failed " + errorObject.code);
    // }
  

    
    
    
    
    

    

