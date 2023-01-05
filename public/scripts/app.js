// Client facing scripts here


//call jquery and give it a reference of all the collection of heart element
// $(".card-like-icon").click(function(event){
//   event.preventDefault();
//   console.log("===",event.target.id)
//   const $icon = $(this)
//   const dataId = $(this).attr("data-id")
//   $.ajax({
//     url: "/liked",
//     method: "POST",
//     data: {
//       card_id: dataId // access to card ID
//     }
//   }).then(function(response){
// console.log(response)
// $icon.css("color", "red")
//   })
// });


$("#cards-container").click(".card-like-icon",function (event) {
  event.preventDefault();
  const dataId = $(event.target).attr("data-id");
  if ($(event.target).css("color") !== "rgb(255, 0, 0)"){
    console.log($(event.target).css("color"))
  $.ajax({
    url: "/liked",
    method: "POST",
    data: {
      card_id: dataId, // access to card ID
    },
  }).then(function (response) {
    console.log(response);
    $(event.target).css("color", "red");
  });
}
});




