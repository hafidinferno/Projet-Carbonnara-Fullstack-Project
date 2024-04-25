document.addEventListener("DOMContentLoaded", (event) => {
    const bar1 = new ProgressionBar(
            [
                {
                    cat_name : "Catégorie 1",
                    levels : [
                        "Question 1",
                        "Question 2",
                        "Question 3"
                    ]
                },
                {
                    cat_name : "Catégorie 2",
                    levels : [
                        "Question 4",
                        "Question 5",
                        "Question 6",
                        "Question 7",
                        "Question 8"
                    ]
                },
                {
                    cat_name : "Catégorie 3",
                    levels : [
                        "Question 9",
                        "Question 10"
                    ]
                },
                {
                    cat_name : "Catégorie 4",
                    levels : [
                        "Question 11",
                        "Question 12",
                        "Question 13",
                        "Question 14",
                        "Question 15"
                    ]
                }
            ]
        );
    const bar2 = new ProgressionBar(
        [
            {
                cat_name : "Cat 1",
                levels : [
                    "Q 1",
                    "Q 2"
                ]
            },
            {
                cat_name : "Cat 2",
                levels : [
                    "Q 3",
                    "Q 4",
                    "Q 5"
                ]
            },
            {
                cat_name : "Cat 3",
                levels : [
                    "Q 6",
                    "Q 7"
                ]
            }
        ]
    );
    document.getElementById("pb-container-1").appendChild(bar1.HTMLelement);
    document.getElementById("pb-container-2").appendChild(bar2.HTMLelement);
    document.getElementById("dec-1").addEventListener("click", () => bar1.decrement());
    document.getElementById("inc-1").addEventListener("click", () => bar1.increment());
    document.getElementById("dec-2").addEventListener("click", () => bar2.decrement());
    document.getElementById("inc-2").addEventListener("click", () => bar2.increment());
});


//===========
//  Logique
//===========

class ProgressionBar
{
    #current_level = 0;
    #level_array = [];
    #wrapper;
    #default_class = "neutral"; 

    constructor(json)
    {
        return this.pb_gen_bar(json);
    }

    increment()
    {
        if(this.#current_level == this.#level_array.length)
        {
            console.log("STOP");
            return;
        }
        this.#level_array[this.#current_level].classList.replace("neutral", "valid");
        this.#current_level++;
    }

    decrement()
    {
        if(this.#current_level == 0)
        {
            console.log("STOP");
            return;
        }
        this.#current_level--;
        this.#level_array[this.#current_level].classList.replace("valid", "neutral");
    }

    get HTMLelement()
    {
        return this.wrapper;
    }

    /**
     * retourne l'objet représentant la bar
     */
    pb_gen_bar(categories)
    {
        const progression_bar = document.createElement("div");
        progression_bar.classList = "pb-bar";
        
        const section_name = document.createElement("span");
        section_name.classList = "pb-section-name";
        
        const level_name = document.createElement("span");
        level_name.classList = "pb-level-name";
        
        const text_wrapper = document.createElement("div");
        text_wrapper.classList = "pb-text-wrapper";
        text_wrapper.appendChild(section_name);
        text_wrapper.appendChild(level_name);

        progression_bar.addEventListener("mouseleave", () => {section_name.innerText = "";  level_name.innerText = "";} );

        for(let key in categories)
        {
            progression_bar.appendChild(
                this.pb_gen_cat(
                    categories[key]["cat_name"], categories[key]["levels"], 
                    section_name, level_name, 
                    (key == 0 ? "round-left" : key == categories.length - 1 ? "round-right" : "") ));
        }
        
            
        this.wrapper = document.createElement("div");
        this.wrapper.classList = "pb-wrapper";
        this.wrapper.appendChild(progression_bar);
        this.wrapper.appendChild(text_wrapper);
    }

    /**
     * retourne l'objet représentant la catégorie décrite
     */
    pb_gen_cat(name, levels, cat_name_div, level_name_div, extra_style)
    {
        const section = document.createElement("span");
        section.classList = "pb-section";
        section.classList += " " + extra_style;

        section.addEventListener("mouseenter", () => {cat_name_div.innerText = name;} );

        for(let key in levels) 
        {
            const style = extra_style 
                && (   (extra_style === "round-left"  && key == 0) 
                    || (extra_style === "round-right" && key == levels.length - 1) 
                ) ? extra_style : "";
            
            section.appendChild( this.pb_gen_level(levels[key], level_name_div, style) );
        }

        return section;
    }

    /**
     * retourne l'objet représentant le niveau décrit
     */
    pb_gen_level(name, level_name_div, extra_style)
    {
        const level = document.createElement("span");
        level.classList = "pb-level " + extra_style + " neutral";

        level.addEventListener("mouseenter", () => {level_name_div.innerText = " : " + name;} );
        this.#level_array.push(level);

        return level; 
    }
}