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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import fr.formation.enumerator.HauteurSaut;
import fr.formation.enumerator.TypeSaut;

@Entity
@Table(name = "fileAttente")
public class FileAttente {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "hauteurSouhaitee", nullable = false)
	@Enumerated(EnumType.STRING)
	private HauteurSaut hauteurSouhaitee;
	
	@OneToMany
	@JoinTable(
			name = "fileAttente_sauteurs",
			uniqueConstraints = @UniqueConstraint (columnNames = {"id_fileAttente", "id_sauteur"}),
			joinColumns = @JoinColumn(name = "id_fileAttente", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "id_sauteur", referencedColumnName = "numero_licence")
			)
	private List<Membre> sauteurs;
	
	

	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	
	public FileAttente() {
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

	public HauteurSaut getHauteurSouhaitee() {
		return hauteurSouhaitee;
	}

	public void setHauteurSouhaitee(HauteurSaut hauteurSouhaitee) {
		this.hauteurSouhaitee = hauteurSouhaitee;
	}

	public List<Membre> getSauteurs() {
		return sauteurs;
	}

	public void setSauteurs(List<Membre> sauteurs) {
		this.sauteurs = sauteurs;
	}

	
	
	
	
}
