const todoItem = document.querySelectorAll('span.not')
const completed = document.querySelectorAll('span.completed')
const deleteItem = document.querySelectorAll('.del')

Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete)
})

async function markComplete(){
    const todoID = this.parentNode.dataset.id
    console.log(todoID)
    try{
        const response = await fetch('todo/markComplete', {
         method: 'put',
         headers: {'Content-type': 'application/json'},
         body: JSON.stringify({
             'todoID': todoID
            })    
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

Array.from(completed).forEach((el) => {
    el.addEventListener('click', markUncomplete)
})

async function markUncomplete(){
    const todoID = this.parentNode.dataset.id
    console.log(todoID)
    try{
        const response = await fetch('todo/markUncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoID': todoID
            })
        })
        const data = response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

Array.from(deleteItem).forEach((el) => {
    el.addEventListener('click', deleteTodo)
})

async function deleteTodo(){
    const todoID = this.parentNode.dataset.id
    console.log(todoID)
    try{
        const response = await fetch('/todo/delete', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoID': todoID
            })
        })
        const data = response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}