let min_price = 0;
let max_price = 100;


$(document).on('input', '#min-price', function() {
  min_price = parseInt($("#min-price").val());
  console.log(min_price)
  // $('#min-price-txt').html( $(this).val() );
  $("#min-price-txt").text("$" + min_price);
});

$(document).on('input', '#max-price', function() {
  max_price = parseInt($("#max-price").val());
  console.log(max_price)
  // $('#min-price-txt').html( $(this).val() );
  $("#max-price-txt").text("$" + max_price);
});



