console.log("client side java script")


// fetch('http://localhost:3000/weather?address=mumbai').then((response)=>{
//        response.json().then((data)=>{
//            console.log(data)
//        })
// })

const weatherForm = document.querySelector('form');

var search = document.querySelector('input')
var errorMsg = document.getElementById("error")
var result = document.getElementById('location')
console.log(errorMsg)

weatherForm .addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value
    errorMsg.textContent = 'loading...'
    result.textContent =""
  


    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
       response.json().then((data)=>{
           if(data.error){

            errorMsg.textContent = data.error
         
           
           }else{
               console.log(data)
                
               errorMsg.textContent =data.location
               result.textContent =data.forecast

                //   result.appendChild(document.createTextNode(data.location))
                //   result.appendChild(document.createTextNode(data.forecast))
           }
        
       })
})
    
    
    document.querySelector('input').value =""
})

