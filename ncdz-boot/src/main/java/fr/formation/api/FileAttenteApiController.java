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

import fr.formation.dao.IDAOFileAttente;
import fr.formation.model.FileAttente;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/fileAttente")
public class FileAttenteApiController {

	@Autowired
	private IDAOFileAttente daoFileAttente;

	@GetMapping
	public List<FileAttente> findAll(){
		return this.daoFileAttente.findAll();
	}

	@GetMapping("/{id}")
	public FileAttente findById(@PathVariable int id) {
		return this.daoFileAttente.findById(id).orElse(new FileAttente());
	}

	@PostMapping
	public FileAttente add(@RequestBody FileAttente fileAttente) {
		this.daoFileAttente.save(fileAttente);
		return fileAttente;
	}

	@PutMapping("/{id}")
	public FileAttente update(@PathVariable int id, @RequestBody FileAttente fileAttente){
		fileAttente.setId(id);
		return this.daoFileAttente.save(fileAttente);
	}
	
	@DeleteMapping("/{id}")
	public boolean delete(@PathVariable int id) {
		try {
			this.daoFileAttente.deleteById(id);
			return true;
		} catch (Exception e) {return false;}
	}
}

