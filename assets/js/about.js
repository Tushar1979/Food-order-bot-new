const $ = require("jquery");
const about_template = () => `
<div class="center" id="about_us" >
<br>
    <div class="container">
        <div class="section">
        <a href="#" onclick="Home()" id="backimg">
        
        <img src="./assets/images/back.png" width="30" height="30">
        
        </a>
            <h2 id="about-heading">About</h2>
        </div>
        <div class="container" id="about-container">
        <p><span>Chrome Version -- </span><span id="chrome_version"></span></p>
        <p><span>App Version -- </span><span id="app_version"></span></p>

        </div>
</div>
    </div>
</div>
`

module.exports = {
    about_template
}

