function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}
const TRX_volume = 1500;
const SUN_volume = 4500;
const stock_volume = 13;
let exchange_rate;
let trx;
let sun;
let btc;

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
                arr.sort(function(a, b) {
                    return b[0] - a[0];
                });
				if(Math.floor(arr[0][0]/10000)!=Math.floor(arr[1][0]/10000)) arr[1][2]=0;
				
				var baekjoon_rate = arr[0][1] - arr[1][1];
				var github_commit = arr[0][2] - arr[1][2];
				
				document.getElementById('baekjoon').innerHTML = arr[0][1] + '(+' + baekjoon_rate + ')';
				document.getElementById('github').innerHTML = arr[0][2] + '(+' + github_commit + ')';
				
				if (baekjoon_rate == 0) document.getElementById('baekjoon').style.color = "#FF0000";
				else document.getElementById('baekjoon').style.color = "#01DF01";
				if (github_commit == 0) document.getElementById('github').style.color = "#FF0000";
				else document.getElementById('github').style.color = "#01DF01";
            })
        }
    })
})

$(function TRX() {
    $.ajax({
        url: "https://api.upbit.com/v1/ticker?markets=KRW-TRX",
        dataType: "json",
        success: function(data) {
			trx = Math.floor(data[0].trade_price * TRX_volume);
			SUN();
        }
    })
})

function SUN() {
    $.ajax({
        url: "https://api.upbit.com/v1/ticker?markets=BTC-SUN",
        dataType: "json",
        success: function(data) {
			sun = data[0].trade_price * SUN_volume;
			BTC();
        }
    })
}

function BTC() {
    $.ajax({
        url: "https://api.upbit.com/v1/ticker?markets=KRW-BTC",
        dataType: "json",
        success: function(data) {
			btc = Math.floor(data[0].trade_price * sun) + trx;
			document.getElementById('coin').innerHTML = comma(btc);
        }
    })
}

$(function KRW() {
    $.ajax({
        url: "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD",
        dataType: "json",
        success: function(data) {
			exchange_rate = data[0].cashSellingPrice;
			STOCK();
        }
    })
})

function STOCK() {
    $.ajax({
        url: "https://9wl9vr5c1l.execute-api.ap-northeast-2.amazonaws.com/default/Crawling-Example",
        dataType: "json",
        success: function(data) {
            let stock_price = Math.floor(data[0] * stock_volume * exchange_rate);
            document.getElementById('stock').innerHTML = comma(stock_price);
            document.getElementById('total').innerHTML = comma(stock_price + btc);
            let goal = (stock_price + btc) / 100000;
            document.getElementsByTagName('progress')[0].value = goal.toFixed(2);
            document.getElementsByTagName('b')[0].innerText = ' ' + goal.toFixed(2) + '%';
        }
    })
}

function time() {
    let time = new Date();
    document.getElementById("now").innerHTML = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + "/" + ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);
	document.getElementById("year").innerHTML = time.getFullYear();
}