package fr.formation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.formation.model.Vol;

public interface IDAOVol extends JpaRepository<Vol, Integer>{
	@Query("SELECT COUNT(v) FROM Vol v JOIN v.sauts WHERE v.id=?1")
	public Long countSautParVol(int id);
}