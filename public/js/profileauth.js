const transfer_input = document.getElementsByClassName("test")
const transfer = document.getElementById("transfer")
const submit_name = document.getElementById("update-submit")
const text_update = document.getElementsByClassName("text-name")

async function submit_transfer(){
    var data = new FormData()

    for (let i in transfer_input){
        data.append(transfer_input[i].name, transfer_input[i].value)
    }
    var request = await fetch("transfer",{
        method: "post",
        body: data
    })
    var response = await request.text()
    console.log(response)
}
async function submit_update_name(){
    var data = new FormData()
    for (let i in text_update){
        data.append(text_update[i].name, text_update[i].value)
    }
    var request = await fetch("profileNameUpdate",{
        method: "post",
        body: data
    })
    var response = await request.text()
    console.log(response)

}
transfer.addEventListener("click", submit_transfer)
submit_name.addEventListener("click", submit_update_name)