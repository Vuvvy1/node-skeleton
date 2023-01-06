$("#cards-container").click(".chat-icon", function (event) {
  event.preventDefault();
  const dataId = $(event.target).attr("data-id");
  // if (!$(event.target).hasClass("liked")) {
    $.ajax({
      url: "/messages",
      method: "POST",
      data: {
        card_id: dataId, // access to card ID
      },
    }).then(function (response) {
      console.log(response);
      $(event.target).css("color", "red");
      $(event.target).addClass("liked");
    });

});

//test123

//save message
//get message

// how will I set it to a specific card

