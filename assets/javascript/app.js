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
  var frequency = $("#frequency").val().trim();
  // turn this input into a time-variable with moment.js
  var firstTrain = moment($("#firstTrainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");

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

  return false;
});

// collect and store the data from firebase
trainData.ref().on("child_added", function (snapshot) {

  // Store everything into a variable.
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  // calculate when the next train will be and how many minutes until the train arrives
  var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

  // display the data from the database into the add-train table on the html
  // reference the table body append the data to each column
  $("#train-table > tBody").append("<tr><td>" + name + "</td> <td>" + destination + 
    "</td> <td>" + frequency + "</td> <td>" + arrival + "</td> <td>" + minutes + "</td> </tr>");
});
