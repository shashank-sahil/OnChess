// ---point 1 - what this does is that it(libuv c++ http socket) starts listening for the term "data" whenever data arrives it adds that callback into JS Event Loop .
            // JS code moves forward it just saying it ki bro start listening and when you find add in the event queue

// content when resolved goes into promise container we can access it by using promise.then((vale)=>{vale is the content})

// Class to handle request type , url processing and JSON parsing.
export class reqType{
    constructor(req){
        this._content = ""
        this._verb = req.method
        this._url = req.url
        this.obj = req
    }
    get verb(){
        return this._verb;
    }
    get url(){
        return this._url;
    }
    body(){
   
    if( this._verb == "POST"){
        let content = this._content
        let promise = new Promise((resolve ,reject)=>{
            this.obj.on("data" , (chunk)=>{
                content += chunk;
            })
          
            this.obj.on("end",()=>{
                resolve(content);
            })
            this.obj.on("error" , (error)=>{
                reject(error);
            })
        })
       return promise
    }else{
     console.log("Only post is supported for body content")
    }

    }
}

