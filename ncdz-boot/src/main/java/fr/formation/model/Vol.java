package fr.formation.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import fr.formation.enumerator.EtatVol;
import fr.formation.enumerator.HauteurSaut;



@Entity
@Table(name="Vol")
public class Vol {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@Column(name="avion", nullable=false)
	private Avion avion;
	
	@OneToOne
	@Column(name="pilote", nullable=false)
	private Pilote pilote;
	
	@OneToOne
	@Column(name="sauts", nullable=false)
	private List<Saut> sauts;
	
	@Column(name="etat_vol", nullable=false)
	private EtatVol etatVol;
	
	@OneToOne
	@Column(name="respo_vol", nullable=false)
	private Membre respoVol;
	
	@OneToOne
	@Column(name="respo_sol", nullable=false)
	private Membre respoSol;
	
	@Column(name="hauteur_saut_max", nullable=false)
	private HauteurSaut hauteurSautMax;
	
	
	
	
	public Vol(Avion avion, Pilote pilote, List<Saut> sauts, EtatVol etatVol, Membre respoVol, Membre respoSol,
			HauteurSaut hauteurSautMax) {
		super();
		this.avion = avion;
		this.pilote = pilote;
		this.sauts = sauts;
		this.etatVol = etatVol;
		this.respoVol = respoVol;
		this.respoSol = respoSol;
		this.hauteurSautMax = hauteurSautMax;
	}




	public Vol() {

	}




	public int getId() {
		return id;
	}




	public void setId(int id) {
		this.id = id;
	}




	public Avion getAvion() {
		return avion;
	}




	public void setAvion(Avion avion) {
		this.avion = avion;
	}




	public Pilote getPilote() {
		return pilote;
	}




	public void setPilote(Pilote pilote) {
		this.pilote = pilote;
	}




	public List<Saut> getSauts() {
		return sauts;
	}




	public void setSauts(List<Saut> sauts) {
		this.sauts = sauts;
	}




	public EtatVol getEtatVol() {
		return etatVol;
	}




	public void setEtatVol(EtatVol etatVol) {
		this.etatVol = etatVol;
	}




	public Membre getRespoVol() {
		return respoVol;
	}




	public void setRespoVol(Membre respoVol) {
		this.respoVol = respoVol;
	}




	public Membre getRespoSol() {
		return respoSol;
	}




	public void setRespoSol(Membre respoSol) {
		this.respoSol = respoSol;
	}




	public HauteurSaut getHauteurSautMax() {
		return hauteurSautMax;
	}




	public void setHauteurSautMax(HauteurSaut hauteurSautMax) {
		this.hauteurSautMax = hauteurSautMax;
	}





	
	
	
	
	
	

}
