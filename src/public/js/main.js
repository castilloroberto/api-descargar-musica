const convertBtn = document.querySelector('.btnDown')
const URLInput = document.querySelector('.inputURL')
const input = document.querySelectorAll('.radiogroup input')
const radios = document.querySelectorAll('.radio')


radios[0].onclick = ()=>{
    radios[0].classList.add('selected')
    radios[1].classList.remove('selected')
    
}
radios[1].onclick = ()=>{
    radios[1].classList.add('selected')
    radios[0].classList.remove('selected')
}

convertBtn.onclick = ()=>{
    input.forEach(e =>{
        if(e.checked)
            console.log(e.value)
    });
    sendUrl(URLInput.value)
}


function sendUrl(url) {
    
    // fetch(`http://localhost:3000/download?url=${url}`,{
    //     method:'GET'
    // })
    // .then(res => res.json())
    // .then(json => console.log(json))
    window.location.href = `http://localhost:3000/download?url=${url}`
}


