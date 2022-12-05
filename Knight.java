package character;

import Strategies.BowAndArrowBehaviour;
import Strategies.SwordBehavior;

public class Knight extends Character {
    public Knight(WeaponBehaviour weapon) {
        super(weapon);
    }

    @Override
    public void fight() {
        System.out.println("Je suis un chevalier");
        this.weapon.useWeapon();

    }
}
