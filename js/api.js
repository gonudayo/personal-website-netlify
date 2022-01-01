function comma(str) {
  str = String(str);
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
}
const stock_volume = 20;
let exchange_rate;

function seoul(x) {
  if (x) {
    const temp = new Date(x);
    temp.setHours(temp.getHours() + 9);
    return temp;
  } else {
    const temp = new Date();
    temp.setHours(temp.getHours() + 9);
    return temp;
  }
}

document.getElementsByTagName("progress")[0].value =
  ((new seoul() - new seoul("2020-09-14")) / (1000 * 60 * 60 * 24) / 545) * 100;
document.getElementById("left").innerHTML =
  "휴가 제외 " +
  ((new seoul("2022-03-13") - new seoul()) / (1000 * 60 * 60 * 24)).toFixed(0) +
  "일 남았다.";
document.getElementsByTagName("b")[0].innerText =
  ((new seoul() - new seoul("2020-09-14")) / (1000 * 60 * 60 * 24) / 545) *
    100 +
  "%";

$(function () {
  $.ajax({
    url: "https://eqqsmag9z5.execute-api.ap-northeast-2.amazonaws.com/default/ReadMessage",
    dataType: "json",
    success: function (data) {
      $.each(data, function (index, item) {
        function createArray(rows, columns) {
          var arr = new Array(rows);
          for (var i = 0; i < rows; i++) {
            arr[i] = new Array(columns);
          }
          return arr;
        }
        var arr = createArray(data.Count, 3);
        var j = 0;
        for (var i = 0; i < data.Count; i++) {
          if (item[i].countvalue != 0 && item[i].commitvalue != 0) {
            arr[j][0] = item[i].timevalue;
            arr[j][1] = item[i].countvalue;
            arr[j][2] = item[i].commitvalue;
            j++;
          }
        }
        arr.sort(function (a, b) {
          return b[0] - a[0];
        });
        if (Math.floor(arr[0][0] / 10000) != Math.floor(arr[1][0] / 10000))
          arr[1][2] = 0;

        var baekjoon_rate = arr[0][1] - arr[1][1];
        var github_commit = arr[0][2] - arr[1][2];

        document.getElementById("baekjoon").innerHTML =
          arr[0][1] + "(+" + baekjoon_rate + ")";
        document.getElementById("github").innerHTML =
          arr[0][2] + "(+" + github_commit + ")";

        if (baekjoon_rate == 0)
          document.getElementById("baekjoon").style.color = "#FF0000";
        else document.getElementById("baekjoon").style.color = "#01DF01";
        if (github_commit == 0)
          document.getElementById("github").style.color = "#FF0000";
        else document.getElementById("github").style.color = "#01DF01";
      });
    },
  });
});

$(function KRW() {
  $.ajax({
    url: "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD",
    dataType: "json",
    success: function (data) {
      exchange_rate = data[0].cashSellingPrice;
      STOCK();
    },
  });
});

function STOCK() {
  $.ajax({
    url: "https://9wl9vr5c1l.execute-api.ap-northeast-2.amazonaws.com/default/get-spot",
    dataType: "json",
    success: function (data) {
      let stock_price = Math.floor(data * stock_volume * exchange_rate);
      document.getElementById("stock").innerHTML = comma(stock_price);
      document.getElementById("total").innerHTML = comma(stock_price);
    },
  });
}

function time() {
  let time = new Date();
  document.getElementById("now").innerHTML =
    time.getFullYear() +
    "/" +
    (time.getMonth() + 1) +
    "/" +
    time.getDate() +
    "/" +
    ("0" + time.getHours()).slice(-2) +
    ":" +
    ("0" + time.getMinutes()).slice(-2) +
    ":" +
    ("0" + time.getSeconds()).slice(-2);
  document.getElementById("year").innerHTML = time.getFullYear();
}
