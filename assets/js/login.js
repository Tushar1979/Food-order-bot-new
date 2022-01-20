const { Callbacks, nodeName } = require('jquery');
const $ = require('jquery');

const login_template = () => `
<div class="center">
    <div class="container">
        <div class="section">
            <h2 class="#01579b light-blue darken-4" id="login-heading">Login</h2>
        </div>
       
            <div class="row">
                <div class="input-field col s12">
                    <input id="username" type="text" class="validate">
                    <label for="username">Username</label>
                </div>
                <div class="input-field col s12">
                    <input id="password" type="password" class="validate">
                    <label for="password">Password</label>
                </div>
                <div class="col s12">
                    <button class="#01579b light-blue darken-4 btn btn-large" id="submit-form" onclick="submitForm()"> Submit </button>
                </div>
            </div>
       
    </div>
</div>
`
const ajaxLogin = (url, data, callback) => {
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        success: function (data, status) {
            callback(data, status);
        },

        data: data
    });
}

const validation = (username, password, callback) => {
    if (username == 'none' || username == "" || username == " "){
        callback(false);
    }
    else if (password == 'none' || password == "" || password == " "){
        callback(false);
    }
    else{
        callback(true)
    }
}

module.exports = {
    login_template,
    ajaxLogin,
    validation
}

