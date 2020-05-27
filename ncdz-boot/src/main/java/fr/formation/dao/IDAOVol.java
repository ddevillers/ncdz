package fr.formation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import fr.formation.enumerator.EtatVol;
import fr.formation.model.Vol;

public interface IDAOVol extends JpaRepository<Vol, Integer>{
	@Query("SELECT COUNT(v) FROM Vol v JOIN v.sauts WHERE v.id=?1")
	public Long countSautParVol(int id);
	
	@Query("SELECT v FROM Vol v WHERE v.avion.id = ?1 AND v.etatVol IN ('ATTENTE' , 'PREPARATION')")
	public Vol getVolByIdAvion(int id);
}