import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

class ProgressionBar extends Component
{
    #current_level = 0;
    #level_array = [];
    #wrapper;
    #default_class = "neutral";

    render(data)
    {
        console.log("Eloo");
        console.log(data);
        return this.pb_gen_bar(data);
    }

    // increment()
    // {
    //     if(this.#current_level == this.#level_array.length)
    //     {
    //         console.log("STOP");
    //         return;
    //     }
    //     this.#level_array[this.#current_level].classList.replace("neutral", "valid");
    //     this.#current_level++;
    // }

    // decrement()
    // {
    //     if(this.#current_level == 0)
    //     {
    //         console.log("STOP");
    //         return;
    //     }
    //     this.#current_level--;
    //     this.#level_array[this.#current_level].classList.replace("valid", "neutral");
    // }

    /**
     * retourne l'objet représentant la bar
     */
    pb_gen_bar(categories)
    {
        // progression_bar.addEventListener("mouseleave", () => {section_name.innerText = "";  level_name.innerText = "";} );

        categories.map(
            (cat, index, categories) => {
                const style = (key == 0 ? "round-left" : key == categories.length - 1 ? "round-right" : "");
                this.pb_gen_cat(cat["cat_name"], cat["levels"], style);  
            }
        )

        return (<div className="pb-wrapper">
            <div className="pb-bar">
                {inner_cat}
            </div>
            <div className="pb-text-wrapper">
                <span className="pb-section-name"></span>
                <span className="pb-level-name"></span>
            </div>
        </div>)
    }

    /**
     * retourne l'objet représentant la catégorie décrite
     */
    pb_gen_cat(name, levels, extra_style)
    {
        // section.addEventListener("mouseenter", () => {cat_name_div.innerText = name;} );

        return (<div className={"pb-section " + extra_style}>
            {
                levels.map( 
                    (level_name, index, levels) => {
                        const style = extra_style 
                            && (   (extra_style === "round-left"  && index == 0) 
                                || (extra_style === "round-right" && index == levels.length - 1) 
                            ) ? extra_style : "";
                        this.pb_gen_level(level_name, style);
                    }
                )
            }
        </div>);
    }

    /**
     * retourne l'objet représentant le niveau décrit
     */
    pb_gen_level(name, extra_style)
    {
        // level.addEventListener("mouseenter", () => {level_name_div.innerText = " : " + name;} );
        // this.#level_array.push(level);

        const class_name = "pb-level " + extra_style + " neutral"
        return (<span className={class_name}>{name}</span>); 
    }
}

export default ProgressionBar;