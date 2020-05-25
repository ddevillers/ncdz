package fr.formation.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import fr.formation.enumerator.Niveau;

@Entity
@Table(name = "membre")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "pilote")
public class Membre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "nom", length = 50, nullable = false)
	private String nom;
	
	@Column(name = "prenom", length = 50, nullable = false)
	private String prenom;
	
	@Column(name = "date_licence", nullable = false)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dateLicence;
	
	@Column(name = "numero_licence", nullable = false)
	private int numeroLicence;
	
	@Column(name = "niveau", nullable = false)
	@Enumerated(EnumType.STRING)
	private Niveau niveau;
	
	@Column(name = "pilote", nullable = false)
	private boolean pilote = false;
	
	public Membre() {}
	
	public Membre(int id, String nom, String prenom, LocalDate dateLicence, int numeroLicence, Niveau niveau) {
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.dateLicence = dateLicence;
		this.numeroLicence = numeroLicence;
		this.niveau = niveau;
	}
	
	public Membre(String nom, String prenom, LocalDate dateLicence, int numeroLicence, Niveau niveau) {
		this.nom = nom;
		this.prenom = prenom;
		this.dateLicence = dateLicence;
		this.numeroLicence = numeroLicence;
		this.niveau = niveau;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public int getNumeroLicence() {
		return numeroLicence;
	}

	public void setNumeroLicence(int numeroLicence) {
		this.numeroLicence = numeroLicence;
	}

	public Niveau getNiveau() {
		return niveau;
	}

	public void setNiveau(Niveau niveau) {
		this.niveau = niveau;
	}
	
	public boolean isPilote() {
		return pilote;
	}

	public void setPilote(boolean pilote) {
		this.pilote = pilote;
	}

	@Override
	public String toString() {
		return "Membre [id=" + id + ", nom=" + nom + ", prenom=" + prenom + ", dateLicence=" + dateLicence
				+ ", numeroLicence=" + numeroLicence + ", niveau=" + niveau + "]";
	}
}
