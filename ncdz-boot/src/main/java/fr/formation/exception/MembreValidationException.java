package fr.formation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Le parachutiste n'a pas pu être ajouté")
public class MembreValidationException extends RuntimeException {

	private static final long serialVersionUID = 1L;

}
