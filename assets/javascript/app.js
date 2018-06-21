// Giphy API JavaScript

$(document).ready(function() {

    var topics = [
      "Jon Stewart", 
      "Stephen Colbert",
      "Trevor Noah",
      "Samantha Bee",
      "Ed Helms",
      "John Oliver",
      "Steve Carell"
    ];

    function displayGifs(){

      // clear out any prior gifs
      $("#gifs-appear-here").empty();

      // Grabbing and storing the data-topic property value from the button
      var topic = $(this).attr("data-topic");

      // Constructing a queryURL using the topic name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=551g6ZwVU4aDXlkzLo7L5ks7Fn1meegP&limit=10";

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var topicDiv = $("<div class='topic'>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var topicGif = $("<img>");

          // Setting the src attribute of the image to a property pulled off the result item
          topicGif.attr("src", results[i].images.fixed_height_still.url);

          // set other attributes to allow playing and pausing of the gif
          topicGif.attr("data-still", results[i].images.fixed_height_still.url);
          topicGif.attr("data-animate", results[i].images.fixed_height.url);
          topicGif.attr("data-state", "still");
          topicGif.addClass("gif");

          // Appending the paragraph and image tag to the topicDiv
          topicDiv.append(topicGif);
          topicDiv.append(p);

          // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(topicDiv);
        }

      }); //end of ajax call

    } //end of displayGifs function

    // Function for displaying the topic buttons
    function renderButtons() {

      // Deleting the topic buttons prior to adding new buttons
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();

      // Looping through the array of topics
      for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each topic in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. 
        var a = $("<button>");
        // Adding a class of topic-btn to our button
        a.addClass("topic-btn btn btn-dark");
        // Adding a data-attribute
        a.attr("data-topic", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }

    // This function handles events where a topic button is clicked
    $("#add-topic").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var topic = $("#topic-input").val().trim();
      console.log(topic);

      // Adding topic from the textbox to our array
      topics.push(topic);
      console.log(topics);

      // Calling renderButtons which handles the processing of our people array
      renderButtons();
    });

    // Adding a click event listener to all elements with a class of "topic-btn"
    $(document).on("click", ".topic-btn", displayGifs);

    $("body").on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


    // Calling the renderButtons function to display the intial buttons
    renderButtons();


});