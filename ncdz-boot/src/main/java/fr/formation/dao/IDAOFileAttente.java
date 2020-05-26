package fr.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.model.FileAttente;

public interface IDAOFileAttente extends JpaRepository<FileAttente, Integer> {

}
