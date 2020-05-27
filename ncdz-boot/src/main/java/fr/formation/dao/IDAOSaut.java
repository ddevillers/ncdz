package fr.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.formation.model.Saut;

public interface IDAOSaut extends JpaRepository<Saut, Integer> {
	@Query("SELECT COUNT(s) FROM Saut s JOIN s.sauteurs WHERE s.id=?1")
	public Long countSautParVol(int id);
}
