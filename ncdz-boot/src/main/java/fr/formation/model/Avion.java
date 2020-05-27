package fr.formation.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "avion")
public class Avion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "nom", nullable = false)
	private String nom;
	
	@Column(name = "capacite", nullable = false)
	private int capacite;
	
	@Column(name = "etat", nullable = false)
	private boolean etat;
	
	@Column(name = "nbreRota", nullable = false)
	private int nbreRota;
	
	@Column(name = "enVol")
	private boolean enVol;
	
	// Constructors

	public Avion(int id, String nom, int capacite, boolean etat, int nbreRota) {
		super();
		this.id = id;
		this.nom = nom;
		this.capacite = capacite;
		this.etat = etat;
		this.nbreRota = nbreRota;
	}

	public Avion() {
		super();
	}

	public Avion(String nom, int capacite, boolean etat, int nbreRota) {
		super();
		this.nom = nom;
		this.capacite = capacite;
		this.etat = etat;
		this.nbreRota = nbreRota;
	}
	
	//Getters & setters

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public int getCapacite() {
		return capacite;
	}

	public void setCapacite(int capacite) {
		this.capacite = capacite;
	}

	public boolean isEtat() {
		return etat;
	}

	public void setEtat(boolean etat) {
		this.etat = etat;
	}

	public int getNbreRota() {
		return nbreRota;
	}

	public void setNbreRota(int nbreRota) {
		this.nbreRota = nbreRota;
	}

	//ToString
	
	@Override
	public String toString() {
		return "Avion [id=" + id + ", nom=" + nom + ", capacite=" + capacite + ", etat=" + etat + ", nbreRota="
				+ nbreRota + "]";
	}
	
	
	
}
