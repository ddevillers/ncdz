package fr.formation.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import fr.formation.enumerator.HauteurSaut;
import fr.formation.enumerator.TypeSaut;

@Entity
@Table(name = "saut")
public class Saut {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "hauteurSaut", nullable = false)
	private HauteurSaut hauteurSaut;
	
	@Column(name = "hauteurSaut", nullable = false)
	
	@OneToMany
	@JoinColumn(name = "sauteurs")
	private List<Membre> sauteurs;
	
	@Column(name = "typeSaut", nullable = false)
	private TypeSaut typeSaut;
	
	@OneToMany
	@JoinColumn(name = "beerLine")
	private List<Membre> beerLine;

	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	
	public Saut() {
	}
	
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public HauteurSaut getHauteurSaut() {
		return hauteurSaut;
	}

	public void setHauteurSaut(HauteurSaut hauteurSaut) {
		this.hauteurSaut = hauteurSaut;
	}

	public List<Membre> getSauteurs() {
		return sauteurs;
	}

	public void setSauteurs(List<Membre> sauteurs) {
		this.sauteurs = sauteurs;
	}

	public TypeSaut getTypeSaut() {
		return typeSaut;
	}

	public void setTypeSaut(TypeSaut typeSaut) {
		this.typeSaut = typeSaut;
	}

	public List<Membre> getBeerLine() {
		return beerLine;
	}

	public void setBeerLine(List<Membre> beerLine) {
		this.beerLine = beerLine;
	}
	
	
	
}
