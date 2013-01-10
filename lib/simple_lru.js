/**
 * LRU cache based on a double linked list
 */

function ListElement(before,next,key,value){
    this.before = before
    this.next = next
    this.key = key
    this.value = value
}

function Cache(options){
    if(!options)
        options = {}
    this.maxSize = options.maxSize 
    this.reset()
}


Cache.prototype.get = function(key){
    var cacheVal = this.cache[key]
    if(cacheVal)
        this.hit(cacheVal)
    else
        return undefined
    return cacheVal.value
}

Cache.prototype.set = function(key,val){
    var actual = this.cache[key]
    if(actual){
        actual.value = val
        this.hit(actual)
    }else{
        var cacheVal = new ListElement(undefined,undefined,key,val)
        this.cache[key] = cacheVal
        this.atach(cacheVal)
    }
    if(this.size>this.maxSize){
        var tailKey = this.tail.key 
        this.deatach(this.tail)
        delete this.cache[tailKey]
    }
}

Cache.prototype.hit = function(cacheVal){
    //Send cacheVal to the head of list
    this.deatach(cacheVal)
    this.atach(cacheVal)
}

Cache.prototype.atach = function(element){
    if(!element)
        return;
    element.before = undefined
    element.next = this.head
    this.head = element
    if(!element.next)
       this.tail = element
    else
        element.next.before = element
    this.size++ 
}

Cache.prototype.deatach = function(element){
    if(!element)
        return;
    var before = element.before
    var next = element.next
    if(before){
        before.next = next
    }else{
        this.head = next
    }
    if(next){
        next.before = before
    }else{
        this.tail = before
    }
    this.size--
}

Cache.prototype.reset = function(){
    this.size = 0   
    this.cache = {}
    this.tail = undefined
    this.head = undefined
}

module.exports=Cache
