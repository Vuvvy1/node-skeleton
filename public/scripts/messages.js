$("#cards-container").click(".chat-icon", function (event) {
  event.preventDefault();
  const dataId = $(event.target).attr("data-id");
  // if (!$(event.target).hasClass("liked")) {
    $.ajax({
      url: "/liked",
      method: "POST",
      data: {
        card_id: dataId, // access to card ID
      },
    }).then(function (response) {
      console.log(response);
      $(event.target).css("color", "red");
      $(event.target).addClass("liked");
    });
  // } else {
  //   $(event.target).removeClass("liked");
    // $(event.target).css("color", "purple");

});

class="fa-regular fa-comments"></i> </a>


//save message
//get message

// how will I set it to a specific card

