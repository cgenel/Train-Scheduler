// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDzcpwqHw3hvDKV6-gls22x8oEhlrx_NAY",
  authDomain: "train-schedule-4641c.firebaseapp.com",
  databaseURL: "https://train-schedule-4641c.firebaseio.com",
  projectId: "train-schedule-4641c",
  storageBucket: "train-schedule-4641c.appspot.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// reference to firebase database
var trainData = firebase.database();

// send data to the database
// when clicking submit button collect and store inputs
$("#submitBtn").on("click", function (event) {
  // Prevent the default form submit behavior
  event.preventDefault();

  // grab user inputs
  var trainName = $("#trainName").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrain = $("#firstTrainTime").val().trim();
  var frequency = $("#frequency").val().trim();

  // local object for holding train data temporarily
  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  };

  // upload the data to the database
  trainData.ref().push(newTrain);
  console.log(newTrain.name);

  alert("New Train Added!");

  // clear the input-text-boxes after the user submits a new train
  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
});

// collect and store the data from firebase
trainData.ref().on("child_added", function(snapshot) {

 // Store everything into a variable.
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency= snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;
});
