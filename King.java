package character;

import Strategies.AxeBehavior;
import Strategies.BowAndArrowBehaviour;

public class King extends Character{
    public King() {
        this.weaponBehaviour= new WeaponBehavior();
    }

    @Override
    public void fight() {
        System.out.println("Je suis un roi.....");
        this.weaponBehaviour.useWeapon();

    }
}
