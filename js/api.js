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
var resultt;


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
				for(var i=0; i<data.Count; i++){
					if(item[i].value!=0){
						arr[i][0] = item[i].timevalue
						arr[i][1] = item[i].value
					}
				}
				arr.sort(function(a, b) { 
  					return b[0] - a[0];  // 내림차순
});
				resultt = arr[0][1] - arr[1][1]
				document.getElementsByTagName('zxc')[0].innerText = arr[0][1] +'(+'+ resultt + ')';
            })
        }
    })
})

$(function() {
    $.ajax({
        url: "https://api.upbit.com/v1/ticker?markets=KRW-TRX",
        dataType: "json",
        success: function(data) {
            $.each(data, function(index, item) {
                trx = Math.floor(item.trade_price * coin_volume);
                document.getElementById('coin').innerHTML = comma(trx);
                document.getElementById('deposit').innerHTML = comma(deposit_volume);
            })
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
    document.getElementById("now").innerHTML = time.getFullYear() + "/" + (time.getMonth()+1) + "/" + time.getDate() + "/" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
}