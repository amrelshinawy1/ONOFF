$(document).ready(function () {
  getDevices();
  // panel close and open
  $("#dvPanel1").panel().enhanceWithin();
  $(document).on("swipeleft swiperight", "body", function (e) {
    if (e.type === "swipeleft") {
      $("#dvPanel1").panel("close");
    }
    else if (e.type === "swiperight") {
      $("#dvPanel1").panel("open");
    }
  });
  $(document).on("vmouseup", "span[name='btnOn'], span[name='btnOff']", function () {
    var action = $(this).html();
    var device = $(this).parent().prev().children().eq(0).html();
    sendAction(action, device)
  });
});

