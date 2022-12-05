package character;

import Strategies.BowAndArrowBehaviour;
import Strategies.KnifeBehavior;

public class Troll extends Character{
    public Troll() {
        this.weaponBehaviour= new KnifeBehavior();
    }

    @Override
    public void fight() {
        System.out.println("Je suis un Troll......");
        this.weaponBehaviour.useWeapon();

    }
}
