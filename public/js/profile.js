const nav_list = document.getElementsByTagName("ul")[0]
const over_view = document.getElementById("overview1")
const socialclick = document.getElementById("social1")
const dashboardview  = document.getElementsByClassName("overview")[0]
const quickTranscationView = document.getElementsByClassName("quick-transaction")[0]
const socialview = document.getElementsByClassName("social")[0]
const overview = document.getElementById("overview1")
const historyList = document.getElementsByClassName("history")[0]
const transactionlick = document.getElementById("transition1")
const transferclick = document.getElementById("transfer1")
const transferList = document.getElementsByClassName("transfer")[0]
const profileclick = document.getElementById("profile1")
const profilelist = document.getElementsByClassName("managementdiv")[0]
const edit_profile1 = document.getElementById("edit-profile1")
const profile_edit = document.getElementsByClassName("profil-edit")[0]
const profile_name = document.getElementById("profile-name-view")
const update_profile = document.getElementById("update-profile")
const update_submit = document.getElementById("update-submit")
const open_modal = document.getElementById("open-modal")
const modal_bg = document.getElementsByClassName("modal-bg")[0]
const cancel_upload = document.getElementById("cancel-upload")
const logout_click = document.getElementById("logout1")
const logout_modal = document.getElementsByClassName("logout-modal")[0]
const logout_button2 = document.getElementById("logout-button2")
function siblingRadius(){
    var top_sib = this.previousElementSibling
    var bottom_sib = this.nextElementSibling

    if(top_sib !=null){
        top_sib.style.borderBottomRightRadius = "20px"
        }
        bottom_sib.style.borderTopRightRadius = "20px"
}
function reverseSiblingRadius(){
    var top_sib = this.previousElementSibling
    var bottom_sib = this.nextElementSibling

    if(top_sib !=null){
        top_sib.style.borderBottomRightRadius = "0px"
        }
        bottom_sib.style.borderTopRightRadius = "0px"
}
for (let i in nav_list.children){
    if (typeof nav_list.children[i] === "object"){
        nav_list.children[i].addEventListener("mouseover", siblingRadius)
        nav_list.children[i].addEventListener("mouseout", reverseSiblingRadius)
    }
}

function openSocial(){
    socialview.style.display = "block"
    closeOverview()
    closeTransaction()
    closeTransfer()
    closeProfile()
    closeEditProfile()
    closeUpdateProfileName()
}

function closeSocial(){
    socialview.style.display = "none"
}

function openOverview(){
    quickTranscationView.style.display = "block"
    dashboardview.style.display = "block"
    closeSocial()
    closeTransaction()
    closeTransfer()
    closeProfile()
    closeEditProfile()
    closeUpdateProfileName()
}
function closeOverview(){
    quickTranscationView.style.display = "none"
    dashboardview.style.display = "none"
}

function openTransaction(){
    historyList.style.display = "block"
    closeOverview()
    closeSocial()
    closeTransfer()
    closeProfile()
    closeEditProfile()
    closeUpdateProfileName()
}

function closeTransaction(){
    historyList.style.display = "none"
}

function openTransfer(){
    transferList.style.display = "block"
    closeOverview()
    closeSocial()
    closeTransaction()
    closeProfile()
    closeEditProfile()
    closeUpdateProfileName()
}

function closeTransfer(){
    transferList.style.display = "none"
}
function openProfile(){
    profilelist.style.display = "block"
    closeOverview()
    closeSocial()
    closeTransaction()
    closeTransfer()
    closeEditProfile()
    closeUpdateProfileName()

}

function closeProfile(){
    profilelist.style.display = "none"

}
function openEditProfile(){
    profile_edit.style.display ="block"
    closeProfile()
    closeUpdateProfileName()

}
function closeEditProfile(){
    profile_edit.style.display ="none"
}
function openUpdateProfileName(){
    update_profile.style.display = "block"
    closeEditProfile()

}
function closeUpdateProfileName(){
    update_profile.style.display = "none"
}
function openmodal(){
    modal_bg.style.visibility = "visible"
}
function closemodal(){
    modal_bg.style.visibility = "hidden"
}
function openlogout(){
    logout_modal.style.visibility = "visible"
}
function closelogout(){
    logout_modal.style.visibility = "hidden"
}

socialclick.addEventListener("click",openSocial)
overview.addEventListener("click",openOverview)
transactionlick.addEventListener("click",openTransaction)
transferclick .addEventListener("click",openTransfer)
profileclick.addEventListener("click",openProfile)
edit_profile1.addEventListener("click",openEditProfile)
profile_name.addEventListener("click",openUpdateProfileName)
open_modal.addEventListener("click",openmodal)
cancel_upload.addEventListener("click",closemodal)
logout_click.addEventListener("click",openlogout)
logout_button2.addEventListener("click",closelogout)


