// Client facing scripts here

// alert("monkeyfuzz");

//call jquery and give it a reference of all the collection of heart element
$(".card-like-icon").click(function(event){
  //alert("monkeyfuzz");
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


// pass on id of pokemon
// just before ajax call: need to figure out which
// pokemon ccard was clicked -> you can fifure out info about the dom element by using a call to $(this): how to collect the id attributes value from $(this)

// wil give you reference to the particular item was clicked

// I tag needs specific ID in order to be easily used in the ajax call that will add a row to the likes table

//id= "card1"
