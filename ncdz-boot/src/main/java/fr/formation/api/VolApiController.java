package fr.formation.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import fr.formation.dao.IDAOVol;
import fr.formation.model.Vol;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/vol")
public class VolApiController {
	@Autowired IDAOVol daoVol;
	
	@GetMapping
	public List<Vol> findAll() {
		return this.daoVol.findAll();
	}
	
	@GetMapping("/{id}")
	public Vol findById(@PathVariable int id) {
		return this.daoVol
				.findById(id)
				.orElse(new Vol());
	}
	
	@GetMapping("/count/{id}")
	public Long countById(@PathVariable int id) {
		return this.daoVol.countSautParVol(id);
	}
	
	@PostMapping
	public Vol add (@RequestBody Vol vol) {

		this.daoVol.save(vol);
		return vol;
		
	}
	
	
	@PutMapping("/{id}")
	public Vol update(@PathVariable int id, @RequestBody Vol vol) {
		vol.setId(id);
		return this.daoVol.save(vol);
	}
	
	@DeleteMapping("/{id}")
	public boolean delete (@PathVariable int id) {
		try {
			this.daoVol.deleteById(id);
			return true;
		}
		catch(Exception e) {
			return false;
		}
	}

}
