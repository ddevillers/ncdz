package fr.formation.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "pilote")
public class Pilote {
	
	@Id
	@Column(name = "numero_licence")
	private int numeroLicence;
	
	@Column(name = "nom", length = 50, nullable = false)
	private String nom;
	
	@Column(name = "prenom", length = 50, nullable = false)
	private String prenom;
	
	@ManyToMany
	@JoinTable(
			name = "pilote_avions",
			uniqueConstraints = @UniqueConstraint (columnNames = {"id_pilote", "id_avion"}),
			joinColumns = @JoinColumn(name = "id_pilote", referencedColumnName = "numero_licence"),
			inverseJoinColumns = @JoinColumn(name = "id_avion", referencedColumnName = "id")
			)
	private List<Avion> avions;

	public Pilote() {
		super();
	}

	public Pilote(int numeroLicence, String nom, String prenom, List<Avion> avions) {
		this.numeroLicence = numeroLicence;
		this.nom = nom;
		this.prenom = prenom;
		this.avions = avions;
	}

	public List<Avion> getAvions() {
		return avions;
	}

	public void setAvions(List<Avion> avions) {
		this.avions = avions;
	}
	
	

	public int getNumeroLicence() {
		return numeroLicence;
	}

	public void setNumeroLicence(int numeroLicence) {
		this.numeroLicence = numeroLicence;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	@Override
	public String toString() {
		return "Pilote [numeroLicence=" + numeroLicence + ", nom=" + nom + ", prenom=" + prenom + ", avions=" + avions
				+ "]";
	}
}
