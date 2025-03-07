import PistolItem from "./guns/Pistol";
import AssaultRifle from "./guns/AssaultRifle";
import SMGItem from "./guns/SMG";

const itemTexture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADySURBVFhH7ZQxDoMwDEVNr4G6VmJC6mk4Itdh7VpxjsBPDaKVCLZxypInIccg5zs/CVQoKAj8uHLjeETouo6HvlQcU3yJ932PIKkTceRAFH8NA6dE3IzbVogdQBOPtuVXfk5IJ8jWhKY4SxPaQvcmLEWuTUj/A1sqiEEcTQBENDWjvh3mvZtxccLiwMqvE0DrhNUBCCy1KSdAUsPiwFYcpM5ENrYWh3tdI4cT4dk0MSKPXzMSRSC+PMi14mcO4e7esv2iJqyHEGDVPCR6jyMC5luERXOfuoY7QFi8MKsDe6tXk8OBv7Ge/E96DZeKFwoOEE1wUX7TFh5zsgAAAABJRU5ErkJggg==";
ModAPI.meta.title("Donut's Gun Mod");
ModAPI.meta.version("WIP");
ModAPI.meta.icon(itemTexture);
ModAPI.meta.description("Requires AsyncSink. So far just skidded code from radman");

ModAPI.dedicatedServer.appendCode(PistolItem);
ModAPI.dedicatedServer.appendCode(AssaultRifle);
ModAPI.dedicatedServer.appendCode(SMGItem);
var pistol_item = PistolItem();
var ar_item = AssaultRifle();
var smg_item = SMGItem();

ModAPI.addEventListener("lib:asyncsink", async () => {
    ModAPI.addEventListener("custom:asyncsink_reloaded", ()=>{
        ModAPI.mc.renderItem.registerItem(pistol_item, ModAPI.util.str("pistol"));
        ModAPI.mc.renderItem.registerItem(ar_item, ModAPI.util.str("assaultrifle"));
        ModAPI.mc.renderItem.registerItem(smg_item, ModAPI.util.str("smg"));
    });
    AsyncSink.L10N.set("item.pistol.name", "Pistol");
    AsyncSink.L10N.set("item.assaultrifle.name", "Assault Rifle");
    AsyncSink.L10N.set("item.smg.name", "SMG");
    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/pistol.json", JSON.stringify(
        {
            "parent": "builtin/generated",
            "textures": {
                "layer0": "items/pistol"
            },
            "display": {
                "thirdperson": {
                    "rotation": [ 5, 80, -45 ],
                    "translation": [ 0, 1, -3 ],
                    "scale": [ 1.0, 1.0, 1.0 ]
                },
                "firstperson": {
                    "rotation": [ 0, -135, 25 ],
                    "translation": [ 0, 4, 2 ],
                    "scale": [ 1.8, 1.8, 1.8 ]
                }
            }
        }
    ));
    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/assaultrifle.json", JSON.stringify(
        {
            "parent": "builtin/generated",
            "textures": {
                "layer0": "items/pistol"
            },
            "display": {
                "thirdperson": {
                    "rotation": [ 5, 80, -45 ],
                    "translation": [ 0, 1, -3 ],
                    "scale": [ 1.0, 1.0, 1.0 ]
                },
                "firstperson": {
                    "rotation": [ 0, -135, 25 ],
                    "translation": [ 0, 4, 2 ],
                    "scale": [ 1.8, 1.8, 1.8 ]
                }
            }
        }
    ));
    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/models/item/smg.json", JSON.stringify(
        {
            "parent": "builtin/generated",
            "textures": {
                "layer0": "items/pistol"
            },
            "display": {
                "thirdperson": {
                    "rotation": [ 5, 80, -45 ],
                    "translation": [ 0, 1, -3 ],
                    "scale": [ 1.0, 1.0, 1.0 ]
                },
                "firstperson": {
                    "rotation": [ 0, -135, 25 ],
                    "translation": [ 0, 4, 2 ],
                    "scale": [ 1.8, 1.8, 1.8 ]
                }
            }
        }
    ));
    AsyncSink.setFile("resourcepacks/AsyncSinkLib/assets/minecraft/textures/items/pistol.png", await (await fetch(
        itemTexture
    )).arrayBuffer());
});
