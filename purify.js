function getFollowList(callback) {
    function getFollowUrl() {
        let current_url = window.location.href;
        let follow_url = current_url.replace(/home.*/, "follow?rightmod=1&wvr=6").replace("\/u", "")
        return follow_url
    }

    function load(url, callback) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback(xhr.response); 
            }
        }
        xhr.open('GET', url, true);
        xhr.send('');
    }
    
    function parseResponse(response) {
        var reg = /usercard=\\\"(id=\d+)\\\" >/g
        var follow_list = new Set()
        while(piece = reg.exec(response)) {
            follow_list.add(piece[1]);
        }
        callback(follow_list)
    }
    follow_url = getFollowUrl()
    load(follow_url, parseResponse)
}
function removeUnknown(follow_list) {
    function getPiece(feed_detail) {
        var reg = /id=\d+/
        let face = feed_detail.getElementsByClassName("W_face_radius")[1]
        let usercard = face = null? null: face.getAttribute("usercard")
        if (usercard != null) {
            return face.match(reg)[0]
        }
    }
    var feed_details = document.getElementsByClassName("WB_cardwrap WB_feed_type S_bg2")
    for (feed_detail of feed_details) {
        var piece = getPiece(feed_detail)
        if (!follow_list.has(piece)) {
            console.log(piece)
            feed_detail.style.display = "none"
        }
    }
}
function removeAds() {
    function getAds() {
        var ads = []
        
        var ad_taobao = document.getElementById("v6_pl_ad_bottomtip")
        ads.push(ad_taobao)
        var ad_right = document.getElementById("v6_pl_rightmod_recominfo")
        ads.push(ad_right)
        var ad_right2 = document.getElementById("v6_pl_rightmod_ads36")
        ads.push(ad_right2)

        return ads
    }
    var ads = getAds()
    for (let adv of ads) {
        adv.style.display = "none"
    }
}
getFollowList(removeUnknown)
removeAds()
