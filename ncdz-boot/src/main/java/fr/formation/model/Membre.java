package fr.formation.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import fr.formation.enumerator.HauteurSaut;
import fr.formation.enumerator.Niveau;

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
	
	@JoinColumn(name = "numero_parachute")
	@OneToOne
	private Parachute parachute;
	
	public Membre() {}
	
	public Membre(String nom, String prenom, LocalDate dateLicence, long numeroLicence, Niveau niveau) {
		this.nom = nom;
		this.prenom = prenom;
		this.dateLicence = dateLicence;
		this.numeroLicence = numeroLicence;
		this.niveau = niveau;
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
