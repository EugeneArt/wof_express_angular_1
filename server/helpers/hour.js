
function Hour() {
    this.hour = "";
}

Hour.prototype.setHour = function(hour){
    return this.hour = hour.split(":")[0];
};

Hour.prototype.getHour = function(){
    return this.hour;
};

Hour.prototype.getPrevHour = function(){
    var prevHour = parseInt(this.hour) - 1;
    return this.checkHour(prevHour);
};

Hour.prototype.getNextHour = function(){
    var nextHour = parseInt(this.hour) + 1;
    return this.checkHour(nextHour);
};

Hour.prototype.checkHour = function(hour){
    if(hour < 10 && hour >= 0){
        hour = "0" + hour;
    }else if(hour == -1) {
        hour = "23";
    }else if(hour == 24) {
        hour = "00";
    }
    return hour;
};


module.exports = new Hour();