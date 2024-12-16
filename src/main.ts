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

    addRecipe("iron_shovel", 
        false, 
        {
            "D": {
                type: "item",
                id: "stick"
            },
            "#": {
                type: "block",
                id: "tnt"
            }
        },
        [
            " # ",
            " D ",
            " D "
        ]);
        addRecipe("gold_pickaxe", 
            false, 
            {
                "D": {
                    type: "block",
                    id: "gold" // Using dirt blocks
                },
                "#": {
                    type: "item",
                    id: "stick" // Using dirt blocks
                },
                "S": {
                    type: "block",
                    id: "soulsand" // Using dirt blocks
                },
                "O": {
                    type: "item",
                    id: "firecharge" // Using dirt blocks
                },
                "V": {
                    type: "item",
                    id: "magma_cream" // Using dirt blocks
                },
                "G": {
                    type: "item",
                    id: "leather" // Using dirt blocks
                }
            },
            [
                "DDD",
                "S#O",
                "V#G"
            ]);