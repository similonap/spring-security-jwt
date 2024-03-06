package be.ap.jwtsecurity.model.dto;

public record TokenDto(String token, long expiresIn) {

}