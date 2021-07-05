function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
var deposit_volume = 2000000;
var coin_volume = 3500;
var stock_volume = 8;
var exchange_rate;
var trx;
var goal;
var stock_price;
var baekjoon_rate;




$(function() {
    $.ajax({
        url: "https://eqqsmag9z5.execute-api.ap-northeast-2.amazonaws.com/default/ReadMessage",
        dataType: "json",
        success: function(data) {
            $.each(data, function(index, item) {
                function createArray(rows, columns) {
                    var arr = new Array(rows);
                    for (var i = 0; i < rows; i++) {
                        arr[i] = new Array(columns);
                    }
                    return arr;
                }
                var arr = createArray(data.Count, 2);
                var j = 0;
                for (var i = 0; i < data.Count; i++) {
                    if (item[i].countvalue != 0) {
                        arr[j][0] = item[i].timevalue;
                        arr[j][1] = item[i].countvalue;
                        j++;
                    }
                }
                arr.sort(function(a, b) {
                    return b[0] - a[0];
                });
                baekjoon_rate = arr[0][1] - arr[1][1];
                document.getElementById('baekjoon').innerHTML = arr[0][1] + '(+' + baekjoon_rate + ')';
                if (baekjoon_rate == 0) document.getElementById('baekjoon').style.color = "#FF0000";
                else document.getElementById('baekjoon').style.color = "#01DF01";
            })
        }
    })
})

$(function() {
    $.ajax({
        url: "https://api.upbit.com/v1/ticker?markets=KRW-TRX",
        dataType: "json",
        success: function(data) {
                trx = Math.floor(data[0].trade_price * coin_volume);
                document.getElementById('coin').innerHTML = comma(trx);
                document.getElementById('deposit').innerHTML = comma(deposit_volume);
        }
    })
})
$(function() {
    $.ajax({
        url: "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD",
        dataType: "json",
        success: function(data) {
            exchange_rate = data[0].cashSellingPrice;
        }
    })
})

$(function() {
    $.ajax({
        url: "https://9wl9vr5c1l.execute-api.ap-northeast-2.amazonaws.com/default/Crawling-Example",
        dataType: "json",
        success: function(data) {
            stock_price = Math.floor(data[0] * stock_volume * exchange_rate);
            document.getElementById('stock').innerHTML = comma(stock_price);
            document.getElementById('total').innerHTML = comma(stock_price + trx + deposit_volume);
            goal = (stock_price + trx + deposit_volume) / 100000;
            document.getElementsByTagName('progress')[0].value = goal.toFixed(2);
            document.getElementsByTagName('b')[0].innerText = ' ' + goal.toFixed(2) + '%';
        }
    })
})

function time() {
    var time = new Date();
    document.getElementById("now").innerHTML = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + "/" + ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);
}