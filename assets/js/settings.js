const $ = require("jquery");



// localStorage.setItem('theme', 'light');

const settings_template = () => `




<div class="center" id="setting" style="margin-left: 0;">




<div class="row" style="display: flex;justify-content: center;">
    <div class="col s12 m6 " style="margin-left:0px">
   
         
       
      <div class="card darken-1" id="settingcard">
         <a href="#" onclick=" window.location.reload()" id="backbutton">Back</a>
         <div class="theme-switch-wrapper">
         <em>Dark Mode</em>
       <label class="theme-switch" for="checkbox">
       ${localStorage.getItem('theme')==="light"? `<input name="checkbox" type="checkbox" id="checkbox" onchange="boxDisable($(this));" style="opacity: 1;pointer-events: auto;"/>`:`<input name="checkbox" type="checkbox" id="checkbox" onchange="boxDisable($(this));" style="opacity: 1;pointer-events: auto;" checked/>`}
    <div class="slider round"></div>
  </label>
    
  </div>
         
         
       


        <div class="card-content white-text">  
          <span class="card-title" id="cardtitle"> Setting</span>
          <form>
          <div class="mb-3">
            <label class="form-label inputlabel">Order Bot Url :</label>
            <input type="url" class="form-control" id="url" name="url" placeholder="http://example:port/orders" value="${boturl_from_json}" >
          </div>
           <div class="mb-3">
            <label class="form-label inputlabel">Store Number :</label>
            <input type="number" class="form-control" id="store_number" name="store_number" placeholder="enter store number" min="0" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${store_number_from_json}" >
          </div>
          <div class="mb-3">
            <label class="form-label inputlabel" >Screen Saver Scroll Rate(in seconds) :</label>
            <input type="number" class="form-control" id="irr" name="irr" placeholder="enter refresh rate" min="0" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${irr_from_json}" >
          </div>
          <div class="mb-3">
            <label class="form-label inputlabel" > Position Number :</label>
            <input type="number" class="form-control" id="position" name="position_num" placeholder="Enter Position Number" min="0" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${position_num_from_json}" >
          </div>
          
           <div class="mb-3">
            <label class="form-label inputlabel">Font Size :</label>
            <div class="maxFontmainDiv">
              <input type="number" class="form-control" id="font_size"  name="font_size" placeholder="enter font size" min="0" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${fontsize_from_json}" >
              <button type="button" class="btn" id="setFontSize" value="Max Size" onclick="MaxFontSize()" >Max Size </button>
            </div>
            </div> 
    <div class="mb-3">
    <label class="form-label inputlabel">Image Theme :</label>
    <select id="image_theme" name="image_theme" class="form-control">
      <option selected value="${image_theme_from_json}" id="default_theme">${image_theme_from_json_value}</option>   
      <option value="rosascafe">Rosascafe</option>
      <option value="texasburger">Texas Burger</option>
      <option value="tacovilla">Tacovilla</option>
    </select>
    <br>
     <p id="msg"></p>
          <p id="msg2"></p>
  </div>
         
       <br>
          <button type="button" class="btn btn-primary" onclick="fontsize()">Save</button> <button type="button" id="clearbtn" class="btn btn-primary" onclick="Clear()">Clear</button>
            </form>
        </div>
      
      </div>
    </div>
  </div>

<br>
</div>        
`

module.exports = {
  settings_template
}

