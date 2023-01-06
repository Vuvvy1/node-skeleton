
let min_price = 0;
let max_price = 100;


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

$(document).on("click", ".delete-button", function () {
  deleteCards()
  })

function deleteCards () {
  const card_id = $(".delete-button").val()
  $.ajax({
    url: `/api/cards/${card_id}`,
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
    }
});
}


function showAllItems() {
  $.get('/api/cards',
  (data) => {
    const cardsContainer = $("#cards-container")

    // Bucketing cards into rows
    const cardRows = []
    for (let i = 0; i < data.cards.length; i++) { // i = 1
      cardRows[i] = data.cards.slice(i * 5, i * 5 + 5) // 5, 10
    }

    for (const cardRow of cardRows) {
      // Generate HTML for that row
      let rowHtml = `<div class="card-row">`

      for (const cardInRow of cardRow) {
        rowHtml += `
          <div class="card-body">
            <h2 class="card-title">${cardInRow.title}${cardInRow.active ? "": "<a style='color: red;'>    Sold Out</a>"}</h2>
            <img src="${cardInRow.thumbnail_photo_url}"/>
            <div >
              <a  href="" > <i data-id = "<%- cards[i].id %>" class="fa-regular fa-heart card-like-icon"></i>
              </a>
              $${cardInRow.cost}.00
              <button type="submit" class="login-button">Add to cart</button>
              <button value = ${cardInRow.id} class="delete-button">Delete</button>

            </div>
          </div>
          `
        }
        rowHtml += `</div>`

        // Append the row to the cardsContainer
        $(rowHtml).appendTo(cardsContainer)
      }
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
  console.log('hello')
  console.log(min_price)
  console.log(max_price)
  const cardsContainer = $("#cards-container")
  cardsContainer.empty()
  $.get(`/api/cards?min_price=${min_price}&max_price=${max_price}`,
  (data) => {

    // Bucketing cards into rows
    const cardRows = []
    const cardsPerRow = 4
    const x = cardsPerRow
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
              <a  href="" > <i data-id = "<%- cards[i].id %>" class="fa-regular fa-heart card-like-icon"></i>
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




