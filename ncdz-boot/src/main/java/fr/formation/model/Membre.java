package fr.formation.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.swing.text.View;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;

import fr.formation.enumerator.HauteurSaut;
import fr.formation.enumerator.Niveau;
import fr.formation.projection.Views;

@Entity
@Table(name = "membre")
public class Membre {

	@Id
	@Column(name = "numero_licence")
	private long numeroLicence;
	
	@Column(name = "nom", length = 50, nullable = false)
	private String nom;
	
	@Column(name = "prenom", length = 50, nullable = false)
	private String prenom;
	
	@Column(name = "date_licence")
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateLicence;
	
	@Column(name = "niveau", nullable = false)
	@Enumerated(EnumType.STRING)
	private Niveau niveau;
	
	@Column(name = "hauteur_souhaitee")
	@Enumerated(EnumType.STRING)
	private HauteurSaut hauteurSouhaitee;
	
	@Column(name = "numero_parachute")
	private int numeroParachute;
	
	@ManyToMany(mappedBy ="sauteurs")
	private List<Saut> sauts;
	
	public Membre() {}
	
	public Membre(String nom, String prenom, LocalDate dateLicence, long numeroLicence, Niveau niveau, int parachute) {
		this.nom = nom;
		this.prenom = prenom;
		this.dateLicence = dateLicence;
		this.numeroLicence = numeroLicence;
		this.niveau = niveau;
		this.numeroParachute = parachute;
	}

	public HauteurSaut getHauteurSouhaitee() {
		return hauteurSouhaitee;
	}

	public void setHauteurSouhaitee(HauteurSaut hauteurSouhaitee) {
		this.hauteurSouhaitee = hauteurSouhaitee;
	}

	public int getNumeroParachute() {
		return numeroParachute;
	}

	public void setNumeroParachute(int parachute) {
		this.numeroParachute = parachute;
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

	public LocalDate getDateLicence() {
		return dateLicence;
	}

	public void setDateLicence(LocalDate dateLicence) {
		this.dateLicence = dateLicence;
	}

	public long getNumeroLicence() {
		return numeroLicence;
	}

	public void setNumeroLicence(long numeroLicence) {
		this.numeroLicence = numeroLicence;
	}

	public Niveau getNiveau() {
		return niveau;
	}

	public void setNiveau(Niveau niveau) {
		this.niveau = niveau;
	}

	@Override
	public String toString() {
		return "Membre [nom=" + nom + ", prenom=" + prenom + ", dateLicence=" + dateLicence + ", numeroLicence="
				+ numeroLicence + ", niveau=" + niveau + "]";
	}
}
