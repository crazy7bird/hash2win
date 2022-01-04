var api="https://mining.crazybird.fr:8118";
//var address ="TRTLuwZJH8z3CfZsu7g1pM4FgBGfVnwT8WNea2KLenugEbHg2x7SMsPe9akCC6CJfmRgDHSRszGuqRsxS1E8bxYmFMzyeMoDmsk";

var docCookies = {
    getItem: function (sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
};

var address = docCookies.getItem('mining_address');




$('#lookUp').click(function(){

    var address = $('#yourStatsInput').val().trim();
    if (!address){
        $('#yourStatsInput').focus();
        return;
    }

    $('#addressError').hide();
    $('.yourStats').hide();
    $('#payments_rows').empty();

    $('#lookUp > span:first-child').hide();
    $('#lookUp > span:last-child').show();


    if (xhrAddressPoll) xhrAddressPoll.abort();
    if (addressTimeout) clearTimeout(addressTimeout);

    function fetchAddressStats(longpoll){
        xhrAddressPoll = $.ajax({
            url: api + '/stats_address',
            data: {
                address: address,
                longpoll: longpoll
            },
            dataType: 'json',
            cache: 'false',
            success: function(data){

                $('#lookUp > span:last-child').hide();
                $('#lookUp > span:first-child').show();

                if (!data.stats){
                    $('.yourStats, .userChart').hide();
                    $('#addressError').text(data.error).show();

                    if (addressTimeout) clearTimeout(addressTimeout);
                    addressTimeout = setTimeout(function(){
                        fetchAddressStats(false);
                    }, 2000);

                    return;
                }


                $('#addressError').hide();

                if (data.stats.lastShare)
                    $('#yourLastShare').timeago('update', new Date(parseInt(data.stats.lastShare) * 1000).toISOString());
                else
                    updateText('yourLastShare', 'Never');

                updateText('yourHashrateHolder', (data.stats.hashrate || '0 H') + '/sec');
                updateText('yourHashes', (data.stats.hashes || 0).toString());
                updateText('yourPaid', getReadableCoins(data.stats.paid));
                updateText('yourPendingBalance', getReadableCoins(data.stats.balance));

                renderPayments(data.payments);

                $('.yourStats').show();

                xhrRenderUserCharts = $.ajax({
                    url: api + '/stats_address?address=' + address + '&longpoll=false',
                    cache: false,
                    dataType: 'json',
                    success: function(data) {
                        createUserCharts(data);
                    }
                });

                docCookies.setItem('mining_address', address, Infinity);

                fetchAddressStats(true);

            },
            error: function(e){
                if (e.statusText === 'abort') return;
                $('#addressError').text('Connection error').show();

                if (addressTimeout) clearTimeout(addressTimeout);
                addressTimeout = setTimeout(function(){
                    fetchAddressStats(false);
                }, 2000);

            }
        });
    }
    fetchAddressStats(false);
});
























/*#####################################################################################*/
/*Fuck jQuery part*/ 
function fetchAddressStats(longpoll, callback){
const req = new XMLHttpRequest();


    req.open('GET', api + '/stats_address?address=' + address, true);
    req.send();
    req.onload = function() {
        data= JSON.parse(req.responseText);
        if (data.stats == undefined){ //cas ou la requette foire.
            console.log("Turtle.js data.stats is empty");
            HashRate = 0;
            TotalHash = 0;
        }
        else{       
            HashRate = parseFloat(data.stats.hashrate) * (data.stats.hashrate.indexOf("KH")>=0 ? 1000 :1 ) ;
            TotalHash = parseInt(data.stats.hashes) - ResetTotalHash;
        }
        if (typeof callback == 'function') {
                callback();
                
        }

    }
}

/***************************/ 

//charge une fois les données pour set le ResetTotalHash
fetchAddressStats(false , function(){
    ResetTotalHash = TotalHash;
    TotalHash = TotalHash - ResetTotalHash;
  });

//Viens lire régulièrement les données
setInterval(function(){

fetchAddressStats(false)

},5000);
