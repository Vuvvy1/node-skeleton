// Client facing scripts here


//call jquery and give it a reference of all the collection of heart element
$(".card-like-icon").click(function(event){
  event.preventDefault();
  console.log("===",event.target.id)
  const $icon = $(this)
  const dataId = $(this).attr("data-id")
  $.ajax({
    url: "/liked",
    method: "POST",
    data: {
      card_id: dataId // access to card ID
    }
  }).then(function(response){
console.log(response)
$icon.css("color", "red")
  })
});



