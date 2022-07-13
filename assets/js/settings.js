const $ = require("jquery");
const settings_template = () => `



<div class="center" id="setting" >




<div class="row">
    <div class="col s12 m6">
   
         
       
      <div class="card darken-1" id="settingcard">
         <a href="#" onclick=" window.location.reload()" id="backbutton">Back</a>
           

         <button type='button' onclick="Mode(false)">Modes</Button>
   
        

       <input type="radio"  id="modes"  onchange="function (event){Mode(event.target.value)}"> 

      


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
            <input type="number" class="form-control" id="font_size"  name="font_size" placeholder="enter font size" min="0" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${fontsize_from_json}" >
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

//   <div class="container" >
//       <div class="section">
//       <a href="#" onclick=" window.location.reload()" id="backimg">
//
//       <img src="./assets/images/back.png" width="30" height="30">
//
//       </a>
//           <h2 class="#01579b" id="settings-heading"> Settings</h2>
//       </div>
//       <div class="container" id="settings-container">
//           <form>
//         <div class="mb-3">
//           <label class="form-label inputlabel">Order Bot Url :</label>
//           <input type="url" class="form-control" id="url" name="url" placeholder="http://example:port/orders" value="${boturl_from_json}" >
//         </div>
//          <div class="mb-3">
//           <label class="form-label inputlabel">Store Number :</label>
//           <input type="number" class="form-control" id="store_number" name="store_number" placeholder="enter store number" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${store_number_from_json}" >
//         </div>
//         <div class="mb-3">
//           <label class="form-label inputlabel">Image Refresh Rate :</label>
//           <input type="number" class="form-control" id="irr" name="irr" placeholder="enter refresh rate" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${irr_from_json}" >
//         </div>
//
//
//          <div class="mb-3">
//           <label class="form-label inputlabel">Font Size :</label>
//           <input type="number" class="form-control" id="font_size"  name="font_size" placeholder="enter font size" onkeydown="return ((event.keyCode !== 109) && (event.keyCode !== 107) && (event.keyCode !== 110) && (event.keyCode !== 69))" value="${fontsize_from_json}" >
//         </div>
//   <div class="mb-3">
//   <label class="form-label inputlabel">Image Theme :</label>
//   <select id="image_theme" name="image_theme" class="form-control">
//     <option selected value="${image_theme_from_json}" id="default_theme">${image_theme_from_json_value}</option>
//     <option value="rosascafe">Rosascafe</option>
//     <option value="texasburger">Texas Burger</option>
//     <option value="tacovilla">Tacovilla</option>
//   </select>
//
// </div>
//         <small id="msg"></small><br>
//         <small id="msg2"></small>
//         <br>
//         <button type="button" class="btn btn-primary" onclick="fontsize()">Save</button> <button type="button" class="btn btn-danger" onclick="Clear()">Clear</button>
//           </form>
//           </div>
//       </div>
//   </div>
