/**
 * PLEASE NAME THE SENTENCE FILE "tt_sentences.js" or it won't work!
 * please rate my script on my forum post!
 * E.F#0306
*/

//Globals
var dropdown_titles = []


function init (){ //Initialize function
    var sentences = require("tt_sentences.js")  

    for (title in sentences.tt_sentences){
        dropdown_titles.push(title)
    }
    main_ui()
    Cheat.RegisterCallback("Draw", "visiblity_handler")
    Global.RegisterCallback("player_death", "killsay_func")
}

function main_ui () {
    UI.AddSubTab(["Config", "SUBTAB_MGR"], "Trashtalk")
    UI.AddSliderInt(["Config", "Trashtalk", "Trashtalk"],"--------------------TRASHTALK------------------", 0, 0)
    UI.AddCheckbox(["Config", "Trashtalk", "Trashtalk"], "Enable Trashtalk")
    UI.AddDropdown(["Config", "Trashtalk", "Trashtalk"], "Languages", dropdown_titles, 0)
    UI.AddCheckbox(["Config", "Trashtalk", "Trashtalk"], "Enable Enemyname in Front")
    UI.AddTextbox(["Config", "Trashtalk", "Trashtalk"], "Text")
    UI.AddSliderInt(["Config", "Trashtalk", "Trashtalk"],"------------MADE BY KSS / E.F#0306------------", 0, 0)
}

function visiblity_handler() {
    var enabled = UI.GetValue(["Config", "Trashtalk", "Trashtalk", "Enable Trashtalk"])
    var dropdown_val = UI.GetValue(["Config", "Trashtalk", "Trashtalk", "Languages"])

    UI.SetEnabled(["Config", "Trashtalk", "Trashtalk", "Languages"], enabled)


    if (dropdown_val == dropdown_titles.length -1 && enabled) {
        UI.SetEnabled(["Config", "Trashtalk", "Trashtalk", "Enable Enemyname in Front"], 1)
        UI.SetEnabled(["Config", "Trashtalk", "Trashtalk", "Text"], 1)
    } else {
        UI.SetEnabled(["Config", "Trashtalk", "Trashtalk", "Enable Enemyname in Front"], 0)
        UI.SetEnabled(["Config", "Trashtalk", "Trashtalk", "Text"], 0)
    }
}

function name_handler () {
    return (Entity.GetName(Entity.GetEntityFromUserID(Event.GetInt("userid"))));
}

function killsay_func () {
    var enabled = UI.GetValue(["Config", "Trashtalk", "Trashtalk", "Enable Trashtalk"])
    var dropdown_val = UI.GetValue(["Config", "Trashtalk", "Trashtalk", "Languages"])
    var sentences = require("tt_sentences.js") 
    var current_array = sentences.tt_sentences[dropdown_titles[dropdown_val]]
    var randomNumber = Math.floor(Math.random()*current_array.length)
    var random_trashtalk = current_array[randomNumber]
    
    if(!enabled){
        return
    }

    if (Entity.GetEntityFromUserID(Event.GetInt("attacker")) == Entity.GetLocalPlayer()) {
        if (dropdown_val == dropdown_titles.length -1) {
            killsay_text = UI.GetString(["Config", "Trashtalk", "Trashtalk", "Text"])
            if (UI.GetValue( ["Config", "Trashtalk", "Trashtalk", "Enable Enemyname in Front"])) {
                name_enemy = name_handler()
                if (killsay_text == "") {
                    Global.ExecuteCommand("say "+name_enemy+" 1")
                    return
                } else {
                    Global.ExecuteCommand("say "+name_enemy+" "+killsay_text)
                    return
                }
            } else {
                if (killsay_text == "") {
                    Global.ExecuteCommand("say 1")
                    return
                } else {
                    Global.ExecuteCommand("say "+killsay_text)
                    return
                }
            }
        } else {
            Global.ExecuteCommand("say "+random_trashtalk)
        }

    }
    

}


function print(text) {
    Cheat.Print(text)
}

init()
