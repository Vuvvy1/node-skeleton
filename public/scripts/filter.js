
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
            <h2 class="card-title">${cardInRow.title}</h2>
            <img src="${cardInRow.thumbnail_photo_url}"/>
            <div >${cardInRow.cost}</div>
              ${cardInRow.active ? "": "<h3>Sold Out</h3>"}
          </div>
        `
      }
      rowHtml += `</div>`

      // Append the row to the cardsContainer
      $(rowHtml).appendTo(cardsContainer)
    }
  })
}

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
    for (let i = 0; i < data.cards.length; i++) { // i = 1
      cardRows[i] = data.cards.slice(i * 5, i * 5 + 5) // 5, 10

    }

    for (const cardRow of cardRows) {
      // Generate HTML for that row
      let rowHtml = `<div class="card-row">`

      for (const cardInRow of cardRow) {
        rowHtml += `
          <div class="card-body">
            <h2 class="card-title">${cardInRow.title}</h2>
            <img src="${cardInRow.thumbnail_photo_url}"/>
            <div >${cardInRow.cost}</div>
              ${cardInRow.active ? "": "<h3>Sold Out</h3>"}
          </div>
        `
      }
      rowHtml += `</div>`

      // Append the row to the cardsContainer
      $(rowHtml).appendTo(cardsContainer)
    }
  })
}




