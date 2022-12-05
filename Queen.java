package character;

import Strategies.BowAndArrowBehaviour;
import Strategies.WeaponBehaviour;

public class Queen extends Character {

    public Queen(WeaponBehaviour weapon) {
        super(weapon);
    }

    @Override
    public void fight() {
        System.out.println("Je suis une reine");
        this.weapon.useWeapon();

    }
}
