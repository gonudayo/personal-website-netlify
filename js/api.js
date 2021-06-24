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
	
    $(function () {
        $.ajax({
            url: "https://api.upbit.com/v1/ticker?markets=KRW-TRX",
            dataType: "json",
            success: function (data) {
                $.each(data, function (index, item) {
                    trx = Math.floor(item.trade_price * coin_volume);
                    document.getElementById('coin').innerHTML = comma(trx);
                    document.getElementById('deposit').innerHTML = comma(deposit_volume);
                })
            }
        })
    })
	$(function () {
        $.ajax({
            url: "https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD",
            dataType: "json",
            success: function (data) {
				exchange_rate=data[0].cashSellingPrice;
            }
        })
    })
	
	$(function () {
        $.ajax({
            url: "https://9wl9vr5c1l.execute-api.ap-northeast-2.amazonaws.com/default/Crawling-Example",
            dataType: "json",
            success: function (data) {
				stock_price = Math.floor(data[0]*stock_volume*exchange_rate);
				document.getElementById('stock').innerHTML = comma(stock_price);
				document.getElementById('total').innerHTML = comma(stock_price + trx + deposit_volume);
				goal = (stock_price+ trx + deposit_volume) / 100000;
				document.getElementsByTagName('progress')[0].value = goal.toFixed(2);
   				document.getElementsByTagName('b')[0].innerText = ' ' + goal.toFixed(2) + '%';
            }
        })
    })
	
    function time() {
        var time = new Date();
        document.getElementById("now").innerHTML = time.getFullYear() + "/" + time.getMonth() + "/" + time.getDate() + "/" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    }