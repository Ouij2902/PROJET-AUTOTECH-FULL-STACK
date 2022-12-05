package character;

import Strategies.BowAndArrowBehaviour;
import Strategies.WeaponBehaviour;

public abstract class Character {
    protected WeaponBehaviour weaponBehaviour;
    protected String nom;
    protected int score;

    public abstract void fight();
}
