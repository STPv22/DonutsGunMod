export default function AssaultRifle() {
    var recoilSpeed = 1; //recoil controller
    var DamageSourceClass = ModAPI.reflect.getClassByName("DamageSource");
    var creativeMiscTab = ModAPI.reflect.getClassById("net.minecraft.creativetab.CreativeTabs").staticVariables.tabMisc;
    var itemClass = ModAPI.reflect.getClassById("net.minecraft.item.Item");
    var itemSuper = ModAPI.reflect.getSuper(itemClass, (x) => x.length === 1);
    var nmi_AssaultRifle = function nmi_AssaultRifle() {
        itemSuper(this); //Use super function to get block properties on this class.
        this.$setCreativeTab(creativeMiscTab);
    }

    ModAPI.addEventListener("update", ()=>{ //recoil update loop (client)
        ModAPI.player.rotationPitch -= recoilSpeed;
        recoilSpeed *= 0.7;
    });

    function entityRayCast(player, world, range) {
        const HEADSHOT_MAX_DISTANCE_FROM_HEAD = 0.72;
        var eyePosition = player.getPositionEyes(0.0);
        var targetPosition = player.rayTrace(range, 0).hitVec;
        var entities = world.getEntitiesWithinAABBExcludingEntity(
            player.getRef(),
            player.getEntityBoundingBox().expand(range, range, range).getRef()
        ).getCorrective().array;
        var closestEntity = null;
        var isHeadshot = false;
        var isHeadshotInt = 0;
        var closestDistance = range;

        // Iterate through all entities to find the one the player is looking at
        for (var i = 0; i < entities.length; i++) {
            if (!entities[i]) {
                continue;
            }
            var entity = entities[i];

            // Check if the entity's bounding box intersects with the player's ray
            var entityBB = entity.getEntityBoundingBox().expand(0.3, 0.3, 0.3);
            var intercept = entityBB.calculateIntercept(eyePosition.getRef(), targetPosition.getRef());

            if (intercept != null) {
                var distance = eyePosition.distanceTo(intercept.hitVec.getRef());
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestEntity = entity;
                    isHeadshot = entity.getPositionEyes(0.0).distanceTo(intercept.hitVec.getRef()) < HEADSHOT_MAX_DISTANCE_FROM_HEAD;
                    if (isHeadshot) {
                        isHeadshotInt = 1;
                    }
                }
            }
        }

        var rayTraceResult = closestEntity;
        if (rayTraceResult != null){
            return {entity: rayTraceResult, headshot: isHeadshot, intheadshot: isHeadshotInt};
        } else{
            return null;
        }
    }
    ModAPI.reflect.prototypeStack(itemClass, nmi_AssaultRifle);
    var hasShot = false;
    nmi_AssaultRifle.prototype.$onPlayerStoppedUsing = function ($itemstack) {
        hasShot = false;
    }
    nmi_AssaultRifle.prototype.$onItemUseFinish = function ($itemstack) {
        return $itemstack;
    } 
    nmi_AssaultRifle.prototype.$getMaxItemUseDuration = function ($itemstack) {
        return 72000;
    }
    nmi_AssaultRifle.prototype.$getItemUseAction = function ($itemstack) {
        //ill add an enum for GUN later
        return ModAPI.reflect.getClassByName("EnumAction").staticVariables.DRINK;
    }
    nmi_AssaultRifle.prototype.$onItemRightClick = function ($itemstack, $world, $player) {
        if (!hasShot) {
            hasShot = true;
            var cactus = DamageSourceClass.staticVariables.cactus;
            var world = ModAPI.util.wrap($world);
            var entityplayer = ModAPI.util.wrap($player);
            var shotentitydata = entityRayCast(entityplayer, world, 32.0);
            entityplayer.setItemInUse($itemstack, nmi_AssaultRifle.prototype.$getMaxItemUseDuration($itemstack));
            if (shotentitydata != null){
                if (world.isRemote) {
                    recoilSpeed += 4;
                } else {
                    shotentitydata.entity.attackEntityFrom(cactus, 10 + (16 * shotentitydata.intheadshot));
                    if (shotentitydata.headshot) {
                        console.log("H E A D S H O T");
                    }
                    world.playSoundAtEntity(entityplayer.getRef(), ModAPI.util.str("tile.piston.out"), 1.0, 1.8);
                }
            } else if (!world.isRemote) {
                world.playSoundAtEntity(entityplayer.getRef(), ModAPI.util.str("random.click"), 1.0, 1.8);
            }
        }
        return $itemstack;
    }

    function internal_reg() {
        var ar_item = (new nmi_AssaultRifle()).$setUnlocalizedName(
            ModAPI.util.str("assaultrifle")
        ).$setMaxStackSize(1);
        itemClass.staticMethods.registerItem.method(ModAPI.keygen.item("assaultrifle"), ModAPI.util.str("assaultrifle"), ar_item);
        ModAPI.items["assaultrifle"] = ar_item;
        
        return ar_item;
    }

    if (ModAPI.items) {
        return internal_reg();
    } else {
        ModAPI.addEventListener("bootstrap", internal_reg);
    }
}