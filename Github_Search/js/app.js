// INIT GITHUB
const github = new Github();
// INIT UI
const ui = new UI();

// ADD LISTER
document.getElementById('searchUser').addEventListener('keyup', function (e) {
    // GET INPUT VALUE
    const userTx = e.target.value;

    if (userTx !== '') {
        //MAKE HTTP CALL 
        github.getUser(userTx).then((data) => {
            if (data.profileData.message === 'Not Found') {
                // SHOW ALERT 
                ui.showAlert('User not Found', 'alert alert-danger');
                
            } else {
                // SHOW PROFILE
                ui.showProfile(data.profileData);
                ui.showRepos(data.repos);
            }
        })

    } else {
        // CLAER PROFILE
        ui.clearProfile()
    }
});
