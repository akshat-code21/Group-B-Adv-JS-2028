// const user = {
//    name : 'Adam',
//    sayHi() {
//       console.log(`Hello ${this.name}`)
//    }
// }

// user.sayHi()



//--xx--//


const user = {
    message: 'Hello'
}

const names = ['Adam' , 'Bob' , 'Charles']


names.forEach(function(name){
   console.log(this.user , name)
}, user)


//--XX--//


const calculator = {
    multiplier : 2,

    numbers : [1 ,2 ,3],

    multiply(){
        return this.numbers.map((num)=>{
            
           console.log(num)
           return num * this.multiplier
        })
    }
}

console.log(calculator.multiply())


// Call , Apply and Bind


