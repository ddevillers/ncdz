package fr.formation.enumerator;

public enum HauteurSaut {
	
	H1200(1200), H1600(1600), H2000(2000), H4000(4000), H6000(6000);
	
	private int hauteur;
	
	private HauteurSaut(int hauteur) {
		this.hauteur=hauteur;
	}
	
	public double getHauteur() {
		return hauteur;
	}

}
