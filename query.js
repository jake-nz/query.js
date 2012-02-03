function query(input){
    if(typeof(input) == "string"){
        this.query = this.parse(input);
    }
}

query.prototype.parse = function(querystring){
    var params = {};
    $.each( querystring.split('&'), function(i, part){
        var kv = part.split('='),
            key = unescape(kv[0]),
            value = unescape(kv[1]);
        if (key in params){
            if (!$.isArray(params[key])){
                params[key] = [params[key]];
            }
            params[key].push(value);
        }else{
            params[key] = value;
        }
    });
    return params;
};

query.prototype.toString = function(){
    return $.param(this.query);
};

query.prototype.remove = function(key){
    delete this.query[key];
    return this;
};

query.prototype.get = function(key){
    return !(key in this.query) && arguments.length > 1 && arguments[1] || this.query[key];
};

query.prototype.pop = function(key){
    value = this.get.apply(this, arguments);
    this.remove(key);
    return value;
};

query.prototype.set = function(key, value){
    this.query[key] = value;
    return this;
};
