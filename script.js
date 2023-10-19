const inputName = document.getElementById("inputName")
const inputUrl = document.getElementById("inputUrl")
const inputSearch = document.getElementById("inputSearch")
const alertName = document.getElementById("alertName")
const alertUrl = document.getElementById("alertUrl")
const btnSubmit = document.getElementById("btnSubmit")
const tableBody = document.getElementById("tableBody")
let boxInformation = []
let currentIndex = 0
if (localStorage.getItem("Bookmark") !== null) {
    boxInformation = JSON.parse(localStorage.getItem("Bookmark"))
    displayBookmark()
}
btnSubmit.addEventListener("click", _ => {
    if (validName() && validUrl()) {
        if (btnSubmit.innerHTML === "Submit") {
            let content = {
                name: inputName.value,
                url: inputUrl.value
            }
            boxInformation.push(content)
            inputName.classList.remove("is-valid")
            inputUrl.classList.remove("is-valid")
        } else if (btnSubmit.innerHTML === "Update") {
            updateBookmark()
        }
        localStorage.setItem("Bookmark", JSON.stringify(boxInformation))
        displayBookmark()
        clearForm()
    }
})
function displayBookmark() {
    let term = ""
    for (let i = 0; i < boxInformation.length; i++) {
        term += `
        <tr>
            <td>${boxInformation[i].name}</td>
            <td>
                <a href="${boxInformation[i].url}" class="btn btn-primary text-white" target="_blank">Visit</a>
            </td>
            <td>
                <button onclick="getBookmarkInformation(${i})" class="btn btn-info text-white">Update</button>
            </td>
            <td>
                <button onclick="deleteBookmark(${i})" class="btn btn-danger text-white">Delete</button>
            </td>
        </tr>`
    }
    tableBody.innerHTML = term
}
function clearForm() {
    inputName.value = ""
    inputUrl.value = ""
}
function getBookmarkInformation(index) {
    currentIndex = index
    btnSubmit.innerHTML = "Update"
    inputName.value = boxInformation[currentIndex].name
    inputUrl.value = boxInformation[currentIndex].url
    btnSubmit.classList.replace("btn-success", "btn-warning")
    inputName.classList.remove("is-invalid")
    alertName.classList.replace("d-block", "d-none")
    inputUrl.classList.remove("is-invalid")
    alertUrl.classList.replace("d-block", "d-none")
}
function updateBookmark() {
    boxInformation[currentIndex].name = inputName.value
    boxInformation[currentIndex].url = inputUrl.value
    btnSubmit.innerHTML = "Submit"
    btnSubmit.classList.replace("btn-warning", "btn-success")
    inputName.classList.remove("is-valid")
    inputUrl.classList.remove("is-valid")
}
function deleteBookmark(index) {
    boxInformation.splice(index, 1)
    localStorage.setItem("Bookmark", JSON.stringify(boxInformation))
    displayBookmark()
}
inputSearch.addEventListener("keyup", _ => {
    let term = ""
    for (let i = 0; i < boxInformation.length; i++) {
        if (boxInformation[i].name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
            term += `
            <tr>
                <td>${boxInformation[i].name}</td>
                <td>
                    <a href="${boxInformation[i].url}" class="btn btn-primary text-white" target="_blank">Visit</a>
                </td>
                <td>
                    <button onclick="getBookmarkInformation(${i})" class="btn btn-info text-white">Update</button>
                </td>
                <td>
                    <button onclick="deleteBookmark(${i})" class="btn btn-danger text-white">Delete</button>
                </td>
            </tr>`
        }
    }
    tableBody.innerHTML = term
})
inputName.addEventListener("keyup", validName)
inputUrl.addEventListener("keyup", validUrl)
function validName() {
    // let regex = /^[A-Z][a-z_]+$/;
    let regex = /^.*[\S]+.*$/;
    if (regex.test(inputName.value)) {
        inputName.classList.add("is-valid")
        inputName.classList.remove("is-invalid")
        alertName.classList.replace("d-block", "d-none")
        return true
    } else {
        inputName.classList.add("is-invalid")
        inputName.classList.remove("is-valid")
        alertName.classList.replace("d-none", "d-block")
        return false
    }
}
function validUrl() {
    // let regex = /^(https?:\/\/).*[\S]+.*$/;
    let regex = /^[^\W\d]*\d\w*$/

    // let regex = /^(https?:\/\/)?([\w.-]+)(:\d+)?(\/[\w.-]*)*([?#][\w-]*)?$/;
    // let regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    if (regex.test(inputUrl.value)) {
        inputUrl.classList.add("is-valid")
        inputUrl.classList.remove("is-invalid")
        alertUrl.classList.replace("d-block", "d-none")
        return true
    } else {
        inputUrl.classList.add("is-invalid")
        inputUrl.classList.remove("is-valid")
        alertUrl.classList.replace("d-none", "d-block")
        return false
    }
}
