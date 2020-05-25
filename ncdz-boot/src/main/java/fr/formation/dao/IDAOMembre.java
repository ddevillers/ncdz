package fr.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.model.Membre;

public interface IDAOMembre extends JpaRepository<Membre, Integer> {

}
