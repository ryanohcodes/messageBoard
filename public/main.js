const deleteButtons = document.querySelectorAll('.delete')
Array.from(deleteButtons).forEach(x => {
    x.addEventListener('click', deleteThis)
})

async function deleteThis(){
    const id = this.parentNode.childNodes[1].textContent
    try{
        const response = await fetch('/delete',{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'apple': id
            })
        })
        const info = await response.json()
        console.log(info)
        location.reload()
    }
    catch(err){
        console.log(err)
    }

   
}