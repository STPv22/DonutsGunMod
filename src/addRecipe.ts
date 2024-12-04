export function addRecipe(itemRes : string, isBlock : boolean, legend : {}, pattern : string[]){
    
        async function createRecipe() {
            await new Promise<void>((res,rej) => {
                var x = setInterval(() => {
                    if(ModAPI.blocks){
                        clearInterval(x);
                        res();
                    }
                }, 100);
            })
            var ObjectClass = ModAPI.reflect.getClassById("java.lang.Object").class;
            function ToChar(char) {
                return ModAPI.reflect.getClassById("java.lang.Character").staticMethods.valueOf.method(char[0].charCodeAt(0));
            }
    
            // Define the recipe legend to map characters to items
            // var recipeLegend = {
            //     "D": {
            //         type: "block",
            //         id: "dirt" // Using dirt blocks
            //     }
            // };
    
            // Define the crafting grid pattern for the recipe
            // var recipePattern = [
            //     "DDD",
            //     "DDD",
            //     "DDD"
            // ];
    
            // Convert the recipe pattern and legend into the required format
            var recipeInternal = [];
            Object.keys(legend).forEach((key) => {
                recipeInternal.push(ToChar(key));
                var ingredient = ModAPI.blocks[legend[key].id].getRef();
                recipeInternal.push(ingredient);
            });
    
            var recipeContents = pattern.flatMap(row => ModAPI.util.str(row));
            var recipe = ModAPI.util.makeArray(ObjectClass, recipeContents.concat(recipeInternal));
    
            // Define the output item as diamond_block
            let resultItem;
            if (isBlock) resultItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1](ModAPI.blocks[itemRes].getRef(), 1);
            else if (!isBlock) resultItem = ModAPI.reflect.getClassById("net.minecraft.item.ItemStack").constructors[1](ModAPI.items[itemRes].getRef(), 1);
    
    
            // Register the recipe with CraftingManager
            var craftingManager = ModAPI.reflect.getClassById("net.minecraft.item.crafting.CraftingManager").staticMethods.getInstance.method();
            ModAPI.hooks.methods.nmic_CraftingManager_addRecipe(craftingManager, resultItem, recipe);
        }
    
        ModAPI.dedicatedServer.appendCode(createRecipe);
    
        createRecipe();
}