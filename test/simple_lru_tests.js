var should = require("should")
var SimpleCache = require("../lib/simple_lru.js")
describe("BigCache Config",function(){
    it("Should support set and get operations",function(){
        var cache = new SimpleCache({maxSize:1})
        cache.set("hello","world")
        cache.get("hello").should.equal("world")
    })   
    it("Should drop key least used on max size",function(){
        var cache = new SimpleCache({maxSize:3})
        cache.set("a","1")
        cache.set("b","2")
        cache.set("c","3")
        cache.get("a").should.equal("1")
        cache.get("b").should.equal("2")
        cache.get("c").should.equal("3")
        cache.set("d","4")
        cache.get("d").should.equal("4")
        should.not.exist(cache.get("a"))
        cache.get("b")
        cache.set("e","5")
        cache.get("b").should.equal("2")
        cache.get("e").should.equal("5")
        should.not.exist(cache.get("c"))
    })
    it("Should remove all objects on reset",function(){
        var cache = new SimpleCache({maxSize:3})
        cache.set("a","1")
        cache.set("b","2")
        cache.set("c","3")
        cache.size.should.equal(3)
        Object.keys(cache.cache).length.should.equal(3)
        cache.reset()
        cache.size.should.equal(0)
        Object.keys(cache.cache).length.should.equal(0)
    })
    it("Should enable remove elements",function(){
        var cache = new SimpleCache({maxSize:3})
        cache.set("a","1")
        cache.set("b","2")
        cache.set("c","3")
        cache.size.should.equal(3)
        cache.get("b").should.equal("2")
        cache.del("b")
        cache.size.should.equal(2)
        Object.keys(cache.cache).length.should.equal(2)
        should.not.exist(cache.get("b"))
    })
    it("Should provide a way to list all objects",function(){
        var cache = new SimpleCache({maxSize:100})
        for(var i = 0; i < 100; i++)
            cache.set(i,"value_"+i)

        cache.forEach(function(value,key){
            value.should.equal("value_"+key)
            cache.set(key,value+"_modif")
        })

        for(var i = 0; i < 100; i++)
            cache.get(i).should.equal("value_"+i+"_modif")
    }) 

    it("Should not return timeout item", function(done){
        var cache = new SimpleCache({maxSize:1, maxTime: 1})
        cache.set("hello", "world")
        setTimeout(function() 
        {
            should.equal(cache.get("hello"), undefined);
            done();
        }, 10);
    }) 

    it("Should return timeout item", function(done){
        var cache = new SimpleCache({maxSize:1, maxTime:100})
        cache.set("hello", "world")
        setTimeout(function() 
        {
            should.equal(cache.get("hello"), "world")
            done();
        }, 10);
    }) 

    it("Should set timestamp when you use Cache.set", function(done){
        var cache = new SimpleCache({maxSize:1, maxTime:100})
        cache.set("hello", "world")
        setTimeout(function() 
        {
            should.equal(cache.get("hello"), "world")
            cache.set("hello", "world again")
            setTimeout(function() 
            {
                should.equal(cache.get("hello"), "world again");
                done();
            }, 75);
        }, 75);
    }) 


})
