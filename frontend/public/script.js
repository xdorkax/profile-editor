const saveBtn = document.querySelector("#save-profile");
const fileInput = document.querySelector("#file");
const deleteBtn = document.querySelector("#deleteProfile");

saveBtn.addEventListener("click", async function() {
    console.log("click");
    const formData = new FormData(document.querySelector("#profile-form"));
    const profileData = {};

    for(const data of formData.entries()) {
        profileData[data[0]] = data[1];
    }

    const resp = await fetch("http://localhost:9000", {
        method:"POST",
        body:JSON.stringify(profileData),
        headers:{"content-type":"application/json"}
    });

    console.log(resp);
});

fileInput.addEventListener("change", async function() {
    const formData = new FormData();
    formData.append("picture", this.files[0]);

    const resp = await fetch("http://localhost:9000", {
        method:"POST",
        body:formData
    });

    const json = await resp.text();
    this.value = null;
});

deleteBtn.addEventListener("click", async function() {
    const resp = await fetch("http://localhost:9000", {
        method:"DELETE"
    });

    console.log(await resp.text());
});