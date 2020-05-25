package fr.formation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import fr.formation.model.Avion;


public interface IDAOAvion extends JpaRepository<Avion, Integer> {
	
	

}
