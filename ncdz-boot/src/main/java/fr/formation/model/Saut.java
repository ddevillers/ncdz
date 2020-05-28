package fr.formation.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

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
	@Enumerated(EnumType.STRING)
	private HauteurSaut hauteurSaut;
	
	@ManyToMany
	@JoinTable(
			name = "saut_sauteurs",
			uniqueConstraints = @UniqueConstraint (columnNames = {"id_saut", "id_sauteur"}),
			joinColumns = @JoinColumn(name = "id_saut", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "id_sauteur", referencedColumnName = "numero_licence")
			)
	private List<Membre> sauteurs;
	
	@Column(name = "typeSaut", nullable = false)
	@Enumerated(EnumType.STRING)
	private TypeSaut typeSaut;
	
	@OneToMany
	@JoinTable(
			name = "saut_beerLine",
			uniqueConstraints = @UniqueConstraint (columnNames = {"id_saut", "id_beerLine"}),
			joinColumns = @JoinColumn(name = "id_saut", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "id_beerLine", referencedColumnName = "numero_licence")
			)
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
