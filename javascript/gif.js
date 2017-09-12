var artists = ["Sam Hunt", "Luke Bryan", "Florida Georgia Line", "Carrie Underwood"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayBandInfo() {

        var music = $(this).attr("data-music");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        music + "&api_key=dc6zaTOxFJmzC&limit=10";
                        


        // Creating an AJAX call for the specific gif button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          var results = response.data;

          for (var i=0; i < results.length; i++) {
          

          // Creating a div to hold the gif
          var giphyDiv = $("<div class='gifs'>");
          giphyDiv.attr( "data-state", "still"); 
          giphyDiv.attr( "data-animate", results[i].images.fixed_height.url); 
          giphyDiv.attr ("data-still", results[i].images.fixed_height_still.url);



          // Storing the rating data
          var ratings = results[i].rating;

          // Creating an element to have the rating displayed
          var p = $("<p>").text("Rating: " + ratings);

          // Displaying the rating
          giphyDiv.append(p);


          // Retrieving the URL for the image
          var imgURL = results[i].images.fixed_height_still.url;


          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
      

          // Appending the image
          giphyDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#giphy-view").prepend(giphyDiv);

        
          }

      });

          }

            $(document).on('click', '.gifs', function(){ 


            console.log("made it inside onclick")

                  
           var state =$(this).attr("data-state"); 
           console.log(this);

           var still = $(this).attr("data-still");

           var animate = $(this).attr("data-animate");
        
          
        // this will make my image stop and play

          if ( state === "still"){
          // $(this).attr("src", animate);
          $(this).children('img').attr('src', animate);


          $(this).attr("data-state","animate");
          console.log("this is animate url");
           console.log(animate);
        } 
        else{
          $(this).children('img').attr('src', still);

          $(this).attr("data-state","still");
           console.log("this is still url");
           console.log(still);
          }
});

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < artists.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("bands");
          // Adding a data-attribute
          a.attr("data-music", artists[i]);
          // Providing the initial button text
          a.text(artists[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-artist").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var music  = $("#music-input").val().trim();

        // Adding movie from the textbox to our array
        artists.push(music);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie" 

      

      /***********BEGIN - THIS IS FREAKIN* HUGE!******************/

      $(document).on("click", ".bands", displayBandInfo);

      /***********END - THIS IS FREAKIN HUGE!******************/
      
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

      $(".bands").click(displayBandInfo);

