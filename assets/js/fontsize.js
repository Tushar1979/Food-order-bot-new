const $ = require("jquery");
const fs = require("fs");
const path = require("path");

function FontSize(size) {

    if (size === undefined || size === null) {
        console.log("invalid")
    } else {
        let width = window.innerWidth
        let height = window.innerHeight
        console.log(width)
        console.log(height)
        console.log(size)
        if (width < 1350) {
            if (size > 79 && size < 101) {
                $("h1").css({"font-size": size + "px", "margin-top": "60px"})
                $("#msg").text("")
            } else if (size > 100 && size < 121) {
                $("h1").css({"font-size": size + "px", "margin-top": "50px"})
                $("#msg").text("")
            } else if (size > 120 && size < 141) {
                $("h1").css({"font-size": size + "px", "margin-top": "40px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 80 to 140 for your window!")
            }
        } else if (width > 1350 && width < 1700) {
            if (size > 89 && size < 121) {
                $("h1").css({"font-size": size + "px", "margin-top": "55px"})
                $("#msg").text("")
            } else if (size > 120 && size < 141) {
                $("h1").css({"font-size": size + "px", "margin-top": "40px"})
                $("#msg").text("")
            } else if (size > 140 && size < 166) {
                $("h1").css({"font-size": size + "px", "margin-top": "30px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 90 to 165 for your window!")
            }
        } else if (width > 1700 && width < 2050) {
            if (size > 123 && size < 141) {
                $("h1").css({"font-size": size + "px", "margin-top": "100px"})
                $("#msg").text("")
            } else if (size > 140 && size < 161) {
                $("h1").css({"font-size": size + "px", "margin-top": "90px"})
                $("#msg").text("")
            } else if (size > 160 && size < 181) {
                $("h1").css({"font-size": size + "px", "margin-top": "75px"})
                $("#msg").text("")
            } else if (size > 180 && size < 201) {
                $("h1").css({"font-size": size + "px", "margin-top": "65px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 130 to 200 for your window!")
            }
        } else if (width > 2050 && width < 3050) {
            if (size > 199 && size < 221) {
                $("h1").css({"font-size": size + "px", "margin-top": "120px"})
                $("#msg").text("")
            } else if (size > 220 && size < 241) {
                $("h1").css({"font-size": size + "px", "margin-top": "100px"})
                $("#msg").text("")
            } else if (size > 240 && size < 281) {
                $("h1").css({"font-size": size + "px", "margin-top": "90px"})
                $("#msg").text("")
            } else if (size > 280 && size < 301) {
                $("h1").css({"font-size": size + "px", "margin-top": "80px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 200 to 280 for your window!")
            }

        } else if (width > 3050 && width < 3501) {
            if (size > 229 && size < 271) {
                $("h1").css({"font-size": size + "px", "margin-top": "160px"})
                $("#msg").text("")
            } else if (size > 270 && size < 301) {
                $("h1").css({"font-size": size + "px", "margin-top": "130px"})
                $("#msg").text("")
            } else if (size > 300 && size < 361) {
                $("h1").css({"font-size": size + "px", "margin-top": "110px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 230 to 360 for your window!")
            }

        } else if (width > 3500 && width < 4051) {
            if (size > 249 && size < 291) {
                $("h1").css({"font-size": size + "px", "margin-top": "180px"})
                $("#msg").text("")
            } else if (size > 290 && size < 341) {
                $("h1").css({"font-size": size + "px", "margin-top": "150px"})
                $("#msg").text("")
            } else if (size > 340 && size < 391) {
                $("h1").css({"font-size": size + "px", "margin-top": "130px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 250 to 390 for your window!")
            }

        } else if (width > 4050 && width < 4501) {
            $("#msg").text("")
            if (size > 299 && size < 321) {
                $("h1").css({"font-size": size + "px", "margin-top": "210px"})
                $("#msg").text("")
            } else if (size > 320 && size < 351) {
                $("h1").css({"font-size": size + "px", "margin-top": "190px"})
                $("#msg").text("")
            } else if (size > 350 && size < 391) {
                $("h1").css({"font-size": size + "px", "margin-top": "170px"})
                $("#msg").text("")
            } else if (size > 390 && size < 421) {
                $("h1").css({"font-size": size + "px", "margin-top": "160px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 300 to 420 for your window!")
            }

        } else if (width > 4500 && width < 5001) {
            if (size > 349 && size < 391) {
                $("h1").css({"font-size": size + "px", "margin-top": "210px"})
                $("#msg").text("")
            } else if (size > 390 && size < 431) {
                $("h1").css({"font-size": size + "px", "margin-top": "190px"})
                $("#msg").text("")
            } else if (size > 430 && size < 471) {
                $("h1").css({"font-size": size + "px", "margin-top": "170px"})
                $("#msg").text("")
            } else if (size > 390 && size < 421) {
                $("h1").css({"font-size": size + "px", "margin-top": "160px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 350 to 470 for your window!")
            }

        } else if (width > 5000 && width < 5551) {
            if (size > 399 && size < 431) {
                $("h1").css({"font-size": size + "px", "margin-top": "220px"})
                $("#msg").text("")
            } else if (size > 430 && size < 481) {
                $("h1").css({"font-size": size + "px", "margin-top": "200px"})
                $("#msg").text("")
            } else if (size > 480 && size < 521) {
                $("h1").css({"font-size": size + "px", "margin-top": "170px"})
                $("#msg").text("")
            } else {
                $("#msg").text("Please enter number between 400 to 520 for your window!")
            }

        }

    }
}


module.exports = {
    FontSize,
}