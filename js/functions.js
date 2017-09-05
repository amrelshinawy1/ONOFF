function getDevices() {
  var devices = [];
  console.log("calling devices")
  $.ajax({
    url: 'https://galliot.ga/api/devices',
    type: 'GET',
    contentType: 'application/json',
    processData: false,
    dataType: 'json',
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsInR5cGUiOiJhcGlrZXkiLCJpYXQiOjE1MDQ0NDU3ODksImp0aSI6ImFwZTUxaW1qNzRzNmc5ZiJ9.qbPwDFYls_1BgXjLEL5m8h7gGbMM4VpgbaRtbp3_tuo",
      "Content-Type": "application/json"
    },
    success: function (response) {
      insertDevices(response);

    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
    }
  });

}
function insertDevices(devices) {
  var page = "";
  var device = ""
  for (i in devices) {
    device = devices[i];
    if (device.gName === "Hall") {
      page = "hall";
    } else if (device.gName === "Kitchen") {
      page = "Kitchen";
    } else if (device.gName === "Bathroom") {
      page = "Bathroom";
    } else if (device.gName === "Bedroom") {
      page = "Bedroom";
    } else {
      continue;
    }
    insertDeviceHTML(device, page);
  }
}

function insertDeviceHTML(device, page) {
  var element = $(`#dv${page}Main > h3`);
  var html = `
    <div class="ui-field-contain">\
        <label>${device.name}@${device.owner}</label>\
        <input type="text" readonly class="ui-input-text" value="${device.properties.status}">\
    </div>\
    <div class="ui-field-contain">\
        <label>Action</label>\
        <span class="ui-btn-inline ui-btn ui-btn-b ui-corner-all ui-shadow" name="btnOn">ON</span>\
        <span class="ui-btn-inline ui-btn ui-btn-b ui-corner-all ui-shadow" name="btnOff">OFF</span>\
        <div>\
            <div class="ui-grid-a">\
            </div>\
        </div>\
    </div>`;
  element.append(html).enhanceWithin();
}

function sendAction(action, device) {
  $.ajax({
    url: 'https://galliot.ga/api/streams',
    data: JSON.stringify({
      "owner": "user",
      "device": "application",
      "data": {
        "action": action,
        "device": device
      }
    }),
    type: 'POST',
    contentType: 'application/json',
    processData: false,
    dataType: 'json',
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidXNlciIsInR5cGUiOiJhcGlrZXkiLCJpYXQiOjE1MDQ0NDU3ODksImp0aSI6ImFwZTUxaW1qNzRzNmc5ZiJ9.qbPwDFYls_1BgXjLEL5m8h7gGbMM4VpgbaRtbp3_tuo",
      "Content-Type": "application/json"
    },
    success: function (response) {
      console.log("request succeeded");
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
    }
  });
}
