package fr.formation.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import fr.formation.enumerator.SystemeSecu;

@Entity
@Table(name = "parachute")
public class Parachute {

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "nomHarnais", nullable = false)
	private String nomHarnais;
	
	@Column(name = "systemeSecu", nullable = false)
	@Enumerated(EnumType.STRING)
	private SystemeSecu systemeSecu;
	
	@Column(name = "nomVoilePrin", nullable = false)
	private String nomVoilePrin;
	
	@Column(name = "nomVoileSec", nullable = false)
	private String nomVoileSec;
	
	@Column(name = "tailleVoilePrin", nullable = false)
	private int tailleVoilePrin;
	
	@Column(name = "tailleVoileSec", nullable = false)
	private int tailleVoileSec;
	
	@Column(name = "datePliageVoilePrin", nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate datePliageVoilePrin;
	
	@Column(name = "datePliageVoileSec", nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate datePliageVoileSec;
	
	@Column(name = "plieurVoileSec", nullable = false)
	@ManyToOne
	private Membre plieurVoileSec;
	
	@Column(name = "plieurVoilePrin", nullable = false)
	@ManyToOne
	private Membre plieurVoilePrin;
	
	@Column(name = "centre", nullable = false)
	private boolean centre;
	
	@Column(name = "dispo", nullable = false)
	private boolean dispo;

	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	
	public Parachute() {
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

	public String getNomHarnais() {
		return nomHarnais;
	}

	public void setNomHarnais(String nomHarnais) {
		this.nomHarnais = nomHarnais;
	}

	public SystemeSecu getSystemeSecu() {
		return systemeSecu;
	}

	public void setSystemeSecu(SystemeSecu systemeSecu) {
		this.systemeSecu = systemeSecu;
	}

	public String getNomVoilePrin() {
		return nomVoilePrin;
	}

	public void setNomVoilePrin(String nomVoilePrin) {
		this.nomVoilePrin = nomVoilePrin;
	}

	public String getNomVoileSec() {
		return nomVoileSec;
	}

	public void setNomVoileSec(String nomVoileSec) {
		this.nomVoileSec = nomVoileSec;
	}

	public int getTailleVoilePrin() {
		return tailleVoilePrin;
	}

	public void setTailleVoilePrin(int tailleVoilePrin) {
		this.tailleVoilePrin = tailleVoilePrin;
	}

	public int getTailleVoileSec() {
		return tailleVoileSec;
	}

	public void setTailleVoileSec(int tailleVoileSec) {
		this.tailleVoileSec = tailleVoileSec;
	}

	public LocalDate getDatePliageVoilePrin() {
		return datePliageVoilePrin;
	}

	public void setDatePliageVoilePrin(LocalDate datePliageVoilePrin) {
		this.datePliageVoilePrin = datePliageVoilePrin;
	}

	public LocalDate getDatePliageVoileSec() {
		return datePliageVoileSec;
	}

	public void setDatePliageVoileSec(LocalDate datePliageVoileSec) {
		this.datePliageVoileSec = datePliageVoileSec;
	}

	public Membre getPlieurVoileSec() {
		return plieurVoileSec;
	}

	public void setPlieurVoileSec(Membre plieurVoileSec) {
		this.plieurVoileSec = plieurVoileSec;
	}

	public Membre getPlieurVoilePrin() {
		return plieurVoilePrin;
	}

	public void setPlieurVoilePrin(Membre plieurVoilePrin) {
		this.plieurVoilePrin = plieurVoilePrin;
	}

	public boolean isCentre() {
		return centre;
	}

	public void setCentre(boolean centre) {
		this.centre = centre;
	}

	public boolean isDispo() {
		return dispo;
	}

	public void setDispo(boolean dispo) {
		this.dispo = dispo;
	}

	@Override
	public String toString() {
		return "Parachute [id=" + id + ", nomHarnais=" + nomHarnais + ", systemeSecu=" + systemeSecu + ", nomVoilePrin="
				+ nomVoilePrin + ", nomVoileSec=" + nomVoileSec + ", tailleVoilePrin=" + tailleVoilePrin
				+ ", tailleVoileSec=" + tailleVoileSec + ", datePliageVoilePrin=" + datePliageVoilePrin
				+ ", datePliageVoileSec=" + datePliageVoileSec + ", centre=" + centre + ", dispo=" + dispo + "]";
	}
	
	
	
	
}
