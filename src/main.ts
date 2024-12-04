import { addRecipe } from "./addRecipe";

//ModAPI.meta.icon("");
ModAPI.meta.title("Donut's Bullshit Crafting");
ModAPI.meta.version("v0.1");
ModAPI.meta.description("Based off of this video: <a>https://www.youtube.com/watch?v=syPUpzWGlJY</a>");
ModAPI.meta.credits("STPv22");

addRecipe("diamond_block", 
    true, 
    {
        "D": {
            type: "block",
            id: "dirt" // Using dirt blocks
        }
    },
    [
        "DDD",
        "DDD",
        "DDD"
    ]);