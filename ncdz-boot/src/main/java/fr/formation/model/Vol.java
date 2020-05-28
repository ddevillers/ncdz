package fr.formation.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	@JoinColumn(name = "id_avion")
	private Avion avion;
	
	@OneToOne
	@JoinColumn(name = "id_pilote")
	private Pilote pilote;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name = "vol_sauts",
			uniqueConstraints = @UniqueConstraint (columnNames = {"id_vol", "id_saut"}),
			joinColumns = @JoinColumn(name = "id_vol", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "id_saut", referencedColumnName = "id")
			)
	private List<Saut> sauts;
	
	@Column(name="etat_vol", nullable=false)
	@Enumerated(EnumType.STRING)
	private EtatVol etatVol;
	
	@OneToOne
	@JoinColumn(name = "id_membre_respo_vol")
	private Membre respoVol;
	
	@OneToOne
	@JoinColumn(name = "id_membre_respo_sol")
	private Membre respoSol;
	
	@Column(name="hauteur_saut_max", nullable=false)
	@Enumerated(EnumType.STRING)
	private HauteurSaut hauteurSautMax;
	
	@Column(name = "date_vol")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateVol;

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




	public LocalDate getDateVol() {
		return dateVol;
	}




	public void setDateVol(LocalDate dateVol) {
		this.dateVol = dateVol;
	}




	@Override
	public String toString() {
		return "Vol [id=" + id + ", avion=" + avion + ", pilote=" + pilote + ", sauts=" + sauts + ", etatVol=" + etatVol
				+ ", respoVol=" + respoVol + ", respoSol=" + respoSol + ", hauteurSautMax=" + hauteurSautMax
				+ ", dateVol=" + dateVol + "]";
	}





	
	
	
	
	
	

}
