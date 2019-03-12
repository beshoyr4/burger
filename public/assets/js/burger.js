// Make sure we wait to attach our handlers until the DOM is fully loaded
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      
      // Change from not devoured (0) to devoured (1), taking the command from the index
      var newDevouredState = {
        devoured: 1
      };
  
      // Send the PUT request to burger.js model
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function() {
          console.log("changed devoured to", newDevouredState);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event
      event.preventDefault();
  
      // Add a new veggie burger, taking new addition from the index
      var newBurger = {
        burger_name: $("#burger").val().trim(),
      };
      console.log(newBurger);
      // Send the POST request to burger.js model
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request to burger.js model
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });