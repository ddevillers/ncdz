package fr.formation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.formation.model.Avion;


public interface IDAOAvion extends JpaRepository<Avion, Integer> {

	public List<Avion> findByEtat(boolean etat);

}
