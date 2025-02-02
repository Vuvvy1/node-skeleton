
let min_price = 0;
let max_price = 100;
const cardsPerRow = 5
const x = cardsPerRow


$(document).ready(function () {

  showAllItems(); //Display all items with no filter applied
  $(document).on('input', '#min-price', function() {
    min_price = parseInt($("#min-price").val());
    console.log(min_price)
    $('#min-price-txt').html( $(this).val() );
    $("#min-price-txt").text("$" + min_price);
  });
  $(document).on('input', '#max-price', function() {
    max_price = parseInt($("#max-price").val());
    console.log(max_price)
    // $('#min-price-txt').html( $(this).val() );
    $("#max-price-txt").text("$" + max_price);

  });
  $('.filter-button').click(function(event) {
    console.log(event)
    showAllFiltered()
  })

});

$("#add-card").click(function(){
  $.post("/api/cards/add",{"title": $('#title').val(),"thumbnail_photo_url": $('#thumbnail_photo_url').val(),"cost": $('#cost').val(),"active": $('#active').val()}, function(data, status){
    location.reload()
  });
});

$(document).on("click", ".delete-button", function (event) {
  deleteCards($(event.target).val())
  })

function deleteCards (id) {
  console.log('delete pls')
  $.ajax({
    url: `/api/cards/${id}`,
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
    }
});
}

$(document).on("click", ".mark-as-out-stock-button", function (event) {
  console.log('hello')
  editCards($(event.target).val())
  })

function editCards (id) {
  $.ajax({
    url: `/api/cards/${id}`,
    type: 'POST',
    success: function(result) {
        // Do something with the result
    }
});
}

function getCurrentUser() {
 return new Promise((resolve, reject) => {
  $.get('/users/currentUser')
 .then((data) => {
   console.log("user1 ➤", data);
    resolve(data)
 })
.catch((error) => {
  reject(error)

  })
})
};

function getCards() {
  return new Promise((resolve, reject) => {
   $.get('/api/cards')
  .then((data) => {
    console.log("user1 ➤", data);
     resolve(data)
  })
 .catch((error) => {
   reject(error)

   })
 })
 };

 function getFilteredCards() {
  return new Promise((resolve, reject) => {
    $.get(`/api/cards?min_price=${min_price}&max_price=${max_price}`)
    .then((data) => {
    console.log("user1 ➤", data);
     resolve(data)
  })
 .catch((error) => {
   reject(error)

   })
 })
 };





function showAllItems() {
  Promise.all([getCurrentUser(), getCards()])
  .then(data => {
    const cardsContainer = $("#cards-container")
    console.log("data ➤", data);
    // Bucketing cards into rows
    const cardRows = []
    console.log("data[0] ➤", data[0]);
    console.log("data[1] ➤", data[1]);
    for (let i = 0; i < data[1].cards.length; i++) { // i = 1
      cardRows[i] = data[1].cards.slice(i * x, i * x + x) // 5, 10
    }

    for (const cardRow of cardRows) {
      // Generate HTML for that row
      let rowHtml = `<div class="card-row">`

      for (const cardInRow of cardRow) {
        rowHtml += `
        <div class="card-body">
          <h2 class="card-title">${cardInRow.title}${cardInRow.active ? "": "<a style='color: red;'>    Sold Out</a>"}</h2>
          <img class="card-picture" "submit()" ${cardInRow.active ? "": "id='no-stock'"}src="${cardInRow.thumbnail_photo_url}" tabindex="0"/>
          <div >
          <div class=boxed>
          <a style='color: green;'> $${cardInRow.cost}.00 </a>
          <a  href="" > <i data-id = "${cardInRow.id}" class="fa-regular fa-heart card-like-icon"></i>
          </a>
          <a  href="/messages/${cardInRow.id}" > <i data-id = "${cardInRow.id}" class="fa-regular fa-comments chat-icon"></i> </a>
          ${ (data[0].role_id === 1) ? `${cardInRow.active ? '<button  class="buy-button">Add to cart</button>':
          '<box class="Sold-Out"style="color: red;">Sold Out</box>'}`:''}
            </div>
            <div class=boxed2>

            ${ (data[0].role_id === 2) ?
              `${cardInRow.active ?`<button value = ${cardInRow.id} class="mark-as-out-stock-button">Out of Stock</button>`:
               '<button  class="mark-as-in-stock-button" >New Batch</button>'}`:``}

            ${ (data[0].role_id === 2) ?`<button value = ${cardInRow.id} class="delete-button">Delete</button>`:''}
            </div>
          </div>
        </div>
        `
      }
        rowHtml += `</div>`

        // Append the row to the cardsContainer
        $(rowHtml).appendTo(cardsContainer)

      }
      addLikeEventListener()
    })
  }


  //   <div class="card-body">
  //   <h2 class="card-title"><%= cards[i].title %></h2>
  //   <img src="<%- cards[i].thumbnail_photo_url %>"/>
  //   <div ><%- cards[i].cost %>
  //     <% if (cards[i].active === false) { %>
  //       <a>Sold Out</a>
  //     <% } %>
  //     <a  href="" > <i data-id = "<%- cards[i].id %>" class="fa-regular fa-heart card-like-icon"></i>

  //     </a>
  //     <button type="submit" class="login-button">Add to cart</button>
  // </div>

function showAllFiltered() {
  const cardsContainer = $("#cards-container")
  cardsContainer.empty()
  $.get(`/api/cards?min_price=${min_price}&max_price=${max_price}`,
  (data) => {

    // Bucketing cards into rows
    const cardRows = []
    for (let i = 0; i < data.cards.length; i++) { // i = 1
      cardRows[i] = data.cards.slice(i * x, i * x + x) // 5, 10
    }

    for (const cardRow of cardRows) {
      // Generate HTML for that row
      let rowHtml = `<div class="card-row">`

      for (const cardInRow of cardRow) {
        rowHtml += `
          <div class="card-body">
            <h2 class="card-title">${cardInRow.title}</h2>
            <img src="${cardInRow.thumbnail_photo_url}"/>
            <div >$${cardInRow.cost}.00</div>
              ${cardInRow.active ? "": "<h3>Sold Out</h3>"}
              <a  href="" > <i data-id = "${cardInRow.id}" class="fa-regular fa-heart card-like-icon"></i>
              </a>
        </div>
        `
      }
      rowHtml += `</div>`

        // Append the row to the cardsContainer
        $(rowHtml).appendTo(cardsContainer)
      }
  })
}




