package fr.formation.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import fr.formation.enumerator.Niveau;

@Entity
@DiscriminatorValue("1")
public class Pilote extends Membre {
	
	@ManyToMany
	@JoinTable(name = "avion")
	private List<Avion> avions;

	public Pilote() {
		super();
	}

	public Pilote(int id, String nom, String prenom, LocalDate dateLicence, int numeroLicence, Niveau niveau) {
		super(id, nom, prenom, dateLicence, numeroLicence, niveau);
	}

	public Pilote(String nom, String prenom, LocalDate dateLicence, int numeroLicence, Niveau niveau) {
		super(nom, prenom, dateLicence, numeroLicence, niveau);
	}

	public List<Avion> getAvions() {
		return avions;
	}

	public void setAvions(List<Avion> avions) {
		this.avions = avions;
	}
	
	
}
